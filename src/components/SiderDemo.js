//!! make a send button for the message textarea

import { Component } from 'react';

import './SiderDemo.css';

import Messages from './Messages/Messages';
import TextareaMessage from './TextareaMessage/TextareaMessage';
import Details from './Details';

import {
    Row, Col, Divider,
    Tag,

    Popover
} from 'antd';

import { Route } from 'react-router-dom';

class SiderDemo extends Component {
    render() {
        return (
            <>
                <Row style={{ height: '100%', width: '100%' }}>
                    <Col
                        span={24}
                        style={{ border: '2.5px solid orange', height: '60vh' }} //!! the height: '100%' broke the scrollbar's css and it wouldn't scroll
                        className="column-with-slider"
                        // id="messages-container"
                    >
                        <Messages />
                    </Col>

                    <Route
                        path="/details"
                        component={Details}
                    />
                    {/* //! here I can put the rest of the routes */}
                </Row>

                <TextareaMessage />
            </>
        );
    }
}

export default SiderDemo;