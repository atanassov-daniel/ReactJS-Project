import { Component } from 'react';
import { Modal, Button, Card, Avatar, Tooltip, Badge } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

// import editProfileIcon from './editProfileIcon.PNG';

import { auth, db } from '../../utils/firebase';
import styles from './ProfileModal.module.css';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
const { Meta } = Card;

class ProfileModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleProfileModal: false,
            confirmLoading: false,
            // modalText: 'Content of the modal',
            profileId: null,
            profileInfo: null,
            //!!!!!!!!!!!! the updated info should also be shown for the messages written by the user => 
            //! Firestore Cloud Functions or just saving the reference and having to fetch for every single message
            //TODO
            //*   
        };
    }

    componentDidMount() {
        this.fetchProfileInfo();
    }

    showProfileModal = () => {
        this.setState(() => ({ visibleProfileModal: true }));
    };

    /* handleOk = () => {
        this.setState(() => ({ modalText: 'The modal will be closed after two seconds' }));
        this.setState(() => ({ confirmLoading: true }));

        setTimeout(() => {
            this.setState(() => ({ visibleProfileModal: false }));
            this.setState(() => ({ confirmLoading: false }));
        }, 2000);
    }; */

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState(() => ({ visibleProfileModal: false }));
    }

    onLogout = (e) => {
        auth.signOut().then(() => {
            // Sign-out successful.
            console.log('logged out');
            this.props.onTeamChange(null);
            this.props.history.push('/login');
        }).catch((error) => {
            // An error happened.
            alert(`Couldn't log out - ${error.message}`);
        });
    }

    showEditModal() {
        this.setState(() => ({ visibleProfileModal: false, visibleEditModal: true }));
    }


    fetchProfileInfo() {
        if (this.props.authInfo.isAuthenticated === false) this.updateStateProfileInfo(null, null);

        db.collection('users').where('email', '==', this.props.authInfo.email)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty === false) {
                    querySnapshot.forEach(doc => {
                        let id;
                        if (doc.exists) { id = doc.id; doc = doc.data(); }
                        // const userInfo = doc.userInfo;
                        const profileInfo = doc.profileInfo;

                        console.log(profileInfo);

                        if (profileInfo) this.updateStateProfileInfo(id, profileInfo);
                        else this.updateStateProfileInfo(null, null); //TODO here I could implement the functionality for adding fields(I shoould probably use an array then, which I'll have to reorder and probably have to dynamically fill the content column on the EditProfileModal )

                        this.props.updateProfileInfo(profileInfo);
                    });
                }
            });
    }

    updateStateProfileInfo(profileId, updatedInfo) { //* updating the state's profile info object
        this.setState(() => ({
            profileId: profileId,
            profileInfo: updatedInfo
        }));
        /*  if (this.state.authInfo.isAuthenticated === false) {
             this.setState(() => ({
                 profileId: null,
                 profileInfo: null
             }));
         } else {
             this.setState(() => ({
                 profileId: profileId,
                 profileInfo: updatedInfo
             }));
         } */
    }

    render() {
        const authInfo = this.props.authInfo;
        console.log(this.props?.team?.name);

        return (
            <>
                {this.state.visibleEditModal === true ?
                    <EditProfileModal team={this.props.team} authInfo={authInfo} visible={this.state.visibleEditModal} profileInfo={this.state.profileInfo} fetchProfileInfo={this.fetchProfileInfo.bind(this)} updateStateProfileInfo={this.updateStateProfileInfo.bind(this)} hideEditModal={() => { this.setState(() => ({ visibleEditModal: false })) }} ></EditProfileModal>
                    : <></>
                }
                {/* <EditProfileModal team={this.props.team} authInfo={authInfo} visible={this.state.visibleEditModal} profileInfo={this.state.profileInfo} fetchProfileInfo={this.fetchProfileInfo.bind(this)} updateStateProfileInfo={this.updateStateProfileInfo.bind(this)} hideEditModal={() => { this.setState(() => ({ visibleEditModal: false })) }} ></EditProfileModal> */}

                <Tooltip
                    placement="bottomLeft"
                    title={authInfo?.displayName || authInfo?.email.split(/@\w+.\w+/)[0]}
                    // this regex was needed because the email could contain a @ before the actual provider @
                    color={'black'}
                    arrowPointAtCenter={true}
                    overlayInnerStyle={{ fontWeight: '550' }}
                >
                    <Badge
                        className={styles.flR}
                        count={<ClockCircleOutlined style={{ color: '#f5222d', zIndex: '0' }} title={'Status - Active!!!!'} />}
                        // title={'Status - Active!!!!'}
                        offset={[-1, 30]}
                    >
                        <img
                            src="https://ca.slack-edge.com/T01C79M7CDS-U01HFQUHTRV-g53fcecfb076-48"
                            alt="User's Profile Picture"
                            className={styles.profileImg}
                            onClick={this.showProfileModal}
                        />
                    </Badge>
                </Tooltip>
                {/* <Button type="primary" onClick={this.showModal}>
                    Open Modal with async logic
                </Button> */}
                <Modal
                    visible={this.state.visibleProfileModal}
                    style={{ top: 30, left: 0, marginRight: '3.5%' }}
                    width={'45%'}
                    // className={styles.hui}
                    bodyStyle={{ padding: 0 }}
                    footer={null}
                    onCancel={this.handleCancel}
                /* confirmLoading={this.state.confirmLoading}
                onOk={this.handleOk} */
                >
                    <Card style={{ borderRadius: '7px' }} bodyStyle={{ padding: 0, fontSize: '15px', background: '#f8f8f8', border: '1.5px solid rgba(29, 28, 29, .13)', borderRadius: '5px' }} bordered={false}>
                        <Meta
                            className={styles.profileInfoMeta + ' profileInfoMeta'}
                            /* style={{
                                cursor: 'default', padding: '4% 2%',
                                maxWidth: 'fit-content', userSelect: 'none'
                            }} */
                            avatar={
                                <Avatar
                                    src={authInfo?.photoURL || 'https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'}
                                    shape="square"
                                    size={52}
                                    alt="User's Profile Picture"
                                />
                            }
                            title={<span style={{ fontWeight: 600 }}>{authInfo?.displayName || authInfo?.email.split(/@\w+.\w+/)[0]}</span>} //!!!!TODO this should be done at the user's registration, not here
                            description={<div style={{ color: 'gray', fontSize: '13px', cursor: 'default' }}>{/* <i className={styles.icon}></i> */}<div style={{ borderRadius: '50%', background: 'green', width: '0.42em', height: '0.42em', display: 'inline-block' }}></div><span> Active</span></div>}
                        //* the underline comes from the ant-meta-description
                        />



                        <div style={{ padding: '0.5% 0 3.5%' }}/* style={{ padding: '5%' }} */>
                            {/*  */}
                            <div className={styles.profileActions}>Set yourself as <strong>away</strong></div>
                            <div className={styles.profileActions}>
                                <span >Pause notifications</span>
                                <span style={{ float: 'right', fontWeight: '900', color: 'gray' }}>&gt;</span>
                            </div>

                            <hr className={styles.graySeparator} />

                            <div className={styles.profileActions} onClick={this.showEditModal.bind(this)}> {/* <img src={editProfileIcon} /> */} Edit Profile</div>
                            <div className={styles.profileActions}>View Profile</div>
                            <div className={styles.profileActions}>Preferences</div>

                            {!this.props.team?.name
                                ? ''
                                : <>
                                    <hr className={styles.graySeparator} />

                                    <div className={styles.profileActions} onClick={this.onLogout.bind(this)}>
                                        Sign out of <strong> {this.props?.team?.name}</strong>
                                    </div>
                                </>
                            }
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

export default ProfileModal;