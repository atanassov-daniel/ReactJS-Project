import { Component } from 'react';
import { Affix, Button, Input } from 'antd';
import { MessageOutlined, SendOutlined } from '@ant-design/icons';

import './TextareaMessage.css';

const { TextArea } = Input;

const countLinesOfText = (textareaEl) => {
    const previousHeight = textareaEl.style.height;
    textareaEl.style.height = 0; // without this
    const lines = parseInt(textareaEl.scrollHeight / parseInt(getComputedStyle(textareaEl).lineHeight));
    textareaEl.style.height = previousHeight; // and this line there were inaccuracies when deleting rows(the time the row gets deleted, the rows count wouldn't change, not until I type an interval would it change)

    return lines;
};

class TextareaMessage extends Component {
    state = {
        value: ''
    }

    /* //**  with the following implementation, the textarea would correctly expand up when the rows increased, but wouldn't get back down when the rows decrease
    onChange = ({ target: { value } }) => {
        const textareaEl = document.getElementById('new-message-textarea');

        const oldRows = this.rows || 1;

        this.setState({ value }); // console.log(value);

        this.rows = countLinesOfText(textareaEl);
        if (oldRows < this.rows && this.rows <= 4) {
            // textareaEl.style.transform = 'translateY(-25px)'; // 'translateY(-25px)' textareaEl.style.transform.match(/\d+/g)
            let oldTransform = textareaEl.style.transform;

            const translateYMatch = oldTransform.match(/translateY\(-(?<yTranslateVal>\d+)px\)/);
            if (translateYMatch === null) {
                oldTransform = oldTransform.concat(' translateY(-0px)');
            }

            const newVal = Number(translateYMatch?.groups.yTranslateVal || 0) + 22; // it was ' + 25' before

            textareaEl.style.transform = oldTransform.replace(/(?<=translateY\(-)(?<yTranslateVal>\d+)(?=px\))/, newVal);
        }
        console.log(oldRows + "///\///\///" + this.rows);
    } */
    onChange = ({ target: { value } }) => {
        this.setState({ value }); // console.log(value);

        const yValues = { 1: 0, 2: -22, 3: -44, 4: -66 };

        const textareaEl = document.getElementById('new-message-textarea');
        const rows = countLinesOfText(textareaEl); // console.log(rows);

        textareaEl.style.transform = textareaEl.style.transform.replace(/(?<=translateY\()(?<yTranslateVal>[-]*\d+)(?=px\))/, yValues[rows]);
        // translate(-41%) translateY(calc(-30% - `yValues[rows]`px))    -> so that the clear icon will always move to stay at the top of the textarea
    }

    componentDidMount() {
        document.getElementById('new-message-textarea').style.transform = 'translateY(-0px)';
    }

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
                <Affix offsetBottom={25}>
                    <span>

                        <TextArea
                            id="new-message-textarea"
                            value={value}
                            onChange={this.onChange}
                            autoSize={{ minRows: 1, maxRows: 4 }}
                            placeholder={`Message #channelName`}
                            allowClear
                            style={{ transform: 'translateY(-0px)', color: 'red' }}
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