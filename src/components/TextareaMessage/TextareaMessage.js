import { Component } from 'react';
import { Affix, Button, Input } from 'antd';
import { MessageOutlined, SendOutlined } from '@ant-design/icons';

import './TextareaMessage.css';

const { TextArea } = Input;

class TextareaMessage extends Component {
    state = {
        value: ''
    }

    onChange = ({ target: { value } }) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return (
            <>
                <Button
                    onClick={(e) => {
                        const affixTextarea = document.querySelector('.ant-affix');

                        const firstColumn = document.getElementById('first-column');
                        const secondColumn = document.getElementById('second-column');

                        if (affixTextarea.style.display === 'none') {
                            affixTextarea.style.display = 'block';

                            firstColumn.style.height = '60vh';
                            if (secondColumn !== null) secondColumn.style.height = '60vh';
                        } else {
                            affixTextarea.style.display = 'none';

                            firstColumn.style.height = '76vh';
                            if (secondColumn !== null) secondColumn.style.height = '76vh';
                        }
                    }}
                    // style={{ transform: 'rotate(-90deg) translateX(-54px)translateY(-18px)', zIndex: 2 }}
                    style={{
                        transform: 'rotate(-90deg) translateX(-54px)translateY(-23px)',
                        zIndex: 2,
                        padding: '0px 3px',
                        height: '6%',
                        position: 'absolute',
                        bottom: '82.5px',
                    }} // for the smaller button, it has to go a little to the left
                // z-index: 2 so that the button stays above the textarea(which has the z-index: 1)
                >
                    New <MessageOutlined />
                </Button>
                <Affix offsetBottom={5}>
                    <span>

                        <TextArea
                            id="new-message-textarea"
                            value={value}
                            onChange={this.onChange}
                            autoSize={{ minRows: 3, maxRows: 3 }}
                            placeholder={`Message #channelName`}
                            allowClear
                        />

                        {/* <Affix offsetBottom={30}>
                        <div className="new-message-textarea-controls">
                            <ul className="ul-controls" >
                                <li className="action"><MessageOutlined /></li>
                                <li className="action"><MessageOutlined /></li>
                                <li className="action"><MessageOutlined /></li>
                                <li className="action"><MessageOutlined /></li>
                                <li className="action"><MessageOutlined /></li>
                                <li className="action"><MessageOutlined /></li>
                                <li className="action"><MessageOutlined /></li>
                            </ul>
                        </div>
                    </Affix> */}
                        {/* <div className="new-message-textarea-controls" style={{ position: 'sticky', bottom: '20px' }}> */}
                        <ul className="ul-controls" style={{ position: 'fixed', bottom: 0, zIndex: 1 }} >
                            <li className="action"><MessageOutlined /></li>
                            <li className="action"><MessageOutlined /></li>
                            <li className="action"><MessageOutlined /></li>
                            <li className="action"><MessageOutlined /></li>
                            <li className="action"><MessageOutlined /></li>
                            <li className="action"><MessageOutlined /></li>
                            <li className="action"><SendOutlined /></li>
                        </ul>
                        {/* </div> */}

                    </span>
                </Affix>
            </>
        )
    }
}

export default TextareaMessage;