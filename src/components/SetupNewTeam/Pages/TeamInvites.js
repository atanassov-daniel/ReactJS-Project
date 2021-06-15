import { Component } from 'react';
import { Typography, Row, Col, Button, Input } from 'antd';

import styles from './TeamName.module.css';
import ReactDOM from 'react-dom';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

class TeamInvites extends Component {
    constructor(props) {
        super(props);

        this.state = {
            channel: '',
            disabled: false,
        }

        console.log(this.props.step);
    }

    /* onChannelChange = ({ target: { value } }) => {
        this.setState({ channel: value });

        if (value.trim() === '') this.setState({ disabled: true });
        else this.setState({ disabled: false });
    } */

    finalizeSetup() {
        ReactDOM.render(<Input type="email" placeholder="Ex. 4th el!?" style={{ marginBottom: '3.5%' }} />, document.getElementById('email-inputs'));
    }

    skipStep(e) {
        //!! if some of the inputs has been filled, warn the user they'll lose the data if the proceed
        this.props.history.push(`/${this.props.team.key}/${this.props.channel.key}`);
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <Paragraph style={{ marginTop: '4%' }}>Step 3 of 3</Paragraph>
                <Title level={1} style={{ marginTop: '4%', fontWeight: 'bold' }}>Who do you email most at work?</Title>
                <Paragraph style={{ marginTop: '-1%' }}>To give Slack a spin, add a few coworkers you talk with regularly.</Paragraph>

                <div id="email-inputs">
                    <Input type="email" placeholder="Ex. ellis@gmail.com" style={{ marginBottom: '3.5%' }} />
                    <Input type="email" placeholder="Ex. ellis@gmail.com" value={this.state.channel}
                        onChange={this.onChannelChange} style={{ marginBottom: '3.5%' }} />
                    <Input type="email" placeholder="Ex. ellis@gmail.com" value={this.state.channel}
                        onChange={this.onChannelChange} style={{ marginBottom: '3.5%' }} />
                </div>



                <Button disabled={this.state.disabled}
                    onClick={this.finalizeSetup.bind(this)}
                    style={
                        this.state.disabled === false
                            ? {
                                backgroundColor: '#611f69',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 'large',
                                height: 'fit-content',
                                width: 'fit-content',
                                borderRadius: '0.25em',
                                padding: '1.5% 5%',
                            } : {
                                backgroundColor: 'lightgray',
                                color: '#0000009c',
                                fontWeight: 'bold',
                                fontSize: 'large',
                                height: 'fit-content',
                                width: 'fit-content',
                                borderRadius: '0.25em',
                                padding: '1.5% 5%',
                            }
                    }
                >Add Teammates</Button>
                <span className={styles.skipStep} onClick={this.skipStep.bind(this)}>Skip this step</span>
            </div>
        )
    }
}

export default TeamInvites;