import { Component } from 'react';
import './SiderDemo.css';

import {
    Layout, Menu,
    Row, Col, Divider,
    Input,
} from 'antd';
import {
    MessageOutlined,
    MoreOutlined,
    FileOutlined,
    TeamOutlined,
    CaretDownOutlined,
    NumberOutlined,
    PlusOutlined,
    PlusCircleTwoTone,
    PlusSquareFilled,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TextArea } = Input;

class SiderDemo extends Component {
    state = {
        // collapsed: true,
        collapsed: false,
        value: ''
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    onChange = ({ target: { value } }) => {
        this.setState({ value });
    };

    render() {
        const { collapsed } = this.state;
        const { value } = this.state;

        return (
            <>
                <Header className="site-layout-background" style={{ padding: 0 }} ></Header>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} className="sidebar" collapsedWidth="0" width={175}
                        breakpoint="md"
                        // trigger={null}
                        zeroWidthTriggerStyle={{ position: 'absolute', top: 0, left: 0 }}
                        onBreakpoint={(broken) => {
                            console.log(broken);
                            console.log(this);
                        }}
                    >
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className="children" >
                            <Menu.Item key="1" icon={<MessageOutlined />}>
                                My Threads
                            </Menu.Item>
                            {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
                                More
                            </Menu.Item> */}
                            <SubMenu key="sub1" icon={<MoreOutlined />} title="More">
                                <Menu.Item key="3">All unreads</Menu.Item>
                                <Menu.Item key="4">All DMs</Menu.Item>
                                <Menu.Item key="5">Mentions & reactions</Menu.Item>
                                <Menu.Item key="6">Saved items</Menu.Item>
                                <hr />
                                <Menu.Item key="7">Channel browser</Menu.Item>
                                <Menu.Item key="8">File browser</Menu.Item>
                                <Menu.Item key="9">People & user groups</Menu.Item>
                                <Menu.Item key="10">Apps</Menu.Item>
                                <hr />
                                <Menu.Item key="11">Customise this list in your <a href="#" style={{ color: 'blue' }}>preferences</a></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<CaretDownOutlined />} title="Channels">
                                <Menu.Item key="12" icon={<NumberOutlined />}>channel1</Menu.Item>
                                <Menu.Item key="13" icon={<NumberOutlined />} >general</Menu.Item>
                                <Menu.Item key="14" icon={<PlusOutlined />}>announcements</Menu.Item>
                                {/* <Menu.Item key="15" icon={<PlusCircleTwoTone />}>Add channels</Menu.Item> */}
                                <Menu.Item key="15" icon={<PlusSquareFilled />}>Add channels</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<CaretDownOutlined />} title="Direct Messages">
                                <Menu.Item key="16">first person</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{ border: '5px solid red', backgroundColor: '#fff' }}>
                        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                        <Content style={{ margin: '0', height: '100%', border: '2.5px blue solid' }}>
                            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                Bill is a cat.
                            </div> */}

                            <Row style={{ height: '100%' }}>
                                <Col flex={3} style={{ border: '2.5px solid orange' }}>
                                    <Row>3 / 5</Row>
                                    <Divider></Divider>
                                    <Row>3 / 5</Row>
                                    <Divider></Divider>
                                    <Row>3 / 5</Row>
                                    <Divider></Divider>
                                    <Row>3 / 5</Row>
                                    <Divider></Divider>
                                    <Row>3 / 5</Row>
                                    <Divider></Divider>
                                    <Row>3 / 5</Row>
                                    <Divider></Divider>
                                    <Row>3 / 5</Row>
                                    <Divider></Divider>
                                    <Row>3 / 5</Row>
                                    <Divider></Divider>
                                    <Row>3 / 5</Row>
                                    <Divider></Divider>

                                    <TextArea
                                        value={value}
                                        onChange={this.onChange}
                                        // placeholder="Controlled autosize"
                                        autoSize={{ minRows: 2, maxRows: 10 }}
                                        allowClear
                                        className="textarea"
                                    />
                                </Col>
                                <Col flex={2} style={{ border: '2.5px solid orange' }}>2 / 5</Col>
                            </Row>
                        </Content>


                        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                    </Layout>
                </Layout>
            </>);
    }
}

export default SiderDemo;