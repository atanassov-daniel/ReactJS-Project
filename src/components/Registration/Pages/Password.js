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
            passMessage: '',
            repeatPassMessage: '',
            // showLoginButton: false,
        }
    }

    validatePassword(pass) {
        let includesLower = pass.split('').some(letter => /[\u00BF-\u1FFF\u2C00-\uD7FF\w]+/.test(letter) && /^(?=.*[-+_!@#$%^&*.,?]).+$/.test(letter) === false && isNaN(letter) === true && letter.toLocaleLowerCase() === letter); // without the regex special characters would also count as true, without the NaN numbers would too // without this /[\u00BF-\u1FFF\u2C00-\uD7FF\w]+/ only on the first try `/` would be counted as a lowercase, which is incorrect
        if (includesLower === false) { this.setState({ passMessage: 'Password must include a lowercase letter', disabled: true }); return false; }
        else this.setState({ disabled: false, passMessage: '' });

        let includesUpper = pass.split('').some(letter => /[\u00BF-\u1FFF\u2C00-\uD7FF\w]+/.test(letter) && /^(?=.*[-+_!@#$%^&*.,?]).+$/.test(letter) === false && isNaN(letter) === true && letter.toLocaleUpperCase() === letter);
        if (includesUpper === false) { this.setState({ passMessage: 'Password must include an uppercase letter', disabled: true }); return false; }
        else this.setState({ disabled: false, passMessage: '' });

        if (/(?=.*\d)/.test(pass) === false) { this.setState({ passMessage: 'Password must include at least one number', disabled: true }); return false; }
        else this.setState({ disabled: false, passMessage: '' });

        if (pass.trim().length < 6 || pass.includes(' ')) { this.setState({ passMessage: 'Invalid Password! Password should be at least 6 characters long and can\'t contain whitespaces', disabled: true }); return false; }
        else this.setState({ disabled: false, passMessage: '' });

        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/
        if (/^(?=.*[-+_!@#$%^&*.,?]).+$/.test(pass) === false) { this.setState({ passMessage: 'Password must include at least one special character', disabled: true }); return false; }
        else this.setState({ disabled: false, passMessage: '' });
        // 'здр12'.match(/[\u00BF-\u1FFF\u2C00-\uD7FF\w]+/) -> this includes international letters too
        // /[\u00BF-\u1FFF\u2C00-\uD7FF\w]+/

        if (pass !== this.state.repeatPass) { this.setState({ repeatPassMessage: 'Passwords don\'t match', disabled: true }); return false; }
        else this.setState({ disabled: false, repeatPassMessage: '' });

        return true;
    }

    onPasswordChange = ({ target: { value: pass } }) => {
        this.setState({ password: pass });

        this.validatePassword(pass);

        /* let includesLower = pass.split('').some(letter => /[\u00BF-\u1FFF\u2C00-\uD7FF\w]+/.test(letter) && /^(?=.*[-+_!@#$%^&*.,?]).+$/.test(letter) === false && isNaN(letter) === true && letter.toLocaleLowerCase() === letter); // without the regex special characters would also count as true, without the NaN numbers would too // without this /[\u00BF-\u1FFF\u2C00-\uD7FF\w]+/ only on the first try `/` would be counted as a lowercase, which is incorrect
        if (includesLower === false) { this.setState({ passMessage: 'Password must include a lowercase letter', disabled: true }); return; }
        else this.setState({ disabled: false, passMessage: '' });

        let includesUpper = pass.split('').some(letter => /[\u00BF-\u1FFF\u2C00-\uD7FF\w]+/.test(letter) && /^(?=.*[-+_!@#$%^&*.,?]).+$/.test(letter) === false && isNaN(letter) === true && letter.toLocaleUpperCase() === letter);
        if (includesUpper === false) { this.setState({ passMessage: 'Password must include an uppercase letter', disabled: true }); return; }
        else this.setState({ disabled: false, passMessage: '' });

        if (/(?=.*\d)/.test(pass) === false) { this.setState({ passMessage: 'Password must include at least one number', disabled: true }); return; }
        else this.setState({ disabled: false, passMessage: '' });

        if (pass.trim().length < 6 || pass.includes(' ')) { this.setState({ passMessage: 'Invalid Password! Password should be at least 6 characters long and can\'t contain whitespaces', disabled: true }); return; }
        else this.setState({ disabled: false, passMessage: '' });

        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+$/
        if (/^(?=.*[-+_!@#$%^&*.,?]).+$/.test(pass) === false) { this.setState({ passMessage: 'Password must include at least one special character', disabled: true }); return; }
        else this.setState({ disabled: false, passMessage: '' });
        // 'здр12'.match(/[\u00BF-\u1FFF\u2C00-\uD7FF\w]+/) -> this includes international letters too
        // /[\u00BF-\u1FFF\u2C00-\uD7FF\w]+/

        if (pass !== this.state.repeatPass) this.setState({ repeatPassMessage: 'Passwords don\'t match', disabled: true });
        else this.setState({ disabled: false, repeatPassMessage: '' }); */
    }

    onRepeatPassChange = ({ target: { value: repeatPass } }) => {
        this.setState({ repeatPass: repeatPass });

        if (repeatPass !== this.state.password) this.setState({ repeatPassMessage: 'Passwords don\'t match', disabled: true });
        else this.setState({ disabled: false, repeatPassMessage: '' });

        if (repeatPass.trim().length < 6 || repeatPass.includes(' ')) this.setState({ repeatPassMessage: 'Invalid Password! Password should be at least 6 characters long and can\'t contain whitespaces', disabled: true });
        else this.setState({ disabled: false, repeatPassMessage: '' });
    }

    registerUser(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('successfully registered');
                console.log(userCredential);
                console.log(this.props);

                console.log(email.match(/(?<username>\S+)@(?<domain>\S+\.\S+)/));

                db
                    .collection(`users`)
                    .add({
                        createdAt: firestore.FieldValue.serverTimestamp(),
                        email: this.props.email.toLocaleLowerCase(),
                        uid: userCredential.user.uid,
                        teams: [],
                        profileInfo: {
                            fullName: email.match(/(?<username>\S+)@(?<domain>\S+\.\S+)/).groups.username,
                            displayName: '',
                            whatIdo: '',
                            phoneNumber: '',
                            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                            photoURL: ''
                        }
                        // name: this.state.name,
                        // photoURL: this.props.authInfo.photoURL,
                    })
                    .then((docRef) => {
                        // docRef.id
                        console.log('added .THEN');
                        this.props.history.push('/setupTeam/name');
                    })
            })
            .catch((error) => {
                alert(`Couldn't be registered - ${error.message}`);
            });
    }

    onSubmitPassword() {
        const pass = this.state.password;
        /* const repeatPass = this.state.repeatPass;

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
        } */

        if (this.validatePassword(pass)) this.registerUser(this.props.email, pass);
        else alert('Please try again!');
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

                                <ol style={{ textAlign: '-webkit-left' }}>
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
                                style={{ marginBottom: '1%' }}
                            />
                            <div style={{ marginBottom: '1%', textAlign: 'left' }}>{this.state.passMessage}</div>
                            <Input.Password
                                placeholder="Repeat password"
                                size="large"
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                className={styles.emailInput}
                                id="password-input"
                                // onPressEnter={(e) => document.getElementById('login-button').focus()}
                                onChange={this.onRepeatPassChange}
                            />
                            <div style={{ marginBottom: '1%', textAlign: 'left' }}>{this.state.repeatPassMessage}</div>


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