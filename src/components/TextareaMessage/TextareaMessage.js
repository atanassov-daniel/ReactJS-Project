import { Component } from 'react';

import { Affix, Button, Input } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

import './TextareaMessage.css'

const { TextArea } = Input;

class TextareaMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }
    }
    /*  state = {
        value: ''
    } */
    onChange = ({ target: { value } }) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;

        return (
            <Affix offsetBottom={5}>

                <span>
                    <Button
                        onClick={(e) => {
                            const textarea = document.getElementById('new-message-textarea');
                            const clearTextareaButton = document.querySelector('span[role="button"][aria-label="close-circle"][tabindex="-1"].anticon.anticon-close-circle.ant-input-clear-icon');

                            // const messagesContainer = document.getElementById('messages-container');
                            const messagesContainer = document.getElementById('first-column');
                            const secondColumn = document.getElementById('second-column');

                            if (textarea.style.display === 'none') {
                                textarea.style.display = 'block';
                                clearTextareaButton.style.display = 'block';

                                messagesContainer.style.height = '60vh';
                                if (secondColumn !== null) secondColumn.style.height = '60vh';
                            } else {
                                textarea.style.display = 'none';
                                clearTextareaButton.style.display = 'none';

                                messagesContainer.style.height = '76vh';
                                if (secondColumn !== null) secondColumn.style.height = '76vh';
                            }
                        }}
                        // style={{ transform: 'rotate(-90deg) translateX(-54px)translateY(-18px)', zIndex: 2 }}
                        style={{
                            transform: 'rotate(-90deg) translateX(-54px)translateY(-23px)', zIndex: 2, height: '24%',
                            padding: '0px 3px'
                        }} // for the smaller button, it has to go a little to the left
                    // z-index: 2 so that the button stays above the textarea(which has the z-index: 1)
                    >
                        New <MessageOutlined />
                    </Button>
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
                        <li className="action"><MessageOutlined /></li>
                    </ul>
                    {/* </div> */}

                </span>
            </Affix>
        )
    }
}

export default TextareaMessage;