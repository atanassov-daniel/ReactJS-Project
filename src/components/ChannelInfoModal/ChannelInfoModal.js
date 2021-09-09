import { Component } from 'react';
import { Modal, Tabs, Button } from 'antd';

import Members from './Tabs/Members';
import styles from './ChannelInfoModal.module.css';
const { TabPane } = Tabs;

export default class ChannelInfoModal extends Component {
    handleCancel() {
        this.props.hideEditModal();
    }
    render() {
        return (
            <>
                <Modal
                    visible={this.props.visible}
                    // style={{ top: 20, left: 0, height: '90%' }}
                    style={{ top: 37, left: '-2.75%', margin: 'auto' }}
                    // width={'57%'}
                    width="60vw"
                    height="70%"
                    bodyStyle={{
                        padding: 0, height: '85vh',
                        //* the following line fixed the height problem 
                        display: 'flex', flexDirection: 'column', background: 'white', borderRadius: '10px'
                    }}
                    footer={null}
                    onCancel={this.props.hideEditModal}
                >
                    <div style={{ padding: '4% 6% 1%' }}>
                        <h2 style={{ fontWeight: 'bold'/* , margin: 0 */ }}><span style={{ userSelect: 'none' }}># </span>{this.props.channel?.name || ''}</h2>
                        <Button size="small" style={{ width: '30%' }}> </Button>
                    </div>

                    <Tabs
                        defaultActiveKey={this.props.activeTab}
                        style={{/*  padding: '0% 6%',  */height: '73vh' }} /* style={{ height: 220 }} */
                        id="channel-info-tabs"
                    // tabBarStyle={{ color: 'gray', fontWeight: 'bold', fontSize: '13px' }}
                    >
                        <TabPane tab="About" key="about"> </TabPane>
                        <TabPane tab="Members" key="members" style={{ height: '100%' }}>
                            <Members channel={this.props.channel} team={this.props.team} />
                        </TabPane>
                        <TabPane tab="Integrations" key="integrations"> </TabPane>
                        <TabPane tab="Settings" key="settings"> </TabPane>
                    </Tabs>
                </Modal>
            </>
        )
    }
};