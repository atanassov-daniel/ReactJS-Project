import { Component } from 'react';

import { Input, Image, Typography, Row, Col, Button } from 'antd';
import { Route } from 'react-router-dom';

// import { db, firestore, auth } from '../../utils/firebase';

import Email from './Pages/Email';
import Password from './Pages/Password';

const { Paragraph, Link, Title } = Typography;

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            email: null,
            password: null,

        }

        this.pages = [Email, Password];
        //!!! or I could use hash routing for the subpages for the different sterps of the process
    }

    changePage() {
        console.log(this);
        this.setState((prevState) => ({ step: prevState.step + 1 }));
        console.log('change??');
        console.log(this.state.step);
    }

    setEmail(email) {
        console.log('email' + email);
        this.setState(() => ({ email }));
    }

    onRegister(e) {
                /* auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('successfully registered');
                console.log(this.props);
                this.props.history.push('/login/workspaces');
            })
            .catch((error) => {
                alert(`Couldn't be registered - ${error.message}`);
            }); */
    }

    render() {
        return (
            <>
                {this.pages
                    .filter((Comp, index) => index === this.state.step)
                    .map(Comp => (
                        <Route
                            render={(props) =>
                                <Comp
                                    step={this.state.step}
                                    changePage={this.changePage.bind(this)}
                                    setEmail={this.setEmail.bind(this)}
                                    authInfo={this.props.authInfo}
                                    email={this.state.email}
                                    {...props}
                                />
                            }
                        />
                    ))}
            </>
        )
    }
}

export default Registration;