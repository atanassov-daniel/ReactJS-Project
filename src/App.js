import { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';

import { auth } from './utils/firebase';

import './components/SiderDemo.css';

import Sidebar from './components/Sidebar/Sidebar';
import Channel from './components/Channel/Channel';
import Messages from './components/Messages/Messages';
import TextareaMessage from './components/TextareaMessage/TextareaMessage';
import Details from './components/Details';
import Scroll from './components/Scroll';
import Signin from './components/Signin/Signin';
import MyTeamsLogin from './components/MyTeamsLogin/MyTeamsLogin';

import Moda from './components/Moda';

const { Header, Content } = Layout;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // authInfo: null,
            authInfo: { isAuthenticated: false },
        };

    }

    componentDidMount() {
        // probably put it here

        auth.onAuthStateChanged(
            (user) =>
                this.setState((prevState) => (
                    {
                        authInfo: {
                            isAuthenticated: Boolean(user),
                            email: user?.email,
                            uid: user?.uid
                        }
                    }))
        );

        /* setTimeout(() => {
            console.log('15 000');
            auth.signOut();
        }, 15000) */
    }

    render() {
        return (
            <>
                <Route
                    //!!! path="/:team/:channel"
                    path="/:team"
                    render={(props) => (
                        <Header className="site-layout-background" style={{ padding: 0 }} >
                            {/* {this.state.authInfo.isAuthenticated === true ? <Moda /> : ''} */}
                            {this.state.authInfo.isAuthenticated === true ? <Route render={(props) => (
                                <Moda {...props} />
                            )} /> : ''}
                        </Header>
                    )}
                />


                <Layout style={{ minHeight: '100vh' }}>
                    <Route
                        path="/:team"
                        render={(props) => (
                            <Sidebar {...props} />
                        )}
                    />

                    <Layout className="site-layout" style={{ border: '5px solid red', backgroundColor: '#fff' }}>
                        <Content id="col" style={{ margin: '0', height: '100%', border: '2.5px blue solid' }}>
                            {/* <Route path="/:teamId/:channelId" component={ Channel } /> */}
                            <Route path="/messages" component={Channel} />
                            {/* //!!!!!! actually it should be path="/:channel" */}

                            <Row style={{ height: '100%', width: '100%' }}>
                                {/* <Route path="/messages">
                                    <Col
                                        span={24}
                                        style={{ border: '2.5px solid orange', height: '60vh' }} //!! the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                        className="column-with-slider"
                                        // id="messages-container"
                                        id="first-column"
                                    >
                                        <Messages />
                                    </Col>
                                </Route> */}
                                <Route
                                    path="/messages"
                                    render={(props) => (
                                        <Col
                                            span={24}
                                            style={{ border: '2.5px solid orange', height: '60vh' }} //!! the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                            className="column-with-slider"
                                            // id="messages-container"
                                            id="first-column"
                                        >
                                            <Messages
                                                {...props}
                                                authInfo={this.state.authInfo}
                                            />
                                        </Col>
                                    )}
                                >
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
                                <Route path="/login" exact
                                    render={(props) => (
                                        <Col
                                            span={24}
                                            style={{ border: '2.5px solid orange', height: '90vh' }} //!! the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                            className="column-with-slider"
                                            id="signin-column"
                                        >
                                            <Signin
                                                {...props}
                                                authInfo={this.state.authInfo}
                                            />
                                        </Col>
                                    )}
                                />
                                <Route
                                    path="/login/workspaces" exact
                                    render={(props) => (
                                        <Col
                                            span={24}
                                            style={{ border: '2.5px solid orange', height: '90vh' }} //!! the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                            className="column-with-slider"
                                            id="login-workspaces-column"
                                        >
                                            <MyTeamsLogin
                                                {...props}
                                                authInfo={this.state.authInfo}
                                            />
                                        </Col>
                                    )}
                                />

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
}

export default App;