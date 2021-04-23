import { Component } from 'react';
import { Input, Image, Typography, Row, Col, Button, Card } from 'antd';

import styles from './MyTeamsLogin.module.css';

const { Link, Title } = Typography;

class MyTeamsLogin extends Component {
    render() {
        return (
            <>
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
                    >
                        <Card
                            type="inner"
                            className={styles.innerCard}
                        // title="Inner Card title"
                        // extra={<a href="#">More</a>}
                        >
                            Inner Card content
                        </Card>
                        <Card
                            // style={{ marginTop: 16 }}
                            type="inner"
                            className={styles.innerCard}
                        // title="Inner Card title"
                        // extra={<a href="#">More</a>}
                        >
                            Inner Card content
                        </Card>
                    </Card>


                </div>
            </>
        );
    }
}

export default MyTeamsLogin;