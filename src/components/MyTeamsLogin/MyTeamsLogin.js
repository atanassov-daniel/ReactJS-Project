import { Component } from 'react';
import { Input, Image, Typography, Row, Col, Button, Card, Avatar } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons'

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
        if (this.state.myTeams === null) {
            getMyTeams(this.props.authInfo.email)
                // .then(teams => this.setState(() => ({ myTeams: teams })));
                .then(teams => this.setState(() => ({ myTeams: teams })));
        }
    }

    openTeam(e) {
        this.props.history.push(`/${e.currentTarget.id}`);
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
                {this.state.myTeams === null ?
                    <div style={{ textAlign: 'center', fontSize: '10em', fontWeight: 'bold', fontWeight: 'bold' }}>STILL LOADING</div>
                    :
                    <div className={styles.contentWrapper}>
                        <Row style={{ height: '100%', width: '100%', marginTop: '10%' }}>
                            <Link href="/" style={{ margin: 'auto' }} >
                                <Image style={{ width: 'auto' }} src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" preview={false} height={34} />
                            </Link>
                        </Row>

                        <Title level={2} style={{ textAlign: 'center', marginTop: '5%', fontWeight: 'bold', marginBottom: 'auto' }}><span style={{ color: '#480048' }}>Welcome back! </span>You look nice today.</Title>
                        <p style={{ textAlign: 'center', color: 'dimgray', marginBottom: '3%' }}>Choose a workspace below to get back to working with your team.</p>


                        <Card
                            // title="Workspaces for atanassov.daniel@gmail.com"
                            title={
                                <p style={{ fontWeight: 'normal', fontSize: '14.5px', margin: 0 }}>Workspaces for
                                <span style={{ fontWeight: 'bold' }}> atanassov.daniel@gmail.com</span>
                                </p>
                            }
                            bodyStyle={{ padding: '0.15em 0 0 1.5em' }}
                            style={{ border: '2px solid lightgray' }}
                            headStyle={{ borderBottom: '2px solid lightgray' }}
                        >
                            {this.state.myTeams.map(team => (
                                <Card
                                    key={team?.name}
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
                                    
                                    <Button style={{ float: 'right' }} onClick={this.openTeam.bind(this)} id={team?.name} ><ArrowRightOutlined /></Button>
                                </Card>
                            ))}
                        </Card>

                    </div>
                }
            </>
        );
    }
}

export default MyTeamsLogin;