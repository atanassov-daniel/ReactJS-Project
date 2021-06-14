import { Component } from 'react';
import { Input, Image, Typography, Row, Col, Button, Card, Avatar } from 'antd';
import { ArrowRightOutlined, UserAddOutlined } from '@ant-design/icons'

import getMyTeams from '../../services/getMyTeams';
import styles from './MyTeamsLogin.module.css';

const { Link, Title } = Typography;

class MyTeamsLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myTeams: null
        };
    }

    componentDidUpdate() { //!!! what if it's really quick and is already logged in on DidMount, wiil this be a problem
        console.log(this.state.myTeams);
        if (this.state.myTeams === null && this.props.authInfo.email) {
            getMyTeams(this.props.authInfo.email)
                // .then(teams => this.setState(() => ({ myTeams: teams })));
                .then(teams => this.setState(() => ({ myTeams: teams })));
        }
    }

    openTeam(key, name, e) {
        // this.props.history.push(`/${e.currentTarget.id}`);
        this.props.history.push(`/${key}/general`);
        this.props.onTeamChange({ name: name, key: key });
        this.props.onChannelChange({ name: 'general' });
    }

    onCreateWorkspaceClick(e) {
        this.props.history.push('/get-started');
    }

    render() {
        /* console.log(this.props.authInfo.email);
        const myTeams = getMyTeams(this.props.authInfo.email);
        console.log(myTeams); */
        /* const authInfo = this.props.authInfo;
        let loading = !authInfo.isAuthenticated; // if not authenticated, then the status of loading will be true
        if (!loading) {
            loading = true;
            getMyTeams(authInfo.email)
                .then(teams => this.setState(() => ({ myTeams: teams })));
        } */
        /* getMyTeams(this.props.authInfo.email)
            .then(teams => this.setState(() => ({ myTeams: teams }))); */

        /* let myTeams = null;
        getMyTeams(this.props.authInfo.email)
            .then(teams => myTeams = teams); */

        return (
            <>
                {this.state.myTeams === null
                    ?
                    <div style={{ textAlign: 'center', fontSize: '10em', fontWeight: 'bold', fontWeight: 'bold' }}>STILL LOADING</div>
                    :
                    <div className={styles.contentWrapper}>
                        <Row style={{ height: '100%', width: '100%', marginTop: '10%' }}>
                            <Link href="/" style={{ margin: 'auto' }} >
                                <Image style={{ width: 'auto' }} src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" preview={false} height={34} />
                            </Link>
                        </Row>

                        <Title level={2} style={{ textAlign: 'center', marginTop: '5%', fontWeight: 'bold', marginBottom: 'auto' }}><span style={{ color: '#480048' }}>Welcome back! </span>You look nice today.</Title>
                        <p style={{ textAlign: 'center', color: 'dimgray', marginBottom: '7%' }}>Choose a workspace below to get back to working with your team.</p>


                        <Card
                            // title="Workspaces for atanassov.daniel@gmail.com"
                            title={
                                <p style={{ fontWeight: 'normal', fontSize: '14.5px', margin: 0 }}>Workspaces for
                                    <span style={{ fontWeight: '500' }}> atanassov.daniel@gmail.com</span>
                                </p>
                            }
                            bodyStyle={{ padding: '0.15em 0 0 1.5em' }}
                            style={{ border: '2px solid lightgray', marginBottom: '5%' }}
                            headStyle={{ borderBottom: '2px solid lightgray' }}
                        >
                            {this.state.myTeams.map(team => (
                                <Card
                                    key={team?.key}
                                    type="inner"
                                    className={styles.innerCard}
                                // title="Inner Card title"
                                // extra={<a href="#">More</a>}
                                >
                                    <Card.Meta
                                        avatar={
                                            <Avatar src={team?.teamPicture || 'https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'} shape="square" size={50} alt="team profile image" />
                                        }
                                        title={team?.name}
                                        //TODO   responsive title ->     https://css-tricks.com/forums/topic/show-truncated-text-by-hovering-only-on-ellipsis/
                                        description="{message.createdAt}"

                                        style={{ width: 'max-content', float: 'left' }} //! so that the button can go on the same row
                                    />

                                    <Button style={{ float: 'right' }} onClick={this.openTeam.bind(this, team?.key, team?.name)}><ArrowRightOutlined /></Button>
                                </Card>
                            ))}
                        </Card>

                        <Card
                            /* title={
                                <p style={{ fontWeight: 'normal', fontSize: '14.5px', margin: 0 }}>Want to use Slack with a different team? </p>
                            } */
                            bodyStyle={{ padding: '0.8em 0.15em 0.8em 0.15em' }}
                            style={{ background: 'rgba(244, 237, 228, .5)', borderRadius: '10px', marginBottom: '5%' }}
                        // headStyle={{ borderBottom: '2px solid lightgray' }}
                        >
                            <Row style={{ height: '100%', width: '100%' }}>
                                <Col span={3} style={{ alignSelf: 'center' }}>
                                    <Image src="https://a.slack-edge.com/bv1-9/get-started-workspaces-icon-88e0cb1.svg" preview={false} height={38} style={{ alignSelf: 'center' }} />
                                </Col>
                                <Col span={10} style={{ alignSelf: 'center', textAlign: 'center' }}>
                                    <span style={{ fontWeight: 'normal', fontSize: '14.5px', margin: 0 }}>Want to use Slack with a different team? </span>
                                </Col>
                                <Col span={3} style={{ alignSelf: 'center' }}>

                                </Col>
                                <Col span={8} style={{ alignSelf: 'center' }}>
                                    <Button
                                        type="text" className={styles.createWorkspace}
                                        // style={{ alignSelf: 'center', maxWidth: '-webkit-fill-available' }}
                                        style={{ alignSelf: 'center' }} //TODO fix the width
                                        onClick={this.onCreateWorkspaceClick.bind(this)}
                                    >
                                        Create Another Workspace
                                    </Button>
                                </Col>
                            </Row>
                            {/* <Image src="https://a.slack-edge.com/bv1-9/get-started-workspaces-icon-88e0cb1.svg" preview={false} height={38} />

                            <p style={{ fontWeight: 'normal', fontSize: '14.5px', margin: 0 }}>Want to use Slack with a different team? </p>

                            <Button style={{ float: 'right' }} onClick={this.openTeam.bind(this)} >Create Another Workspace</Button> */}
                        </Card>

                        {!this.state.invitedTeams
                            ? ''
                            :
                            <>
                                <Title level={4} style={{ marginBottom: '1.5%', fontWeight: 'bold' }}>Pending invitations</Title>
                                <Card
                                    // title="Workspaces for atanassov.daniel@gmail.com"
                                    title={
                                        <p style={{ fontWeight: 'normal', fontSize: '14.5px', margin: 0 }}>Invitations for
                                            <span style={{ fontWeight: '500' }}> atanassov.daniel@gmail.com</span>
                                        </p>
                                    }
                                    bodyStyle={{ padding: '0.15em 0 0 1.5em' }}
                                    style={{ border: '2px solid lightgray', marginBottom: '5%' }}
                                    headStyle={{ borderBottom: '2px solid lightgray' }}
                                >
                                    {/* {this.state?.invitedTeams.map(team => ( */}
                                    {this.state.myTeams.map(team => (
                                        <Card
                                            key={team?.name}
                                            type="inner"
                                            className={styles.innerCard}
                                        // title="Inner Card title"
                                        // extra={<a href="#">More</a>}
                                        >
                                            <p style={{ color: 'dimgray', fontWeight: '500', fontSize: 'small', marginBottom: '1%' }}>
                                                <UserAddOutlined /> Invited by {"Bootcamp Admin"} ({"postman@frontendmasters.com"})
                                            </p>
                                            <Card.Meta
                                                avatar={
                                                    <Avatar src={team?.teamPicture || 'https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'} shape="square" size={50} alt="team profile image" />
                                                }
                                                title={team?.name}
                                                //TODO   responsive title ->     https://css-tricks.com/forums/topic/show-truncated-text-by-hovering-only-on-ellipsis/
                                                description="{message.createdAt}"

                                                style={{ width: 'max-content', float: 'left' }} //! so that the button can go on the same row
                                            />

                                            <Button style={{ float: 'right', border: '1px solid darkgreen', color: 'darkgreen', fontWeight: 'bold' }} onClick={this?.joinInvitedTeam?.bind(this)} id={team?.name}>Join</Button>
                                        </Card>
                                    ))}
                                </Card>
                            </>
                        }
                    </div>
                }
            </>
        );
    }
}

export default MyTeamsLogin;