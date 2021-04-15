import { Layout, Row, Col } from 'antd';
import { Route } from 'react-router-dom';

import './components/SiderDemo.css';

import Sidebar from './components/Sidebar/Sidebar';
import Channel from './components/Channel/Channel';
import Messages from './components/Messages/Messages';
import TextareaMessage from './components/TextareaMessage/TextareaMessage';
import Details from './components/Details';
import Scroll from './components/Scroll';
import Signin from './components/Signin/Signin';
const { Header, Content } = Layout;

function App() {
    return (
        <>
            <Header className="site-layout-background" style={{ padding: 0 }} ></Header>

            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />

                <Layout className="site-layout" style={{ border: '5px solid red', backgroundColor: '#fff' }}>
                    <Content id="col" style={{ margin: '0', height: '100%', border: '2.5px blue solid' }}>
                        {/* <Route path="/:teamId/:channelId" component={ Channel } /> */}
                        <Route path="/messages" component={Channel} />
                        {/* //!!!!!! actually it should be path="/:channel" */}

                        <Row style={{ height: '100%', width: '100%' }}>
                            <Route path="/messages">
                                <Col
                                    span={24}
                                    style={{ border: '2.5px solid orange', height: '60vh' }} //!! the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                    className="column-with-slider"
                                    // id="messages-container"
                                    id="first-column"
                                >
                                    <Messages />
                                </Col>
                            </Route>
                            {/* <SiderDemo /> */}

                            <Route
                                path="/details"
                                component={Details}
                            />
                            <Route path="/infinite" exact>
                                <Col
                                    span={24}
                                    style={{ border: '2.5px solid orange', height: '60vh' }} //!! the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                    className="column-with-slider"
                                    // id="messages-container"
                                    id="first-column"
                                >
                                    <Scroll />
                                </Col>
                            </Route>
                            <Route path="/" exact>
                                <Col
                                    span={24}
                                    style={{ border: '2.5px solid orange', height: '90vh' }} //!! the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                    className="column-with-slider"
                                    id="signin-column"
                                >
                                    <Signin />
                                </Col>
                            </Route>
                        </Row>


                        <Route path="/messages">
                            <TextareaMessage />
                        </Route>

                    </Content>

                    {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                </Layout>
            </Layout>

        </>
    );
}

export default App;