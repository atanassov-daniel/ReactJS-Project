import { Component } from 'react';
import { Typography, Row, Col, Button, Input } from 'antd';
import { db, firestore } from '../../../utils/firebase';

import styles from './TeamName.module.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default class TeamName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            disabled: true,
        }
    }

    onNameChange = ({ target: { value } }) => {
        this.setState({ name: value });

        if (value.trim() === '' || value.length > 50) this.setState({ disabled: true });
        else this.setState({ disabled: false });
    }

    finalizeTeam() {
        if (this.state.name.trim() === '' || this.state.name.length > 50) {
            this.setState({ disabled: true });
            alert('Please insert a valid name and try again!');
            return;
        }

        const { email, uid } = this.props.authInfo;
        console.log(this.props.profileInfo);
        const { displayName, fullName, photoURL, whatIdo } = this.props.profileInfo;

        const creatorObj = {
            uid: uid,
            email: email,
            photoURL: photoURL,
            // name: authInfo.displayName,
            // photoURL: authInfo.photoURL
        };

        db
            // teams/${this.props.team.name}/channels/${this.props.channel.name}/posts
            .collection(`teams`)
            .add({
                createdAt: firestore.FieldValue.serverTimestamp(),
                name: this.state.name,
                createdBy: { ...creatorObj, name: displayName || fullName },
                members: [{ ...creatorObj, displayName, fullName, whatIdo }]
            }) //name: authInfo.name
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);

                /* db
                    .collection(`users`)
                    .doc('arrayUpdate')
                    .update({
                        joinedAt: firestore.FieldValue.serverTimestamp(), name: this.state.name,
                        key: docRef.id, role: 'creator'
                    }) //name: this.props.authInfo.name
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch((error) => {
                        alert(`This action couldn't be performed: ${error}. Please try again!`);
                    }); */
                docRef.get().then(doc => {
                    const { createdAt, name: teamName } = doc.data();
                    const id = docRef.id;

                    db
                        .collection(`users`)
                        // .where('email', '==', 'arrUpdate@gmail.com')
                        .where('uid', '==', uid)
                        // .where('email', '==', email)
                        .get()
                        .then(querySnapshot => {
                            const obj = {
                                joinedAt: createdAt, name: teamName,
                                key: id, role: 'creator'
                            };

                            if (querySnapshot.empty === false) {
                                querySnapshot.forEach(doc => {
                                    if (doc.exists) doc.ref.update(
                                        {
                                            teams: firestore.FieldValue.arrayUnion(obj/* "val"*/)
                                        }
                                    )
                                })
                            } /*//* this would be completely unnecessary, because when registering a user, he'll undoubtedly be added to the USERS COLLECTION
                            else {
                                db
                                    // teams/${this.props.team.name}/channels/${this.props.channel.name}/posts
                                    .collection(`users`)
                                    .add({
                                        createdAt: firestore.FieldValue.serverTimestamp(),
                                        email: this.props.authInfo.email,
                                        uid: this.props.authInfo.email,
                                        name: this.props.authInfo.displayName,
                                        photoURL: this.props.authInfo.photoURL,
                                        teams: [obj]
                                    });
                            } */
                        });

                    this.props.setTeam({ key: docRef.id, name: this.state.name });
                    this.props.changePage();
                    //!!! what if the users collection adding is unsuccessful, the team will still be set and the user will get redirected to a team he isn't a member of according to the suers collection 

                    /* db
                        .collection(`users`)
                        // .where('email', '==', 'arr@gmail.com')
                        // .where('email', '==', 'arr@abv.bg')
                        .doc('zjI0UyMBuqBlr5CIMxDW')
                        .update({
                            teams: firestore.FieldValue.arrayUnion(
                                {
                                    joinedAt: createdAt, name: name,
                                    key: id, role: 'creator'
                                }
                                // "val"
                            )
                        }) //name: this.props.authInfo.name */

                    /* 
                    .update({
                            teams: firestore.FieldValue.arrayUnion("value")
                    })
                    */
                })

                /* this.props.setTeam(docRef.id);
                this.props.changePage(); */
            })
            .catch((error) => {
                alert(`This action couldn't be performed: ${error}. Please try again!`);
            });
    }

    render() {
        return (
            <>
                <div className={styles.wrapper}>
                    <Paragraph style={{ marginTop: '4%' }}>Step 1 of 3</Paragraph>
                    <Title level={1} style={{ marginTop: '4%', fontWeight: 'bold' }}>What’s the name of your company or team?</Title>
                    <Paragraph style={{ marginTop: '-1%' }}>This will be the name of your Slack workspace — choose something that your team will recognize.</Paragraph>

                    <TextArea
                        placeholder="Ex: Acme Marketing or Acme Co"
                        showCount={true}
                        maxLength={50}
                        autoSize={{ maxRows: 1 }}
                        value={this.state.name}
                        onChange={this.onNameChange}
                        style={{ marginBottom: '10%', marginTop: '4%' }}
                        onPressEnter={(e) => document.getElementById("next-button").focus()}
                    />
                    <Button disabled={this.state.disabled}
                        onClick={(e) => { this.finalizeTeam(); }}
                        id="next-button"
                        // onClick={(e) => { this.props.changePage(); this.finalizeTeam(); }}
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
            </>
        )
    }
}
