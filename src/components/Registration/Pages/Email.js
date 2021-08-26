import { Component } from 'react';
//TODO add a check icon at the right of the box when the email is valid (that's how it is in Slack)

import { Input, Image, Typography, Row, Col, Button } from 'antd';

import { auth } from '../../../utils/firebase';

import styles from './PagesStyle.module.css';

const { Paragraph, Link, Title } = Typography;
// const { TextArea } = Input;

export default class Email extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            disabled: true,
            showLoginButton: false,
        }
    }

    onEmailChange = ({ target: { value } }) => {
        this.setState({ email: value });

        /* //* had to change it because of the following:
            style={{ height: '100%', width: '100%' }}@abv.bg 
        would lead to a match; even though the whole string is invalid, a certain substring of it 
        does indeed match the regex(}}@abv.bg)
        */
        console.log(value);
        const match = value.match(/\S+@\S+\.\S+/);
        //! with the following one if there is a capital letter in the first part of the email the match would start after the capital letter // const match = value.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
        console.log(match);

        if (value.trim() === '' || (match === null || match[0] !== value)) this.setState({ disabled: true });
        else this.setState({ disabled: false });
    }

    onSubmitEmail() {
        const email = this.state.email;

        if (email.trim() === '' || email.match(/\S+@\S+\.\S+/) === null) {
            this.setState({ disabled: true });
            alert('Please insert a valid email and try again!');
            return;
        }

        // ! if the user already exists, then don't let the person go to the enxt step

        /* auth.fetchSignInMethodsForEmail(email)
            .then(resp => {
                // this means that an account with this email address already existsand => //TODO using the methods returned offer the user to sign in using the possible providers connected to his profile
                console.log(resp);
                alert('An account with this email address already exists. Please sign in!');
                this.setState(() => ({ showLoginButton: true, disabled: true })); //* showing the user their providers probably isn't much of a good thing to do security-wise
            })
            .catch(err => {
                console.log(`${err.code} - ${err.message}`)

                if (err.code === 'auth/invalid-email') { // this means there is no registered user with this email
                    this.props.setEmail({});
                    this.props.changePage();
                }
            }) */
        auth.fetchSignInMethodsForEmail(email)
            .then(resp => {
                console.log(resp);

                if (resp.length > 0) { // this means that an account with this email address already existsand => //TODO using the methods returned offer the user to sign in using the possible providers connected to his profile
                    alert('An account with this email address already exists. Please sign in!');
                    this.setState(() => ({ showLoginButton: true, disabled: true })); //* showing the user their providers probably isn't much of a good thing to do security-wise
                } else {
                    this.props.setEmail(email);
                    this.props.changePage();
                }
            })
            .catch(err => {
                alert(`${err.code} - ${err.message}`)
            });

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

                            <Title style={{ marginTop: '7.5%', fontWeight: 'bolder' }}>First, enter your email</Title>

                            <p style={{ color: '#505050', fontSize: '1.2em', marginBottom: '7.5%' }}>
                                We suggest using the
                                <span style={{ fontWeight: 'bold', display: 'inline' }}> email address you use at work.</span>
                            </p>

                            <Input size="large" placeholder="name@work-email.com" bordered={true} type="email" className={styles.emailInput} onChange={this.onEmailChange} />

                            {this.state.showLoginButton === false
                                ? ''
                                :
                                <div style={{ marginTop: '5%' }}>
                                    <Paragraph style={{ marginBottom: '0.3em', display: 'inline' }}>Already have an account? Login by clicking <Link className={styles.createLink} href="register" style={{ display: 'inline' }}>here</Link></Paragraph>
                                </div>
                            }

                            <Button
                                disabled={this.state.disabled}
                                onClick={(e) => { this.onSubmitEmail(); }}
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
                                Continue
                            </Button>
                        </div>
                    </Col>
                </Row>
            </>
        )
    }
}