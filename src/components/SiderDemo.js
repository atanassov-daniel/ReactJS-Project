import { Component } from 'react';
import './SiderDemo.css';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
    MessageOutlined,
    MoreOutlined,
    FileOutlined,
    TeamOutlined,
    CaretDownOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends Component {
    state = {
        // collapsed: false,
        collapsed: true,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;

        return (
            <>
                <Header className="site-layout-background" style={{ padding: 0 }} ></Header>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} className="sidebar">
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className="children">
                            <Menu.Item key="1" icon={<MessageOutlined />}>
                                Threads
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
                                <Menu.Item key="12">channel1</Menu.Item>
                                <Menu.Item key="13">general</Menu.Item>
                                <Menu.Item key="14">channel2</Menu.Item>
                                <Menu.Item key="15">discussion</Menu.Item>
                                <Menu.Item key="16">announcements</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<CaretDownOutlined />} title="Direct Messages">
                                <Menu.Item key="17">channel1</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                Bill is a cat.
                        </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </>);
    }
}

export default SiderDemo;