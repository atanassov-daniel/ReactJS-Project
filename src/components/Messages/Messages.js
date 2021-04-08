import { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Skeleton, Switch, Card, Avatar, Row, Col, Image } from 'antd';

/*//!!!
new Date(time) // Sat Mar 27 2021 18:58:40 GMT+0200 (Eastern European Standard Time)
new Date(time).getMinutes() // 58
new Date(time).getHours() // 18 
*/

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBg39vkJc3CaI-J6bnevQPMPILG8PWmzyI",
    authDomain: "slack-app-1d097.firebaseapp.com",
    projectId: "slack-app-1d097",
    storageBucket: "slack-app-1d097.appspot.com",
    messagingSenderId: "222925739959",
    appId: "1:222925739959:web:afcdf3e05cf61fa02e7a32"
});

let db = firebase.firestore();

class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            messages: [],
        };
    }

    onLoadingChange = checked => {
        this.setState({ loading: !checked });
    };

    componentDidMount() {
        // db.collection(`teams`).doc('#codewithsimran')
        // db.collection(`teams`).doc('#codewithsimran')
        db.collection(`teams/#codewithsimran/channels/#general/posts`)
            .orderBy('createdAt', 'desc')
            .onSnapshot((querySnapshot) => {
                this.setState({ loading: false });
                // console.log("Current data: ", querySnapshot);
                // console.log("Current data JSON: ", JSON.stringify(querySnapshot));

                const messages = [];
                querySnapshot.forEach(doc => {
                    const id = doc.id; // console.log(id);
                    doc = doc.data();
                    doc.key = id;
                    // doc.createdAt = doc.createdAt.toDate().toUTCString();
                    const createdAt = doc.createdAt.toDate();
                    const date = `${createdAt.getHours()}:${createdAt.getMinutes()}, ${createdAt.toGMTString().split(', ')[1].split(' ').splice(0, 3).join(' ')}`;
                    doc.createdAt = date;

                    messages.push(doc);
                    // console.log(doc);
                    // console.log(doc.createdAt);
                });

                this.setState((prevState) => ({ messages: messages }));
                console.log(this.state.messages);
            });
    }

    render() {
        const { loading } = this.state;

        return (
            <>
                {/* cards */}
                <Switch checked={!loading} onChange={this.onLoadingChange} />

                {this.state.messages.map(message => (
                    <Card
                        key={message.key}
                        // style={{ height: '30%', padding: '0px' }}
                        className={loading ? 'loading' : ''}
                    // style={{ width: '90%', marginTop: 16 }}
                    // style={{ width: '98%', margin: 'auto' }}
                    /* actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                    ]} */
                    >
                        <Skeleton loading={loading} avatar active>
                            {/* <Meta
                        avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" shape="square" size={50} alt="user profile image" />
                        }
                        title="Ajvar Shri Lanka"
                        description="This is the description"
                    /> */}

                            <Row>
                                {/* <Col span={2}>   when addding the details, the style broke and the image would show under a part of the author's name */}
                                <Col span={3}>
                                    <Avatar
                                        src={message.createdBy?.profilePicture}
                                        shape="square"
                                        size={50}
                                        alt="user profile image" className="message-card-avatar"
                                    />
                                </Col>
                                {/* <Col span={22}>  when addding the details, the style broke and the image would show under a part of the author's name */}
                                <Col span={21}>
                                    {/* <span className="message-card-text"> */}
                                    <h3 className="message-author">{message?.createdBy?.name}</h3>
                                    <span className="message-timestamp">{message.createdAt}</span>
                                    <p>{message.text}</p>
                                    {/* </span> */}
                                    {/* <img src="..." alt="alt" width="390" height="350" style={{border: '1px solid red'}} /> */}
                                    {/* <img src="data:image/jpeg;base64,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" alt="f*ck ya" style={{ border: '1px solid red', maxInlineSize: '-webkit-fill-available' }} /> */}

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


                                    {/* 
                                fallback="data:image/png;base64,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"
                                    */}
                                </Col>
                            </Row>
                            {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" shape="square" size={50} alt="user profile image" className="message-card-avatar" />
                    <span className="message-card-text">
                        <h4>Ajvar Shri Lanka</h4>
                        <p>Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?</p>
                    </span> */}

                        </Skeleton>

                    </Card>
                ))}

                {/* /cards */}
            </>
        )
    }
}

export default Messages;