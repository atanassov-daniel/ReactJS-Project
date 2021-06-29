import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
/* 
!! Warning: Deleting a document does not delete its subcollections!
When you delete a document that has subcollections, those subcollections are not deleted. For example, there may be a document located at coll/doc/subcoll/subdoc even though the document coll/doc no longer exists. If you want to delete documents in subcollections when deleting a parent document, you must do so manually, as shown in Delete Collections.
*/
//* the Check for an Invalid Team is done in the Sidebar Component, the Check for an Invalid Channel is done in the Messages Component

import { auth } from './utils/firebase';

import './components/SiderDemo.css';

import Sidebar from './components/Sidebar/Sidebar';
import Channel from './components/Channel/Channel';
import Messages from './components/Messages/Messages';
import TextareaMessage from './components/TextareaMessage/TextareaMessage';
import Details from './components/Details';
import Scroll from './components/Scroll'; // for reverse Infinite Scrolling for the messages
import Signin from './components/Signin/Signin';
import MyTeamsLogin from './components/MyTeamsLogin/MyTeamsLogin';

import Moda from './components/Moda';
import GetStarted from './components/GetStarted/GetStarted';
import TeamName from './components/SetupNewTeam/Pages/TeamName';
import SetupNewTeam from './components/SetupNewTeam/SetupNewTeam';
import Registration from './components/Registration/Registration';

