import { Component } from 'react';

import { Skeleton, Switch, Card, Avatar, Row, Col } from 'antd';

/*//!!!
new Date(time) // Sat Mar 27 2021 18:58:40 GMT+0200 (Eastern European Standard Time)
new Date(time).getMinutes() // 58
new Date(time).getHours() // 18 
*/

class Messages extends Component {
    constructor(props){
        super(props);

        this.state={
            loading: true,
        };
    }

    onLoadingChange = checked => {
        this.setState({ loading: !checked });
    };

    render() {
        const { loading } = this.state;

        return (
            <>
                {/* cards */}
                <Switch checked={!loading} onChange={this.onLoadingChange} />

                <Card
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
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" shape="square" size={50} alt="user profile image" className="message-card-avatar" />
                            </Col>
                            {/* <Col span={22}>  when addding the details, the style broke and the image would show under a part of the author's name */}
                            <Col span={21}>
                                {/* <span className="message-card-text"> */}
                                <h3 className="message-author">Ajvar Shri Lanka</h3>
                                <span className="message-timestamp">15:18</span>
                                <p>Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?</p>
                                {/* </span> */}
                            </Col>
                        </Row>
                        {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" shape="square" size={50} alt="user profile image" className="message-card-avatar" />
                    <span className="message-card-text">
                        <h4>Ajvar Shri Lanka</h4>
                        <p>Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?</p>
                    </span> */}

                    </Skeleton>

                </Card>
                <Card
                    style={{ marginBottom: 5, height: '10vh', overflow: 'hidden' }} className={loading ? 'loading' : ''}
                >
                    {/* !!! put a temporary class that makes it 30% height 
                while loading and then when loading is done remove this
                class so that it returns to its default height */}
                    <Skeleton loading={loading} active>
                        {/* <Meta
                        title="Card title"
                        description="This is the description"
                    /> */}
                        <p>Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?</p>
                    </Skeleton>
                </Card>



                <Card
                    style={{ marginBottom: 5, height: '10vh', overflow: 'hidden' }} className={loading ? 'loading' : ''}
                >
                    {/* !!! put a temporary class that makes it 30% height 
                while loading and then when loading is done remove this
                class so that it returns to its default height */}
                    <Skeleton loading={loading} active>
                        {/* <Meta
                        title="Card title"
                        description="This is the description"
                    /> */}
                        <p>Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?</p>
                    </Skeleton>
                </Card>
                <Card
                    style={{ marginBottom: 5, height: '10vh', overflow: 'hidden' }} className={loading ? 'loading' : ''}
                >
                    {/* !!! put a temporary class that makes it 30% height 
                while loading and then when loading is done remove this
                class so that it returns to its default height */}
                    <Skeleton loading={loading} active>
                        {/* <Meta
                        title="Card title"
                        description="This is the description"
                    /> */}
                        <p>Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?</p>
                    </Skeleton>
                </Card><Card
                    style={{ marginBottom: 5, height: '10vh', overflow: 'hidden' }} className={loading ? 'loading' : ''}
                >
                    {/* !!! put a temporary class that makes it 30% height 
                while loading and then when loading is done remove this
                class so that it returns to its default height */}
                    <Skeleton loading={loading} active>
                        {/* <Meta
                        title="Card title"
                        description="This is the description"
                    /> */}
                        <p>Hi Ma'am! This is a great series that you have started. Just wanted to know how will this proceed? As in every time the question topic and difficulty level will be varied?</p>
                    </Skeleton>
                </Card>

                {/* /cards */}
            </>
        )
    }
}

export default Messages;