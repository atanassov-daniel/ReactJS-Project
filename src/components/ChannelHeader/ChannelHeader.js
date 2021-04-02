import { Component } from 'react';
import { PageHeader, Tooltip, Avatar, Typography } from 'antd';
import { AntDesignOutlined, InfoCircleOutlined, UserAddOutlined, } from '@ant-design/icons';

const { Text } = Typography;

export default class ChannelHeader extends Component {
    render() {
        return (
            <PageHeader
                id="channel-header"
                style={{
                    borderBottom: '1.5px solid grey',
                    borderRight: '1.5px solid grey',
                    display: 'flow-root'
                }}
                title={"#channel-name"}
                className="site-page-header"
                // subTitle="This is a subtitle"
                subTitle={
                    <>
                        <span className="pins">
                            <svg t="1616961502181" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1112" width="16" height="16"><path d="M445.696 113.578667a96 96 0 0 0-130.346667-0.853334l-5.333333 5.290667L106.709333 334.933333a96 96 0 0 0 16.597334 145.408l5.845333 3.584 208.896 119.381334a32 32 0 0 1 11.946667 12.032l1.92 3.882666 76.885333 192.597334a32 32 0 0 0 48.938667 13.738666l3.413333-2.986666 138.112-138.069334 211.242667 211.626667L875.946667 896l-0.085334-45.013333-211.328-211.712 136.746667-136.661334a32 32 0 0 0-6.698667-50.346666l-4.053333-1.962667-191.786667-76.672a32 32 0 0 1-13.952-10.837333l-2.389333-3.84-117.632-220.501334a96 96 0 0 0-19.072-24.874666z m-292.266667 265.173333L356.693333 161.749333a32 32 0 0 1 49.749334 3.84l1.834666 2.986667 117.589334 220.501333c9.472 17.792 24.277333 32.042667 42.24 40.917334l6.826666 3.072 146.730667 58.624-251.477333 251.349333-58.88-147.498667a96 96 0 0 0-34.688-43.434666l-6.826667-4.309334-208.938667-119.381333a32 32 0 0 1-11.946666-43.648l2.090666-3.157333 2.389334-2.858667L356.693333 161.749333 153.429333 378.752z" p-id="1113" fill="#515151"></path></svg>

                            <span className="subtitle-pins">&nbsp;11 </span>
                        </span>
                    |
                        <span className="subtitle-add-topic"> Add topic</span>
                    </>
                }
            >

                <Tooltip
                    trigger="hover"
                    placement="bottom"
                    title={
                        <>
                            <h4 style={{ color: 'white', marginBottom: '0px' }}>View all 2061 members</h4>
                            <i style={{ color: 'lightgrey' }}>Includes Rajvat Ashikur, Anubhav Ajmera, and John Doe</i>
                        </>
                    }
                >
                    <span id="tooltip-members">
                        <Avatar.Group
                            maxCount={3}
                            maxStyle={{
                                color: '#f56a00',
                                backgroundColor: '#fde3cf',
                            }}
                            style={{ float: 'left' }}
                        >
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Avatar
                                style={{
                                    backgroundColor: '#f56a00',
                                }}
                            >
                                K
                        </Avatar>
                            <Avatar
                                style={{
                                    backgroundColor: '#1890ff',
                                }}
                                icon={<AntDesignOutlined />}
                            />
                        </Avatar.Group>

                        {/* <strong>2061</strong> */}
                        <Text
                            strong
                            style={{ float: 'left', marginBlock: '5px', marginLeft: '.5em' }}
                        >
                            2061
                    </Text>
                    </span>
                </Tooltip>

                <UserAddOutlined style={{
                    float: 'left',
                    marginBlock: '-2%',
                    marginLeft: "1em",
                    fontSize: '20px',
                    border: '10px solid rgba(211,211,211, 0.05)',
                    borderRadius: '3px',
                    backgroundColor: 'rgba(211,211,211, 0.2)',
                }} />
                <InfoCircleOutlined style={{
                    float: 'right',
                    marginBlock: '-2%',
                    marginLeft: "0.25em",
                    fontSize: '20px',
                    border: '10px solid lightgray',
                    borderRadius: '3px',
                    backgroundColor: 'lightgrey',
                }} />

            </PageHeader>
        )
    }
};