const { Header, Content } = Layout;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // authInfo: null,
            authInfo: { isAuthenticated: false },
            team: null,
            isInvalidTeam: false,
            channel: null,
            isInvalidChannel: false,
        };

        //!!! without doing the following, in the function `this` was undefined and this lead to an error
        this.onTeamChange = this.onTeamChange.bind(this);
        this.invalidTeam = this.invalidTeam.bind(this);
        this.onChannelChange = this.onChannelChange.bind(this);
        this.invalidChannel = this.invalidChannel.bind(this);
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
                            uid: user?.uid,
                            displayName: user?.displayName,
                            photoURL: user?.photoURL,
                            // name: user?.name
                        }
                    }))
        );
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

    onChannelChange(channel) {
        this.setState((prevState) => ({ channel: channel }));
    }

    invalidChannel() {
        this.setState((prevState) => ({ isInvalidChannel: true, channel: null }));
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
                        {/* {this.state.authInfo.isAuthenticated === true && !this.props.location.pathname.includes('login') */}
                        {this.state.authInfo.isAuthenticated === true && !this.props.location.pathname.includes('/login') && !this.props.location.pathname.includes('/get-started') && !this.props.location.pathname.includes('/register')
                            ?
                            <Switch>
                                <Route
                                    path="/setupTeam/name" exact
                                    render={(props) => (
                                        <Header className="site-layout-background" style={{ padding: 0 }} />
                                    )}
                                />

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
                            </Switch>
                            : ''
                        }

                        <Layout style={{ minHeight: '100vh' }}>
                            {this.state.authInfo.isAuthenticated === true
                                ?
                                <Switch>
                                    <Route
                                        path="/setupTeam/name" exact
                                        render={(props) => (
                                            <Sidebar {...props} />
                                        )}
                                    />
                                    <Route
                                        path="/:team"
                                        render={(props) => {
                                            if (!props.location.pathname.includes('/login') && !props.location.pathname.includes('/get-started') && !this.props.location.pathname.includes('/register')) return (
                                                <Sidebar {...props} onTeamChange={this.onTeamChange} invalidTeam={this.invalidTeam} team={this.state.team} />
                                            );
                                        }}
                                    />
                                </Switch>
                                : ''
                            }

                            <Layout className="site-layout" style={{ border: '5px solid red', backgroundColor: '#fff' }}>
                                <Content id="col" style={{ margin: '0', height: '100%', border: '2.5px blue solid' }}>
                                    {/* <Route path="/:teamId/:channelId" component={ Channel } /> */}
                                    {/* <Route path="/messages" component={Channel} /> */}
                                    <Route path="/:team/:channel" render={(props) => {
                                        // if (!props.location.pathname.includes('/login') && this.state.channel !== null) return (
                                        if (!props.location.pathname.includes('/login') && !props.location.pathname.includes('/get-started') && !this.props.location.pathname.includes('/register') && this.state.channel !== null) return (
                                            <Channel {...props} channel={this.state.channel} />
                                        );
                                    }} />
                                    {/* //!!!!!! actually it should be path="/:channel" */}

                                    {this.state.isInvalidChannel === true ?
                                        <Route render={() => (<div style={{ justify: 'center', textAlign: 'center', fontWeight: 'bolder', fontSize: '5em' }}>Invalid Channel 404</div>)} />
                                        :
                                        <>
                                            <Row style={{ height: '100%', width: '100%' }}>
                                                <Switch>
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
                                                                // height: '90vh' -> earlier it was so and worked, after the Swtch something changed
                                                                style={{ border: '2.5px solid orange', height: '98vh' }} //!! the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                                                className="column-with-slider"
                                                                id="login-workspaces-column"
                                                            >
                                                                <MyTeamsLogin
                                                                    {...props}
                                                                    authInfo={this.state.authInfo}
                                                                    onTeamChange={this.onTeamChange}
                                                                    onChannelChange={this.onChannelChange}
                                                                //* when the team gets updated from here, a check for its validity would be unnecessary, because the component loads all the user's teams from the database, so they will all be existent and he will be a member of the teams
                                                                />
                                                            </Col>
                                                        )}
                                                    />
                                                    <Route
                                                        path="/get-started" exact
                                                        render={(props) => (
                                                            <Col
                                                                span={24}
                                                                // height: '90vh' -> earlier it was so and worked, after the Swtch something changed
                                                                style={{ border: '2.5px solid orange', height: '98vh' }} //!! the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                                                className="column-with-slider"
                                                            >
                                                                <GetStarted
                                                                    {...props}
                                                                />
                                                            </Col>
                                                        )}
                                                    />
                                                    {/* <Route path="/setupTeam/name" exact
                                                render={(props) => (
                                                    <TeamName />
                                                )}
                                            /> */}
                                                    <Route path="/setupTeam/name" exact
                                                        render={(props) => (
                                                            <SetupNewTeam authInfo={this.state.authInfo} />
                                                        )}
                                                    />
                                                    {/* <Route path="/register" exact
                                                        render={(props) => (
                                                            <Registration
                                                                authInfo={this.state.authInfo}
                                                                className="column-with-slider"
                                                                id="signin-column"
                                                            />
                                                        )}
                                                    /> 
                                                        //!this way the page wouldn't scroll and not all content would be shown */}
                                                    <Route path="/register" exact
                                                        render={(props) => (
                                                            <Col
                                                                span={24}
                                                                style={{ border: '2.5px solid orange', height: '90vh' }} //!! the height: '100%' broke the scrollbar's css and it wouldn't scroll
                                                                className="column-with-slider"
                                                            // id="signin-column"
                                                            >
                                                                <Registration
                                                                    authInfo={this.state.authInfo}
                                                                    {...props}
                                                                />
                                                            </Col>
                                                        )}
                                                    />

                                                    <Route
                                                        // path="/messages"
                                                        path="/:team/:channel"
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
                                                                    team={this.state.team}
                                                                    channel={this.state.channel}
                                                                    onChannelChange={this.onChannelChange}
                                                                    invalidChannel={this.invalidChannel}
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

                                                </Switch>

                                            </Row>
                                            {/* }  close this.state.invalidChannel */}

                                            {/* <Route path="/messages"> */}
                                            {/* <Route path="/:team/:channel">
                                        <TextareaMessage />
                                    </Route> */}
                                            {/*//!!!!!!!! on the GetStarted page I had to add the Url, otherwise I got a Invalid team warning */}
                                            <Switch>
                                                <Route path="/setupTeam/name" exact />
                                                <Route path="/:team/:channel" render={(props) => {
                                                    // if (!props.location.pathname.includes('/login') || !props.location.pathname.includes('/get-started')) return (
                                                    if (!props.location.pathname.includes('/login') && !props.location.pathname.includes('/get-started') && !this.props.location.pathname.includes('/register')) return (
                                                        <TextareaMessage
                                                            {...props}
                                                            team={this.state.team}
                                                            channel={this.state.channel}
                                                            authInfo={this.state.authInfo}
                                                        />
                                                    );
                                                }} />
                                            </Switch>
                                        </>
                                    }

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