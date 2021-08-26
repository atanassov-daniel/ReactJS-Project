import { Component, createRef } from 'react';
import { Modal, Card, Row, Col, Button, Image } from 'antd';

// import { auth } from '../../utils/firebase';
import { db } from '../../utils/firebase';
import EditProfileDataField from './EditProfileDataField';
import styles from './EditProfileModal.module.css';

//TODO try to use a Ref for the field wraps or their parent Col

class EditProfileModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // visible: this.props.visible,
            disabled: false,
        };
        // this.focusInput = this.focusInput.bind(this);
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

    validateFullName(e, value) {
        let mess;
        let regex = /[' .]{0,}(\p{L}+|\d+)/u;

        console.log(/\P{L}+[^\d]+/u.test(value));

        //!!! when using the `g` flag the test function returned different results on alternating occasions - the reason for that can be found at https://stackoverflow.com/questions/58022525/javascript-regex-test-same-string-but-got-different-result
        // console.log(value); console.log(regex.test(value)); // true console.log(regex.test(value)); // false console.log(regex.test(value)); // true console.log(regex.test(value)); // false

        if (value.trim().length === 0) mess = 'Unfortunately, you can’t leave this blank.';
        else if (regex.test(value) === false && (/\P{L}+/u.test(value) === true && /\d+/.test(value) === false)) mess = 'Names can’t consist solely of punctuation. Please elaborate!';
        else if (regex.test(value) === false && /[ .']+/.test(value) === true) mess = 'Mostly, names can’t contain punctuation. (Apostrophes, spaces, and periods are fine.)';
        else mess = null;

        this.setState(() => ({ fullNameMessage: mess }));
        // ' dfgbo', ' 1', ' ok2uy1', ' абвг', ' .', ' .\'', ' ._', ' =-)(*&^%$#@!'
    }

    saveChanges(e) {
        const keys = Object.keys(this.props.profileInfo);
        const inputs = [];

        // if (Object.keys(this.props.profileInfo).every(key => !!this.pairs[key])) {
        if (!keys.every(key => { let el = this[key].current; console.log(key); console.log(el !== null); inputs.push({ key: key, input: el }); return el !== null })) { // if one of the inputs has somehow disappeared the user shouldn't be able to save any changes
            this.setState(() => ({ disabled: true }));
            alert('Some of the inputs isn\'t accessible');
            return;
        }
        //! if I delete the element from the Inspector in the Browser, no error will be thrown and the user will still be able to saveChanges, even though that shouldn't be the case

        /* inputs.forEach(input => {
            const value = input.state.value;

            if (input.props.placeholder === 'Full name') {
                this.validateFullName(e, value);
            }
        }); */
        const obj = {};
        inputs.forEach(({ key, input }) => {
            const value = input.state.value;

            if (input.props.placeholder === 'Full name') {
                this.validateFullName(e, value);
            }
            obj[key] = value;
        });

        db
            .collection(`users`)
            .where('email', '==', this.props.authInfo.email)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.empty === false) {
                    querySnapshot.forEach(doc => {
                        if (doc.exists) doc.ref.update({
                            profileInfo: obj
                        });
                    });
                }
            });

        // if the default ones can't be accessed or are not with valid values, one shouldn't be able to proceed with saving the changes => the save button should be disabled and with the corresponding style changes
    }

    render() {
        const authInfo = this.props.authInfo;
        const profileInfo = this.props.profileInfo;
        if (!profileInfo) return (<h1>"It's of course shit" - Erling Haaland</h1>); // if there is no profile info, there will be nothing in this.pairs and there will be an error in all field wrapper divs
        // only save them on the first render and not on any subsequent ones //! what if the info changes - that shouldn't be a problem(except for in a dynamic fields case, because the actual value of the field doesn't get saved in the hashPair; but if dynamic, a new field may hyve to be added or an old one may have to be deleted)
        if (!this.fullName) {
            Object.keys(profileInfo).forEach(key => {
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

                                    {EditProfileDataField('Full name', profileInfo.fullName,
                                        this.fullName, null, null, null, this.state.fullNameMessage)}

                                    {/* //TODO try to do the focusInput using refs instead of direct DOM manipulation */}

                                    {EditProfileDataField('Display name', profileInfo.displayName,
                                        this.displayName, null, 'This could be your first name, or a nickname — however you’d like people to refer to you in Slack.')
                                    }

                                    {EditProfileDataField('What I do', profileInfo.whatIdo,
                                        this.whatIdo, null, "Let people know what you do at <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{this.props?.team?.name}</span>.")
                                    }

                                    {EditProfileDataField('Phone number', profileInfo.phoneNumber,
                                        this.phoneNumber, null, 'Enter a phone number.', 'number')}

                                    {EditProfileDataField('Time zone', profileInfo.timeZone,
                                        this.timeZone, null, 'Your current time zone. Used to send summary and notification emails, for times in your activity feeds, and for reminders.')
                                    }
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