import { Component } from 'react';
import { Typography, Row, Col, Button, Input } from 'antd';
import { db, firestore } from '../../../utils/firebase';

import styles from './TeamName.module.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

class TeamChannels extends Component {
    constructor(props) {
        super(props);

        this.state = {
            channel: '',
            disabled: true,
        }

        console.log(this.props.step);
    }

    onChannelChange = ({ target: { value } }) => {
        this.setState({ channel: value });
        console.log(value);

        if (value.trim() === '' || value.length > 80) this.setState({ disabled: true });
        else this.setState({ disabled: false });
    }

    finalizeChannel() {
        if (this.state.channel.trim() === '' || this.state.channel.length > 80) {
            this.setState({ disabled: true });
            alert('Please insert a valid channel name and try again!');
            return;
        }

        db
            // teams/${this.props.team.name}/channels/${this.props.channel.name}/posts
            .collection(`teams/${this.props.team}/channels`)
            .add({
                createdAt: firestore.FieldValue.serverTimestamp(), name: this.state.channel,
                createdBy: {
                    email: this.props.authInfo.email,
                    uid: this.props.authInfo.uid,
                    name: this.props.authInfo.displayName,
                    photoURL: this.props.authInfo.photoURL
                },
                members: [this.props.authInfo.email]
            }) //name: this.props.authInfo.name
            .then((docRef) => {
                console.log("Channel written with ID: ", docRef.id);
                this.props.setChannel({ name: this.state.channel, id: docRef.id });

                if (this.state.channel !== 'general') db
                    .collection(`teams/${this.props.team}/channels`)
                    .add({
                        createdAt: firestore.FieldValue.serverTimestamp(), name: 'general',
                        createdBy: {
                            email: this.props.authInfo.email,
                            uid: this.props.authInfo.uid,
                            name: this.props.authInfo.displayName,
                            photoURL: this.props.authInfo.photoURL
                        },
                        members: [this.props.authInfo.email]
                    }) //name: this.props.authInfo.name
                    .then((docRef) => {
                        console.log("'GENERAL' channel written with ID: ", docRef.id);
                        this.props.changePage();
                    })
                    .catch((error) => {
                        alert(`This action couldn't be performed: ${error}. Please try again!`);
                    });
            })
            .catch((error) => {
                alert(`This action couldn't be performed: ${error}. Please try again!`);
            });
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <Paragraph style={{ marginTop: '4%' }}>Step 2 of 3</Paragraph>
                <Title level={1} style={{ marginTop: '4%', fontWeight: 'bold' }}>What’s your team working on right now?</Title>
                <Paragraph style={{ marginTop: '-1%' }}>This could be anything: a project, campaign, event, or the deal you’re trying to close.</Paragraph>

                <TextArea
                    placeholder="Ex: Q4 budget, autumn campaign"
                    showCount={true}
                    maxLength={80}
                    autoSize={{ maxRows: 1 }}
                    value={this.state.channel}
                    onChange={this.onChannelChange}
                    style={{ marginBottom: '10%', marginTop: '4%' }}
                />
                <Button disabled={this.state.disabled}
                    // onClick={(e) => { this.props.changePage(); this.finalizeChannel(); }}
                    onClick={(e) => { this.finalizeChannel(); }}
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
                                padding: '1.5% 12%',
                            } : {
                                backgroundColor: 'lightgray',
                                color: '#0000009c',
                                fontWeight: 'bold',
                                fontSize: 'large',
                                height: 'fit-content',
                                width: 'fit-content',
                                borderRadius: '0.25em',
                                padding: '1.5% 12%',
                            }
                    }
                >Next</Button>
            </div>
        )
    }
}

export default TeamChannels;