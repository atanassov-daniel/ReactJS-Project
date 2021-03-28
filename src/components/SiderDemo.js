import { Component } from 'react';
import './SiderDemo.css';

import {
    Layout, Menu,
    Row, Col, Divider,
    Input,
    Affix,
} from 'antd';
// antd/lib/style/index.css
// antd/lib/componentName/style/index.css
import {
    MessageOutlined,
    MoreOutlined,
    /* FileOutlined,
    TeamOutlined, */
    CaretDownOutlined,
    NumberOutlined,
    PlusOutlined,
    // PlusCircleTwoTone,
    PlusSquareFilled,
} from '@ant-design/icons';

import { Skeleton, Switch, Card, Avatar } from 'antd';
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TextArea } = Input;


class SiderDemo extends Component {
    state = {
        // collapsed: true,
        collapsed: false,
        value: '',
        loading: true,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    onChange = ({ target: { value } }) => {
        this.setState({ value });
    };


    onLoadingChange = checked => {
        this.setState({ loading: !checked });
    };

    render() {
        const { collapsed } = this.state;
        const { value } = this.state;

        const { loading } = this.state;

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
                                <Menu.Item key="11">Customise this list in your <a href="#/preferences" style={{ color: 'blue' }}>preferences</a></Menu.Item>
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
                        <Content id="col" style={{ margin: '0', height: '100%', border: '2.5px blue solid' }}>
                            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                Bill is a cat.
                            </div> */}

                            {/* here was the place for the cut code */}

                            <Row style={{ height: '100%', width: '100%' }}>
                                <Col
                                    flex={1}
                                    //!! style={{ border: '2.5px solid orange', height: '100%' }} -> the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                    style={{ border: '2.5px solid orange' }}
                                    className="column-with-slider"
                                // scroll={{ x: 'calc(700px + 50%)', y: 240 }}
                                >

                                    {/* cards */}
                                    <Switch checked={!loading} onChange={this.onLoadingChange} />

                                    <Card
                                    // style={{ width: '90%', marginTop: 16 }}
                                    // style={{ width: '98%', margin: 'auto' }}
                                    /* actions={[
                                        <SettingOutlined key="setting" />,
                                        <EditOutlined key="edit" />,
                                        <EllipsisOutlined key="ellipsis" />,
                                    ]} */
                                    >
                                        <Skeleton loading={loading} avatar active>
                                            {/* <Meta
                                                avatar={
                                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" shape="square" size={50} alt="user profile image" />
                                                }
                                                title="Ajvar Shri Lanka"
                                                description="This is the description"
                                            /> */}


                                            <Row>
                                                <Col span={2}>
                                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" shape="square" size={50} alt="user profile image" className="message-card-avatar" />
                                                </Col>
                                                <Col span={22}>
                                                    {/* <span className="message-card-text"> */}
                                                    <h3 className="message-author">Ajvar Shri Lanka</h3>
                                                    <span className="message-timestamp">15:18</span>
                                                    <p>Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?</p>
                                                    {/* </span> */}
                                                </Col>
                                            </Row>
                                            {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" shape="square" size={50} alt="user profile image" className="message-card-avatar" />
                                            <span className="message-card-text">
                                                <h4>Ajvar Shri Lanka</h4>
                                                <p>Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?</p>
                                            </span> */}

                                        </Skeleton>

                                    </Card>
                                    <Card
                                        style={{ marginBottom: 5, height: '10vh', overflow: 'hidden' }} className={loading ? 'loading' : ''}
                                    >
                                        {/* !!! put a temporary class that makes it 30% height 
                                        while loading and then when loading is done remove this
                                        class so that it returns to its default height */}
                                        <Skeleton loading={loading} active>
                                            {/* <Meta
                                                title="Card title"
                                                description="This is the description"
                                            /> */}
                                            <p>Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?</p>
                                        </Skeleton>
                                    </Card>
                                    {/* /cards */}
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

                                    {/* <Affix offsetBottom={0} style={{ position: 'absolute', bottom: '10%', width: '100%' }}>
                                        <span>
                                            <TextArea
                                                id="new-message-textarea"
                                                value={value}
                                                onChange={this.onChange}
                                                autoSize={{ minRows: 3, maxRows: 10 }}
                                                // allowClear
                                                placeholder={`Message #channelName`}
                                            />
                                        </span>
                                    </Affix> */}
                                    <Affix offsetBottom={10}>
                                        <span>
                                            <TextArea
                                                id="new-message-textarea"
                                                value={value}
                                                onChange={this.onChange}
                                                autoSize={{ minRows: 3, maxRows: 10 }}
                                                placeholder={`Message #channelName`}
                                                allowClear
                                            />
                                        </span>
                                    </Affix>



                                </Col>
                            </Row>
                        </Content>


                        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                    </Layout>
                </Layout>
            </>);
    }
}

export default SiderDemo;