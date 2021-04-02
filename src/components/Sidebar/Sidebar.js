import { Component } from 'react';

import { Layout, Menu } from "antd"; // , Typography
import {
    MessageOutlined,
    MoreOutlined,
    CaretDownOutlined,
    NumberOutlined,
    PlusOutlined,
    // PlusCircleTwoTone,
    PlusSquareFilled,
} from '@ant-design/icons';

// const { Link } = Typography;

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // collapsed: true,
            collapsed: false,
        };
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;

        return (
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
                        <Menu.Item key="11">Customise this list in your <a href="#/preferences" style={{ color: 'blue' }}>preferences</a></Menu.Item>
                        {/* <Menu.Item key="11">Customise this list in your <Link href="#/preferences" style={{ color: 'blue' }}>preferences</Link></Menu.Item> */}
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
        )
    }
};