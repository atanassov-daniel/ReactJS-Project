import { Component } from 'react';

import { Input, Image, Typography, Row, Col, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { db, firestore, auth } from '../../../utils/firebase';

import styles from './PagesStyle.module.css';

const { Paragraph, Link, Title } = Typography;
// const { TextArea } = Input;

export default class Password extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            repeatPass: '',
            disabled: true,
            // showLoginButton: false,
        }
    }

    onPasswordChange = ({ target: { value: pass } }) => {
        this.setState({ password: pass });

        const repeatPass = this.state.repeatPass;

        if (pass.trim() === '' || pass.includes(' ') || repeatPass.trim() === '' || repeatPass.includes(' ') || pass !== repeatPass) this.setState({ disabled: true });
        else this.setState({ disabled: false });
    }

    onRepeatPassChange = ({ target: { value: repeatPass } }) => {
        this.setState({ repeatPass: repeatPass });

        const pass = this.state.password;

        if (repeatPass.trim() === '' || repeatPass.includes(' ') || pass.trim() === '' || pass.includes(' ') || pass !== repeatPass) this.setState({ disabled: true });
        else this.setState({ disabled: false });
    }

    registerUser(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('successfully registered');
                console.log(userCredential);
                console.log(this.props);
                this.props.history.push('/setupTeam/name');

                db
                    .collection(`users`)
                    .add({
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        email: this.state.email,
                        uid: userCredential?.uid,
                        // name: this.state.name,
                        // photoURL: this.props.authInfo.photoURL,
                    })
            })
            .catch((error) => {
                alert(`Couldn't be registered - ${error.message}`);
            });
    }

    onSubmitPassword() {
        const pass = this.state.password;
        const repeatPass = this.state.repeatPass;

        if (pass !== repeatPass) {
            this.setState({ disabled: true });
            alert('Passwords don\'t match!');
            return;
        }
        if (pass.trim() === '' || pass.includes(' ')) {
            this.setState({ disabled: true });
            alert('Please insert a valid password and try again!');
            return;
        }
        if (repeatPass.trim() === '' || repeatPass.includes(' ')) {
            this.setState({ disabled: true });
            alert('Please insert a valid repeat password and try again!');
            return;
        }

        this.registerUser(this.props.email, pass);

    }

    render() {
        return (
            <>
                <Row style={{ height: '100%', width: '100%' }}>
                    <Col span={18} className={styles.mainContainer}>

                        <div className={styles.contentWrapper}>
                            {/* <Link href="/">
                                <Image style={{ width: 'auto', marginTop: '20%' }} src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" preview={false} height={34} className="fuck" />
                            </Link> */}
                            <Row>
                                <Col span={14} className={styles.imageColumn} >
                                    <Link href="/" style={{ float: 'right' }}>
                                        <Image style={{ width: 'auto', marginTop: '20%' }} src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" preview={false} height={34} />
                                    </Link>
                                </Col>{/* 
                                <Col span={10} className={styles.createAccountColumn} >
                                    <div style={{ marginTop: '5%' }}>
                                        <Paragraph style={{ marginBottom: '0.3em' }}>New to Slack?</Paragraph>
                                        <Link className={styles.createLink} href="register">Create an account</Link>
                                    </div>
                                </Col> */}
                            </Row>

                            <Title style={{ marginTop: '7.5%', fontWeight: 'bolder' }}>Now choose a strong password</Title>

                            <div style={{ border: '1.5px solid gray', color: '#505050', fontSize: '1.2em', marginBottom: '7.5%' }}>
                                <p style={{ marginBottom: '1.5%' }}>
                                    Make sure it isn't easily guessable with the help of the
                                    <span style={{ fontWeight: 'bold', display: 'inline' }}> following tips:</span>
                                </p>

                                <ol>
                                    <li>Don't use trivial easily guessable things like qwerty, 123456, passw0rd, abc123, etc.</li>
                                    <li>Make sure it is at least 12 characters long</li>
                                    <li>Use a mix of uppercase and lowercase letters</li>
                                    <li>Also use at least one number</li>
                                    <li>Try to use at least one special character</li>
                                    <li>Either save it somewhere or make sure you can remember it</li>
                                </ol>
                            </div>

                            <Input.Password
                                placeholder="Password"
                                size="large"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                className={styles.emailInput}
                                id="password-input"
                                // onPressEnter={(e) => document.getElementById('login-button').focus()}
                                onChange={this.onPasswordChange}
                            />
                            <Input.Password
                                placeholder="Repeat password"
                                size="large"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                className={styles.emailInput}
                                id="password-input"
                                // onPressEnter={(e) => document.getElementById('login-button').focus()}
                                onChange={this.onRepeatPassChange}
                            />

                            <Button
                                disabled={this.state.disabled}
                                onClick={(e) => { this.onSubmitPassword(); }}
                                id="next-button" id="login-button"
                                type="primary"
                                size="large"
                                block
                                // style={{ backgroundColor: '#4e004e', fontWeight: 'bold', color: 'white', marginBottom: '10%' }}
                                className={styles.signInEmailButton}
                                style={
                                    this.state.disabled === false
                                        ? {
                                            backgroundColor: '#611f69',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: 'large',
                                            height: 'fit-content',
                                            // width: 'fit-content', this f'd up the block width as the input
                                            borderRadius: '0.25em',
                                            padding: '1.5% 12%',
                                        } : {
                                            backgroundColor: 'lightgray',
                                            color: '#0000009c',
                                            fontWeight: 'bold',
                                            fontSize: 'large',
                                            height: 'fit-content',
                                            // width: 'fit-content', this f'd up the block width as the input
                                            borderRadius: '0.25em',
                                            padding: '1.5% 12%',
                                        }
                                }
                            >
                                Register
                            </Button>
                        </div>
                    </Col>
                </Row>
            </>
        )
    }
}