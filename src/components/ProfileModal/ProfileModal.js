import { Component } from 'react';
import { Modal, Button, Card, Avatar, Tooltip, Badge } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import { auth } from '../../utils/firebase';
import styles from './ProfileModal.module.css';
const { Meta } = Card;

class ProfileModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            confirmLoading: false,
            // modalText: 'Content of the modal',
        };
    }

    showModal = () => {
        this.setState(() => ({ visible: true }));
    };

    /* handleOk = () => {
        this.setState(() => ({ modalText: 'The modal will be closed after two seconds' }));
        this.setState(() => ({ confirmLoading: true }));

        setTimeout(() => {
            this.setState(() => ({ visible: false }));
            this.setState(() => ({ confirmLoading: false }));
        }, 2000);
    }; */

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState(() => ({ visible: false }));
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

    render() {
        const authInfo = this.props.authInfo;

        return (
            <>
                <Tooltip
                    placement="bottomLeft"
                    title={authInfo.displayName || authInfo.email.split(/@\w+.\w+/)[0]}
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
                            onClick={this.showModal}
                        />
                    </Badge>
                </Tooltip>
                {/* <Button type="primary" onClick={this.showModal}>
                    Open Modal with async logic
                </Button> */}
                <Modal
                    visible={this.state.visible}
                    style={{ top: 30, left: 0, marginRight: '2%' }}
                    footer={null}
                    onCancel={this.handleCancel}
                /* confirmLoading={this.state.confirmLoading}
                onOk={this.handleOk} */
                >
                    <Card bodyStyle={{ padding: 0 }} bordered={false}>
                        <Meta
                            style={{ cursor: 'default' }}
                            avatar={
                                <Avatar
                                    src={authInfo.photoURL || 'https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'}
                                    shape="square"
                                    size={52}
                                    alt="User's Profile Picture"
                                />
                            }
                            title={authInfo.displayName || authInfo.email.split(/@\w+.\w+/)[0]}
                            description={<b><i style={{ color: 'red', fontSize: '2em', cursor: 'default' }}>Status - Active</i></b>}
                        />
                        <div>
                            <hr />
                            <Button
                                block type="primary" size="small"
                                onClick={this.onLogout.bind(this)}
                            >
                                Sign out of TEAM
                            </Button>
                        </div>
                    </Card>

                </Modal>
            </>
        );
    }
}

export default ProfileModal;