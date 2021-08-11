import { Component } from 'react';
import { Modal, Card, Avatar, Row, Col, Input, Button, Image } from 'antd';

// import { auth } from '../../utils/firebase';
import styles from './EditProfileModal.module.css';
const { Meta } = Card;

class EditProfileModal extends Component {
    constructor(props) {
        super(props);

        /* this.state = {
            visible: this.props.visible,
        }; */
        this.focusInput = this.focusInput.bind(this);
    }

    handleCancel = () => {
        // this.setState(() => ({ visible: false }));
        document.getElementById('edit-profile-content-wrapper').scrollTop = 0;

        this.props.hideEditModal();
    }

    handleScroll(e) {
        const element = document.getElementById('edit-profile-content-wrapper');

        if (element.clientHeight === 0) return; //* on a second show of the Modal the clientHeight would be 0 and so neither of the lines would show, that is the quickest fix I could think of for this bug

        const bottomLine = document.getElementById('epcw-bottom-line');
        const topLine = document.getElementById('epcw-top-line');

        const isScrolledToBottom = Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight || Math.floor(element.scrollHeight - element.scrollTop) === element.clientHeight; // I added the second one because there was a case where 268.2 would be ceilet to 269 and wouldn't equal 268, and so the bottom line wouldn't hide even when it should have // (el.scrollHeight - el.scrollTop).toFixed(0) === el.clientHeight.toFixed(0)
        /* console.log('isScrolledToBottom');
        console.log(isScrolledToBottom);
        console.log('isScrolledToTop');
        console.log(element.scrollTop === 0);
        console.log(`scrH - scrTop = ${element.scrollHeight - element.scrollTop}`);
        console.log(`clHei = ${element.clientHeight}`); */

        if (isScrolledToBottom) bottomLine.style.display = 'none';
        else bottomLine.style.display = 'block';

        if (element.scrollTop === 0) topLine.style.display = 'none';
        else topLine.style.display = 'block';
    }

    componentDidUpdate() {
        if (this.props.visible === true) this.handleScroll(); // so that on the initial load the topLine would be hidden and not show
    }

    focusInput(e) {
        if (e.target.id.includes('input') === false) { // if the input box was clicked, it would get focused by default, there's no need for me to repeat actions unnecessarily
            const wrapper = e.currentTarget.id;
            const fieldName = wrapper.replace('-wrap', '');
            const inputId = fieldName.concat('-input');

            document.getElementById(inputId).focus();
        }
    }

