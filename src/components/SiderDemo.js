//!! make a send button for the message textarea


import { Component } from 'react';
import './SiderDemo.css';

import Sidebar from './Sidebar/Sidebar';
import ChannelHeader from './ChannelHeader/ChannelHeader';
import Messages from './Messages/Messages';
import TextareaMessage from './TextareaMessage/TextareaMessage';
import Details from './Details';

import {
    Layout,
    Row, Col, Divider,
    Tag,


    Popover
} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { Route } from "react-router-dom";

const { Header, Content, Footer } = Layout;


class SiderDemo extends Component {
    render() {
        return (
            <>
                <Header className="site-layout-background" style={{ padding: 0 }} ></Header>
                <Layout style={{ minHeight: '100vh' }}>

                    <Sidebar />

                    <Layout className="site-layout" style={{ border: '5px solid red', backgroundColor: '#fff' }}>

                        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                        <Content id="col" style={{ margin: '0', height: '100%', border: '2.5px blue solid' }}>

                            <ChannelHeader></ChannelHeader>

                            <Row style={{ height: '100%', width: '100%' }}>
                                <Col
                                    span={24}
                                    style={{ border: '2.5px solid orange', height: '60vh' }} //!! the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                    className="column-with-slider"
                                    id="messages-container"
                                >
                                    <Messages />
                                </Col>

                                <Route
                                    path="/details" 
                                    component={Details}    
                                />
                                {/* //! here I can put the rest of the routes */}
                            </Row>

                            <TextareaMessage />


                        </Content>

                        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                    </Layout>

                </Layout>
            </>);
    }
}

export default SiderDemo;