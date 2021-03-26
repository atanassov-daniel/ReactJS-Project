import { Component } from 'react';
import './SiderDemo.css';

// Style for all components
import 'antd/lib/style/index.css';

// Layout
import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style/index.css';
// Menu
import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style/index.css';
// Row
import Row from 'antd/lib/grid/row';
import 'antd/lib/grid/style/index.css';
// Col
import Col from 'antd/lib/grid/col';
// import 'antd/lib/grid/style/index.css';
// Divider
import Divider from 'antd/lib/divider';
import 'antd/lib/divider/style/index.css';
// Input
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
// Affix
import Affix from 'antd/lib/affix';
import 'antd/lib/affix/style/index.css';

// antd/lib/style/index.css
// antd/lib/componentName/style/index.css
import {
    MessageOutlined,
    MoreOutlined,
    CaretDownOutlined,
    NumberOutlined,
    PlusOutlined,
    PlusSquareFilled,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu; // the Submenu also needs /lib/tooltip/style/css
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
                            </SubMenu>
                            <SubMenu key="sub2" icon={<CaretDownOutlined />} title="Channels">
                                <Menu.Item key="12" icon={<NumberOutlined />}>channel1</Menu.Item>
                                <Menu.Item key="13" icon={<NumberOutlined />} >general</Menu.Item>
                                <Menu.Item key="14" icon={<PlusOutlined />}>announcements</Menu.Item>
                                <Menu.Item key="15" icon={<PlusSquareFilled />}>Add channels</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<CaretDownOutlined />} title="Direct Messages">
                                <Menu.Item key="16">first person</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>

                    <Layout className="site-layout" style={{ border: '5px solid red', backgroundColor: '#fff' }}>

                        <Content style={{ margin: '0', height: '100%', border: '2.5px blue solid' }}>
                            <Row style={{ height: '100%' }}>
                                <Col
                                    flex={1}
                                    style={{ border: '2.5px solid orange' }}
                                >
                                    <Row>3 / 5</Row><Divider></Divider>
                                    <Row>3 / 5</Row><Divider></Divider>
                                    <Row>3 / 5</Row><Divider></Divider>
                                    <Row>3 / 5</Row><Divider></Divider>
                                    <Row>3 / 5</Row><Divider></Divider>
                                    <Row>3 / 5</Row><Divider></Divider>
                                    <Row>3 / 5</Row><Divider></Divider>
                                    <Row>3 / 5</Row><Divider></Divider>
                                    <Row>3 / 5</Row><Divider></Divider>

                                    <Affix offsetBottom={10}>
                                        <span>
                                            <TextArea
                                                value={value}
                                                onChange={this.onChange}
                                                autoSize={{ minRows: 2, maxRows: 10 }}
                                                // allowClear
                                                className="textarea"
                                                placeholder="Controlled autosize"
                                            />
                                        </span>
                                    </Affix>
                                </Col>
                                <Col flex={2} style={{ border: '2.5px solid orange' }}>2 / 5</Col>
                            </Row>
                        </Content>

                    </Layout>
                </Layout>
            </>
        );
    }
}

export default SiderDemo;