    render() {
        const authInfo = this.props.authInfo;

        return (
            <>
                <Modal
                    visible={this.props.visible}
                    // style={{ top: 20, left: 0, height: '90%' }}
                    style={{ top: 20/* , left: '2.5%' */, margin: 'auto' }}
                    width={'85%'}
                    // height={'90%'}
                    // className={styles.hui}
                    bodyStyle={{ padding: 0/* , height: '90vh' */ }}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Card style={{ borderRadius: '7px' }} bodyStyle={{ padding: 0, fontSize: '15px', background: 'white', height: '90vh', borderRadius: '7px' }} bordered={false}>
                        <div style={{ padding: '3% 4.5%', height: '14vh' }}>
                            <h1 style={{ fontWeight: 'bolder', fontSize: '22px', padding: 0 }}>Edit your profile</h1>
                            {/* <Title></Title> */}
                        </div>

                        <hr id="epcw-top-line" style={{ border: 'none', borderBottom: '1px solid rgba(29, 28, 29, .13)', padding: 0, margin: 0 }} />
                        {/* epcw = edit-profile-content-wrapper */}
                        <div id="edit-profile-content-wrapper" className="column-with-slider" style={{ height: '58vh'/* , borderTop: '1px solid rgba(29, 28, 29, .13)' , borderBottom: '1px solid rgba(29, 28, 29, .13)' */ }} onScroll={this.handleScroll.bind(this)}>
                            <Row style={{ height: '58vh', width: '100%' }}>
                                <Col span={15} style={{ padding: '0.5% 4.5% 1.75%' }}>
                                    <div id="fullName-wrap" className={styles.fieldWrap} onClick={this.focusInput}>
                                        <h4 className={styles.label}>Full name</h4>
                                        <Input id="fullName-input" size="large" placeholder="Full name" bordered={true} type="email" className={styles.input} ></Input>
                                        {/* red information circle + Unfortunately, you can’t leave this blank. */}
                                    </div>

                                    <div id="displayName-wrap" className={styles.fieldWrap} onClick={this.focusInput}>
                                        <h4 className={styles.label}>Display name</h4>
                                        <Input id="displayName-input" size="large" placeholder="Display name" bordered={true} type="email" className={styles.input} ></Input>
                                        <p className={styles.graySmall}>This could be your first name, or a nickname — however you’d like people to refer to you in Slack.</p>
                                    </div>

                                    <div id="whatIDo-wrap" className={styles.fieldWrap} onClick={this.focusInput}>
                                        <h4 className={styles.label}>What I do</h4>
                                        <Input id="whatIDo-input" size="large" placeholder="What I do" bordered={true} type="email" className={styles.input} ></Input>
                                        <p className={styles.graySmall}>Let people know what you do at <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{this.props?.team?.name}</span>.</p>
                                    </div>

                                    <div id="phoneNumber-wrap" className={styles.fieldWrap} onClick={this.focusInput}>
                                        <h4 className={styles.label}>Phone number</h4>
                                        <Input id="phoneNumber-input" size="large" placeholder="(123) 555-5555" bordered={true} type="email" className={styles.input} ></Input>
                                        <p className={styles.graySmall}>Enter a phone number.</p>
                                    </div>

                                    <div id="timezone-wrap" className={styles.fieldWrap} onClick={this.focusInput}>
                                        <h4 className={styles.label}>Time zone</h4>
                                        <Input id="timezone-input" size="large" placeholder="name@work-email.com" bordered={true} type="email" className={styles.input} ></Input>
                                        <p className={styles.graySmall}>Your current time zone. Used to send summary and notification emails, for times in your activity feeds, and for reminders.</p>
                                    </div>

                                </Col>
                                <Col span={9} style={{ padding: '0.5% 2.75% 1.5% 0%' }}>
                                    <h4 className={styles.label} /* style={{ width: '192px' }} */>Profile photo</h4>

                                    <Image style={{ borderRadius: '4px', width: '192px' /* width: '99.75%' */ }} src="https://ca.slack-edge.com/T026XSX629X-U0278TW6J2U-gf2ee9ae04f2-192" srcSet="https://ca.slack-edge.com/T026XSX629X-U0278TW6J2U-gf2ee9ae04f2-192, https://ca.slack-edge.com/T026XSX629X-U0278TW6J2U-gf2ee9ae04f2-512 2x" />

                                    <Button block className={styles.uploadButton}>Upload an Image</Button>
                                </Col>
                            </Row>
                        </div>

                        <hr id="epcw-bottom-line" style={{ border: 'none', borderBottom: '1px solid rgba(29, 28, 29, .13)', padding: 0, margin: 0 }} />

                        <div style={{ /* padding: '0.5% 0 0%',  */height: '18vh', position: 'relative' }}>
                            <Row style={{ width: '100%', padding: '0 5%', position: 'absolute', top: '50%', transform: 'translate(0%, -50%)' }}>

                                <Col flex="fit-content" /* style={{ maxWidth: 'fit-content' }} */>
                                    <a href="" style={{ color: '#1264A3', fontSize: '15px' }}>Add, edit or reorder fields</a>
                                </Col>
                                <Col flex="auto" /* style={{ maxWidth: 'fit-content', width: 'fit-content', minWidth: 'fit-content' }} */>

                                    {/* <Button type="primary" size="medium" className={styles.cancelButton} onClick={this.handleCancel}>Cancel</Button>
                                    <Button type="primary" size="medium" className={styles.saveButton} onClick={this.saveChanges}>Save Changes</Button> */}

                                    <Row >
                                        <Col flex="auto"></Col>
                                        <Col style={{ maxWidth: 'fit-content' }}>
                                            <Button type="primary" size="medium" className={styles.cancelButton} onClick={this.handleCancel}>Cancel</Button>
                                        </Col>
                                        <Col style={{ maxWidth: 'fit-content', marginLeft: '3.5%' }}>
                                            <Button type="primary" size="medium" className={styles.saveButton} onClick={this.saveChanges}>Save Changes</Button>
                                        </Col>
                                    </Row>


                                    {/* #0B4C8C */}
                                </Col>

                            </Row>
                        </div>
                    </Card>

                </Modal>
            </>
        );
    }
}

export default EditProfileModal;