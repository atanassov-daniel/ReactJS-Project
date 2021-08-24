import { Component, createRef } from 'react';
import { Modal, Card, Avatar, Row, Col, Input, Button, Image } from 'antd';
import CryptoJS from "crypto-js";

// import { auth } from '../../utils/firebase';
import styles from './EditProfileModal.module.css';
const { Meta } = Card;

//TODO try to use a Ref for the field wraps or their parent Col

class EditProfileModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // visible: this.props.visible,
            disabled: false,
        };
        this.focusInput = this.focusInput.bind(this);
        this.pairs = {};
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

    componentDidMount() {
        this.props.fetchProfileInfo();

        /* const profileInfo = this.props.profileInfo;
        console.log(profileInfo);
        Object.keys(profileInfo).forEach(key => { this.saveNameHashPair(key); }) */
    }

    focusInput(e) {
        //* if the input box was clicked, it would get focused by default, there's no need for me to repeat actions unnecessarily
        if (e.target.id.includes('input') === false) {
            const wrapper = e.currentTarget.id;
            const fieldName = wrapper.replace('-wrap', '');
            const inputId = fieldName.concat('-input');

            const el = document.getElementById(inputId);

            if (el) el.focus();
            else console.log('%cYou stupid little prick, you shall NOT mess with the Browser\'s Inspector if you want my fricking website to function correctly for you to be able to use it the way I intended it to be used!%c Now refresh the stupid page and stop trying to be cool, because you never will be :)', 'color: red; font-size: 7em; font-weight: 900', 'color: cyan; font-size: 5em; font-weight: 900');
        }
    }

    encrypt(text) {
        if (!this.secretKey) this.secretKey = CryptoJS.lib.WordArray.random(128 / 8).words[3].toString();
        const secretKey = this.secretKey;

        // Encrypt
        const ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();
        return ciphertext;

        /* // Decrypt
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        console.log(ciphertext);
        console.log(originalText); */
    }

    saveChanges(e) {
        console.log(document.querySelectorAll('.edit-profile-field-wrap')); //!!!!!!!!!!!!!!!!!!!!!!!! what if someone changes the className

        const keys = Object.keys(this.props.profileInfo);

        // if (Object.keys(this.props.profileInfo).every(key => !!this.pairs[key])) {
        if (!keys.every(key => { console.log(this[key].current !== null); return this[key].current !== null })) { // if one of the inputs has somehow disappeared the user shouldn't be able to save any changes
            this.setState(() => ({ disabled: true }))
            alert('Some of the inputs isn\'t accessible');
            return;
        }

        // keys.forEach(key => { this[key].current.state.value })

        // if the default ones can't be accessed or are not with valid values, one shouldn't be able to proceed with saving the changes => the save button should be disabled and with the corresponding style changes
    }

    /* saveNameHashPair(hash, name) {
        if(!Object.values().includes(name)) this.pairs[hash] = name;
    } */
    saveNameHashPair(name) {
        if (!this.pairs[name]) {
            const hash = this.encrypt(name);
            this.pairs[name] = hash;
        }

        console.log(this.pairs);
    }

    render() {
        const authInfo = this.props.authInfo;
        const profileInfo = this.props.profileInfo;
        if (!profileInfo) return (<h1>"It's of course shit" - Erling Haaland</h1>); // if there is no profile info, there will be nothing in this.pairs and there will be an error in all field wrapper divs
        // only save them on the first render and not on any subsequent ones //! what if the info changes - that shouldn't be a problem(except for in a dynamic fields case, because the actual value of the field doesn't get saved in the hashPair; but if dynamic, a new field may hyve to be added or an old one may have to be deleted)
        if (!this.pairs.fullName) {
            Object.keys(profileInfo).forEach(key => {
                this.saveNameHashPair(key);
                this[key] = createRef();
            });
        }

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
                                    {/* //TODO somehow make a HOC that gets the name of the field(fullName) and puts it everywhere it needed + an optional argument that is the hint */}
                                    <div id={this.pairs.fullName.concat("-wrap")} className={styles.fieldWrap + ' edit-profile-field-wrap'} onClick={this.focusInput}>
                                        <h4 className={styles.label}>Full name</h4>
                                        <Input id={this.pairs.fullName.concat("-input")} size="large" placeholder="Full name" bordered={true} type="text" className={styles.input} defaultValue={profileInfo.fullName} ref={this.fullName} />
                                        {/*//TODO red information circle + Unfortunately, you can’t leave this blank. */}
                                    </div>

                                    {/* //TODO try to do the focusInput using refs instead of direct DOM manipulation */}

                                    <div id={this.pairs.displayName.concat("-wrap")} className={styles.fieldWrap + ' edit-profile-field-wrap'} onClick={this.focusInput}>
                                        <h4 className={styles.label}>Display name</h4>
                                        <Input id={this.pairs.displayName.concat("-input")} size="large" placeholder="Display name" bordered={true} type="text" className={styles.input} value={profileInfo.displayName} ref={this.displayName} />
                                        <p className={styles.graySmall}>This could be your first name, or a nickname — however you’d like people to refer to you in Slack.</p>
                                    </div>

                                    <div id={this.pairs.whatIdo.concat("-wrap")} className={styles.fieldWrap + ' edit-profile-field-wrap'} onClick={this.focusInput}>
                                        <h4 className={styles.label}>What I do</h4>
                                        <Input id={this.pairs.whatIdo.concat("-input")} size="large" placeholder="What I do" bordered={true} type="text" className={styles.input} value={profileInfo.whatIdo} ref={this.whatIdo} />
                                        <p className={styles.graySmall}>Let people know what you do at <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{this.props?.team?.name}</span>.</p>
                                    </div>

                                    <div id={this.pairs.phoneNumber.concat("-wrap")} className={styles.fieldWrap + ' edit-profile-field-wrap'} onClick={this.focusInput}>
                                        <h4 className={styles.label}>Phone number</h4>
                                        <Input id={this.pairs.phoneNumber.concat("-input")} size="large" placeholder="(123) 555-5555" bordered={true} type="number" className={styles.input} value={profileInfo.phoneNumber} ref={this.phoneNumber} />
                                        <p className={styles.graySmall}>Enter a phone number.</p>
                                    </div>

                                    <div id={this.pairs.timeZone.concat("-wrap")} className={styles.fieldWrap + ' edit-profile-field-wrap'} onClick={this.focusInput}>
                                        <h4 className={styles.label}>Time zone</h4>
                                        <Input id={this.pairs.timeZone.concat("-input")} size="large" bordered={true} type="email" className={styles.input} value={profileInfo.timeZone} ref={this.timeZone} />
                                        <p className={styles.graySmall}>Your current time zone. Used to send summary and notification emails, for times in your activity feeds, and for reminders.</p>
                                    </div>

                                    {/* <Input value={obj.value}></Input>*/}
                                </Col>
                                <Col span={9} style={{ padding: '0.5% 2.75% 1.5% 0%' }}>
                                    <h4 className={styles.label} style={{ cursor: 'default' }} /* style={{ width: '192px' }} */>Profile photo</h4>

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
                                            <Button disabled={this.state.disabled} type="primary" size="medium" className={`${styles.saveButton} ${this.state.disabled === true ? styles.disabledSaveButton : styles.activeSaveButton}`} onClick={this.saveChanges.bind(this)}>Save Changes</Button>
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