import { Component } from 'react';
import { Modal, Card, Avatar } from 'antd';

import { auth } from '../../utils/firebase';
import styles from './EditProfileModal.module.css';
const { Meta } = Card;

class EditProfileModal extends Component {
    /* constructor(props) {
        super(props);

        this.state = {
            visible: this.props.visible,
        };
    } */

    handleCancel = () => {
        // this.setState(() => ({ visible: false }));
        this.props.hideEditModal();
    }

    render() {
        const authInfo = this.props.authInfo;
        console.log(this.props?.team?.name);

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
                        <Meta
                            /* avatar={
                                <Avatar
                                    src={authInfo?.photoURL || 'https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'}
                                    shape="square"
                                    size={52}
                                    alt="User's Profile Picture"
                                />
                            } */
                            title={authInfo?.displayName || authInfo?.email.split(/@\w+.\w+/)[0]}
                        />

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