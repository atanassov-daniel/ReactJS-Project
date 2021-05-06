import { Component } from 'react';
/* import firebase from 'firebase/app';
import 'firebase/firestore'; */
//* 
import { db } from '../../utils/firebase';
//* 
//!!!! with the current implementation if I delete a message from the DB it will suddenly disappear from the page too
import { Skeleton, Card, Avatar, Image } from 'antd';
import { SettingOutlined, EllipsisOutlined, EditOutlined } from '@ant-design/icons';

import getChannel from '../../services/getChannel';

import './Messages.css';
// import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
const { Meta } = Card;

/* // Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBg39vkJc3CaI-J6bnevQPMPILG8PWmzyI",
    authDomain: "slack-app-1d097.firebaseapp.com",
    projectId: "slack-app-1d097",
    storageBucket: "slack-app-1d097.appspot.com",
    messagingSenderId: "222925739959",
    appId: "1:222925739959:web:afcdf3e05cf61fa02e7a32"
});

let db = firebase.firestore(); */

class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            messages: [],
        };
    }

    componentDidMount() {
        /* if (this.props.channel === null && this.props.team !== null) {
            const channel = this.props.match.params.channel;
            console.log(channel);
            if (channel) {
                getChannel(this.props.team, channel)
                    .then(channelInfo => {
                        if (channelInfo === null) {
                            this.props.invalidChannel();
                        } else {
                            console.log(channelInfo);
                            this.props.onChannelChange({ ...channelInfo });
                        }
                    });
            }
        } */
    }

    componentDidUpdate() {
        if (this.props.channel === null && this.props.team !== null) {
            const channel = this.props.match.params.channel;

            if (channel) {
                getChannel(this.props.team.name, channel)
                    .then(channelInfo => {
                        if (channelInfo === null) {
                            this.props.invalidChannel();
                        } else {
                            console.log(channelInfo);
                            this.props.onChannelChange({ ...channelInfo });
                        }
                    });
            }
        }

        console.log('this.isFirstLoad');
        console.log(this.isFirstLoad);
        console.log('this.props.channel');
        console.log(this.props.channel);

        // the content from the file on the right was here
        if (this.isFirstLoad === undefined && this.props.channel) {
            this.unsubscribe = db
                .collection(`teams/${this.props.team.name}/channels/${this.props.channel.name}/posts`)
                .orderBy('createdAt', 'desc')
                .onSnapshot((querySnapshot) => {
                    console.log(querySnapshot.docs.length);
                    console.log(querySnapshot.metadata.fromCache);

                    console.log('%c channel', 'color: red;');
                    console.log(this.props.channel);

                    const messages = [];
                    querySnapshot.forEach(doc => {
                        // console.log(doc.metadata.fromCache); //! for some reason it always says false, even when the new data(with createdAt: null) should be from local cache and not a result from the server
                        const id = doc.id;
                        doc = doc.data();
                        doc.key = id;
                        /* const createdAt = doc.createdAt.toDate();
                        const date = `${createdAt.getHours()}:${createdAt.getMinutes()}, ${createdAt.toGMTString().split(', ')[1].split(' ').splice(0, 3).join(' ')}`;
                        doc.createdAt = date; */

                        //!!! after sending a new message -> on the first snapshot with the local data all values are already there, but the date is null, because it uses the server's time of posting the new document => this led to a nasty error => I should check if the date is null
                        if (doc.createdAt !== null) {
                            const createdAt = doc.createdAt?.toDate();
                            const hours = createdAt.getHours().toString();
                            const date = `${hours.length === 1 ? 0 + hours : hours}:${createdAt.getMinutes()}, ${createdAt.toDateString().split(' ').splice(1, 2).reverse().join(' ')} ${createdAt.getFullYear()}`;
                            doc.createdAt = date;
                        }

                        messages.unshift(doc);
                    });

                    this.isFirstLoad = this.state.messages.length === 0;

                    this.setState(
                        () => ({ messages: messages }),
                        () => {
                            this.setState({ loading: false }); // if (this.isFirstLoad) document.getElementById('first-column').scrollTop = document.getElementById('first-column').scrollHeight; // so that only on the first fetch of the messages the messages container will get automatically scrolled to its very bottom     // console.log(this.state.messages);
                        });
                });
        }
        // end

        if (this.isFirstLoad) document.getElementById('first-column').scrollTop = document.getElementById('first-column').scrollHeight;
        // document.getElementById('first-column').scrollTop = 100000;
    }

    componentWillUnmount() {
        // !!!!!!!!!!!!!!!!!!! if I don't unsubscribe from the Firestore listener, after the unmounting of the component it keeps on working and giving me updates and leads to React giving me the following warning in the console: 
        //* index.js:1 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
        this.unsubscribe?.();
    }

    render() {
        console.log('messages props');
        console.log(this.props);

        /* if (this.props.authInfo.isAuthenticated === false) {
            this.props.history.push('/');
        } */

        const skeletonInitialLoad = (
            // <Card className="loading">
            <Skeleton loading={true} avatar active className="loading" />
            // </Card>
        );

        const { loading } = this.state;

        return (
            <>
                {this.state.messages.length === 0 ? Array(5).fill(skeletonInitialLoad) : this.state.messages.map(message => (
                    <Card
                        key={message.key}
                        className={loading ? 'loading' : ''}
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Skeleton loading={loading} avatar active>
                            <Meta
                                avatar={
                                    <Avatar src={message.createdBy?.profilePicture || 'https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'} shape="square" size={45} alt="user profile image" />
                                }
                                title={message?.createdBy?.name}
                                description={message.createdAt}
                            />

                            <p>{message.text}</p>

                            {
                                message.images ?
                                    <Image.PreviewGroup>
                                        {message.images.map((img, index) => (
                                            <Image
                                                key={`${message.key}//${index}`}
                                                // width={200}
                                                src={img}
                                                alt="message image"
                                            // maxInlineSize: '-webkit-fill-available'
                                            />
                                        ))}
                                    </Image.PreviewGroup>
                                    : ''
                            }
                        </Skeleton>
                    </Card>
                ))}

                {this.props.authInfo.isAuthenticated === false ? <strong style={{ fontSize: '5em', color: 'red' }}>UNAUTHORISED</strong> : ''}

            </>
        );
    }
}

export default Messages;