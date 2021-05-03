import { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
/* 
!! Warning: Deleting a document does not delete its subcollections!
When you delete a document that has subcollections, those subcollections are not deleted. For example, there may be a document located at coll/doc/subcoll/subdoc even though the document coll/doc no longer exists. If you want to delete documents in subcollections when deleting a parent document, you must do so manually, as shown in Delete Collections.
*/

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
            team: null,
            isInvalidTeam: false
        };

        //!!! without doing the following, in the function `this` was undefined and this lead to an error
        this.onTeamChange = this.onTeamChange.bind(this);
        this.invalidTeam = this.invalidTeam.bind(this);
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

    onTeamChange(team) {
        this.setState((prevState) => ({ team: team }), () => {
            console.log('%c this.state after onteamChange call', 'color: gray; font-weight: bold; font-size: 2em;');
            console.log(this.state);
        });
        /* console.log('%c this.state after onteamChange call', 'color: gray; font-weight: bold; font-size: 2em;');
        console.log(this.state);
        * here the state was not yet updated */
    }

    invalidTeam() {
        this.setState((prevState) => ({ isInvalidTeam: true, team: null }));
    }

    render() {
        /* console.log('%c start of this.state in App.js', 'color: red; font-weight: bold; font-size: 2em');
        console.log(this.state);
        console.log('%c end of this.state in App.js', 'color: red; font-weight: bold; font-size: 2em'); */

        return (
            <>
                {/* //TODO think where to do the check for an invalid team */}
                {this.state.isInvalidTeam === true
                    ? <Route render={() => (<div>Invalid Team 404</div>)} />
                    : <>
                        {this.state.authInfo.isAuthenticated === true && !this.props.location.pathname.includes('login')
                            ?
                            <Route
                                //TODO path="/:team/:channel"
                                path="/:team"
                                render={(props) => (
                                    <Header className="site-layout-background" style={{ padding: 0 }} >
                                        {/* {this.state.authInfo.isAuthenticated === true ? <Moda /> : ''} */}
                                        <Moda {...props} onTeamChange={this.onTeamChange} />
                                    </Header>
                                )}
                            />
                            : ''
                        }

                        <Layout style={{ minHeight: '100vh' }}>
                            {this.state.authInfo.isAuthenticated === true
                                ?
                                <Route
                                    path="/:team"
                                    render={(props) => (
                                        <Sidebar {...props} onTeamChange={this.onTeamChange} invalidTeam={this.invalidTeam} team={this.state.team} />
                                    )}
                                />
                                : ''
                            }

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
                                        {/* <Route path="/infinite" exact>
                                            <Col
                                                span={24}
                                                style={{ border: '2.5px solid orange', height: '60vh' }} //!! the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                                className="column-with-slider"
                                                // id="messages-container"
                                                id="first-column"
                                            >
                                                <Scroll />
                                            </Col>
                                        </Route> */}
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
                                                        onTeamChange={this.onTeamChange}
                                                    //* when the team gets updated from here, a check for its validity would be unnecessary, because the component loads all the user's teams from the database, so they will all be existent and he will be a member of the teams
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
                }
            </>
        );
    }
}

export default App;