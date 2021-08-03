import { Component } from 'react';
import { Modal, Card, Avatar, Row, Col, Input, Button, Image } from 'antd';

import { auth } from '../../utils/firebase';
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

        const isScrolledToBottom = Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight; // (el.scrollHeight - el.scrollTop).toFixed(0) === el.clientHeight.toFixed(0)
        /* console.log('isScrolledToBottom'); */
        /* console.log(isScrolledToBottom); */
        /* console.log('isScrolledToTop'); */
        /* console.log(element.scrollTop === 0); */

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
                            <Row>
                                <Col span={15} style={{ padding: '0.5% 4.5% 1.75%' }}>
                                    <div id="full-name-wrap" className={styles.fieldWrap} onClick={this.focusInput}>
                                        <h4>Full name</h4>
                                        <Input id="full-name-input" size="large" placeholder="Full name" bordered={true} type="email" className={styles.input} ></Input>
                                        {/* red information circle + Unfortunately, you can’t leave this blank. */}
                                    </div>

                                    <div id="display-name-wrap" className={styles.fieldWrap} onClick={this.focusInput}>
                                        <h4>Display name</h4>
                                        <Input id="display-name-input" size="large" placeholder="Display name" bordered={true} type="email" className={styles.input} ></Input>
                                        <p className={styles.graySmall}>This could be your first name, or a nickname — however you’d like people to refer to you in Slack.</p>
                                    </div>

                                    <div id="whatido-wrap" className={styles.fieldWrap} onClick={this.focusInput}>
                                        <h4>What I do</h4>
                                        <Input id="whatido-input" size="large" placeholder="What I do" bordered={true} type="email" className={styles.input} ></Input>
                                        <p className={styles.graySmall}>Let people know what you do at <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{this.props?.team?.name}</span>.</p>
                                    </div>

                                    <div id="phone-number-wrap" className={styles.fieldWrap} onClick={this.focusInput}>
                                        <h4>Phone number</h4>
                                        <Input id="phone-number-input" size="large" placeholder="(123) 555-5555" bordered={true} type="email" className={styles.input} ></Input>
                                        <p className={styles.graySmall}>Enter a phone number.</p>
                                    </div>

                                    <div id="timezone-wrap" className={styles.fieldWrap} onClick={this.focusInput}>
                                        <h4>Time zone</h4>
                                        <Input id="timezone-input" size="large" placeholder="name@work-email.com" bordered={true} type="email" className={styles.input} ></Input>
                                        <p className={styles.graySmall}>Your current time zone. Used to send summary and notification emails, for times in your activity feeds, and for reminders.</p>
                                    </div>

                                </Col>
                                <Col span={9} style={{ padding: '0.5% 2.75% 1.5% 0%' }}>
                                    <h4 style={{ width: '192px' }}>Profile photo</h4>

                                    <Image style={{ borderRadius: '4px', width: '192px' /* width: '99.75%' */ }} src="https://ca.slack-edge.com/T026XSX629X-U0278TW6J2U-gf2ee9ae04f2-192" srcSet="https://ca.slack-edge.com/T026XSX629X-U0278TW6J2U-gf2ee9ae04f2-192, https://ca.slack-edge.com/T026XSX629X-U0278TW6J2U-gf2ee9ae04f2-512 2x" />

                                    <Button block style={{ borderRadius: '4px', width: '192px', marginTop: '3.75%' }}>Upload an Image</Button>
                                </Col>
                            </Row>
                        </div>

                        <hr id="epcw-bottom-line" style={{ border: 'none', borderBottom: '1px solid rgba(29, 28, 29, .13)', padding: 0, margin: 0 }} />

                        <div style={{ padding: '0.5% 0 3.5%', height: '18vh' }}>{authInfo?.displayName || authInfo?.email.split(/@\w+.\w+/)[0]}</div>


                        <div style={{ padding: '0.5% 0 3.5%' }}/* style={{ padding: '5%' }} */>
                            {/* <Button
                                type="primary" size="small"
                                className={styles.signOutButton}
                                onClick={this.onLogout.bind(this)}
                            >
                                Sign out of <strong> {this.props?.team?.name}</strong>
                            </Button> */}
                        </div>
                    </Card>

                </Modal>
            </>
        );
    }
}

export default EditProfileModal;