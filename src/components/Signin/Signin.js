import { Component } from 'react';

import { Input, Image, Typography, Row, Col, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Icon from '@ant-design/icons';

import { auth } from '../../utils/firebase';

import styles from './Signin.module.css';

const { Paragraph, Link, Title } = Typography;

class Signin extends Component {
    onLogin(e) {
        const [email, password] = [...document.querySelectorAll('input')].map(el => el.value);

        // let isValid = validateInputFields(email, password);
        // if (isValid === false) return;

        if (email.match(/\S+@\S+\.\S+/) === null) {
            alert('The email address is invalid!');
            return;
        }

        if (password.length < 6) {
            alert('The password should be at least 6 characters long!');
            return;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('logged in');
                console.log(this.props); // without binding 'this' further down, 'this' was undefined
                this.props.history.push('/messages');
            })
            .catch((error) => {
                alert(`Couldn't log in - ${error.message}`);
            });
    }

    render() {
        return (
            <>
                <Row style={{ height: '100%', width: '100%' }}>
                    <Col span={24} className={styles.mainContainer}>

                        <div className={styles.contentWrapper}>
                            {/* <Link href="/">
                                <Image style={{ width: 'auto', marginTop: '20%' }} src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" preview={false} height={34} className="fuck" />
                            </Link> */}
                            <Row>
                                <Col span={14} className={styles.imageColumn} >
                                    <Link href="/" style={{ float: 'right' }}>
                                        <Image style={{ width: 'auto', marginTop: '20%' }} src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" preview={false} height={34} />
                                    </Link>
                                </Col>
                                <Col span={10} className={styles.createAccountColumn} >
                                    <div style={{ marginTop: '5%' }}>
                                        <Paragraph style={{ marginBottom: '0.3em' }}>New to Slack?</Paragraph>
                                        <Link className={styles.createLink} href="register">Create an account</Link>
                                    </div>
                                </Col>
                            </Row>

                            <div className={styles.createAccountBlock}>
                                <Paragraph style={{ marginBottom: '0.3em' }}>New to Slack?</Paragraph>
                                <Link className={styles.createLink} href="register">Create an account</Link>
                            </div>

                            <Title style={{ marginTop: '7.5%' }}>Sign in to Slack</Title>

                            <p style={{ color: '#505050', fontSize: '1.2em', marginBottom: '7.5%' }}>
                                We suggest using the
                            <span style={{ fontWeight: 'bold', display: 'inline' }}> email address you use at work.</span>
                            </p>

                            <Button
                                type="primary"
                                size="large"
                                block
                                className={styles.google}
                            // style={{ backgroundColor: 'white', fontWeight: 'bold', color: '#4285f4'/* , textShadow: 'none' */ }}
                            >
                                <Icon component={() => <img src="https://iconape.com/wp-content/files/uy/64779/svg/google-icon.svg" height="25px" style={{ marginBottom: '30%' }} alt="Google logo" />} />
                            Sign in with Google
                        </Button>
                            <Button type="primary" size="large" block
                                // style={{ backgroundColor: 'white', fontWeight: 'bold', color: 'black' }}
                                className={styles.github}
                            >
                                <Icon component={() => <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" height="25px" style={{ marginBottom: '30%' }} alt="Google logo" />} />
                            Sign in with GitHub
                        </Button>

                            <Row style={{ marginBottom: '5%' }}>
                                <Col span={10}> <hr /> </Col>
                                <Col span={4}><span> OR </span></Col>
                                <Col span={10}> <hr /> </Col>
                            </Row>

                            <Input size="large" placeholder="name@work-email.com" bordered={true} type="email" className={styles.emailInput} />
                            <Input.Password
                                placeholder="password"
                                size="large"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                className={styles.emailInput}
                                id="password-input"
                            />

                            <Button type="primary" size="large" block
                                // style={{ backgroundColor: '#4e004e', fontWeight: 'bold', color: 'white', marginBottom: '10%' }}
                                className={styles.signInEmailButton}
                                id="login-button"
                                onClick={this.onLogin.bind(this)}
                            >
                                Sign In with Email
                        </Button>
                        </div>
                    </Col>

                    {/* <div>
                        <Paragraph style={{ marginBottom: '0.3em' }}>New to Slack?</Paragraph>
                        <Link className={styles.createLink}>Create an account</Link>
                    </div> */}
                </Row>

            </>
        )
    }
}

export default Signin;