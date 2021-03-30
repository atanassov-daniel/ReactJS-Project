import { Component } from 'react';
import './SiderDemo.css';

import {
    Layout, Menu,
    Row, Col, Divider,
    Input,
    Affix,
    PageHeader, Tag, Button,
    Tooltip,
    Typography
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
    UserOutlined, AntDesignOutlined,
    InfoCircleOutlined, UserAddOutlined,
} from '@ant-design/icons';

import { Skeleton, Switch, Card, Avatar } from 'antd';
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { TextArea } = Input;

const { Text, Link } = Typography;


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

                    <Layout className="site-layout" style={{ border: '5px solid red', backgroundColor: '#fff' }}>
                        {/* &nbsp;11
                    <PushpinOutlined /> */}

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
                            <PageHeader
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
                                            <h4 style={{color: 'white', marginBottom: '0px'}}>View all 2061 members</h4>
                                            <i style={{color: 'lightgrey'}}>Includes Rajvat Ashikur, Anubhav Ajmera, and John Doe</i>
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
                                            style={{float: 'left'}}
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
                                
                                <UserAddOutlined  style={{
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

                            <Row style={{ height: '100%', width: '100%' }}>
                                <Col
                                    flex={1}
                                    //!! style={{ border: '2.5px solid orange', height: '100%' }} -> the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                    style={{ border: '2.5px solid orange', height: '65vh' }}
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
                                    </Card><Card
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

                                    {/*TODO The message textarea styling breaks when filled with a lot of text, opening/closing the sidebar fixes the problem */}
                                    {/* <Affix offsetBottom={10}>
                                        <span>
                                            <TextArea
                                                id="new-message-textarea"
                                                value={value}
                                                onChange={this.onChange}
                                                autoSize={{ minRows: 3, maxRows: 6 }}
                                                placeholder={`Message #channelName`}
                                                allowClear
                                            />
                                        </span>
                                    </Affix> */}
                                </Col>
                            </Row>
                            <Affix offsetBottom={5}>
                                <span>
                                    <TextArea
                                        id="new-message-textarea"
                                        value={value}
                                        onChange={this.onChange}
                                        autoSize={{ minRows: 3, maxRows: 3 }}
                                        placeholder={`Message #channelName`}
                                        allowClear
                                    />
                                </span>
                            </Affix>
                        </Content>

                        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                    </Layout>

                </Layout>
            </>);
    }
}

export default SiderDemo;