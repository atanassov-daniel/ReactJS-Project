import { Component } from 'react';
import { Modal, Button, Card, Avatar } from 'antd';
const { Meta } = Card;

class Moda extends Component {
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
    };

    render() {
        return (
            <>

                <img src="https://ca.slack-edge.com/T01C79M7CDS-U01HFQUHTRV-g53fcecfb076-48" alt="" height="33px" style={{ float: 'right', marginRight: '2.5%', borderRadius: '15%', marginTop: '0.5vh', cursor: 'pointer' }} onClick={this.showModal} />
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
                            avatar={
                                <Avatar src={'https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'} shape="square" size={52} alt="user profile image" />
                            }
                            title="Test Account"
                            description="Status - Active"
                        />
                        <div>
                            <hr />
                            <Button block type="primary" size="small">Sign out of TEAM</Button>
                        </div>
                    </Card>

                </Modal>
            </>
        );
    }
}

export default Moda;