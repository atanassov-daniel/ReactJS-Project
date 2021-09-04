import { Component } from 'react';
import { Affix, Button, Input } from 'antd';
import { MessageOutlined, SendOutlined } from '@ant-design/icons';
//! when putting a timestamp, use the server's time, because local times of different users may differ in a few minutes, hence why there may be inaccuracies, for ex. a newer message may get added on 2nd or 3rd place instead of at the very bottom where it actually belongs

import { db, firestore } from '../../utils/firebase';

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

        value.trim() === '' ? document.getElementById('send-message-button').disabled = true : document.getElementById('send-message-button').disabled = false;

        const yValues = { 1: 0, 2: -22, 3: -44, 4: -66, 5: -88, 6: -110, 7: -132, 8: -154 };
        const lastCardMarginBottom = { 1: 0, 2: 0, 3: 3, 4: 6, 5: 10, 6: 14, 7: 17, 8: 21 }

        const textareaEl = document.getElementById('new-message-textarea');
        const rows = countLinesOfText(textareaEl); // console.log(rows);

        textareaEl.style.transform = textareaEl.style.transform.replace(/(?<=translateY\()(?<yTranslateVal>[-]*\d+)(?=px\))/, yValues[rows]);
        // translate(-41%) translateY(calc(-30% - `yValues[rows]`px))    -> so that the clear icon will always move to stay at the top of the textarea
        const lastMessage = document.querySelector('div.ant-card.ant-card-bordered:last-child');
        if (lastMessage) lastMessage.style.marginBottom = lastCardMarginBottom[rows] + "%"; // maybe there will be no messages
    }

    componentDidMount() {
        document.getElementById('new-message-textarea').style.transform = 'translateY(-0px)';

        document.querySelector('span[role="button"].anticon.anticon-close-circle.ant-input-clear-icon').addEventListener('click', (e) => {
            document.getElementById('new-message-textarea').focus();
        });

        if (document.getElementById('new-message-textarea')?.value.trim() === '') document.getElementById('send-message-button').disabled = true;
    }

    toggleTextarea(e) {
        const affixTextarea = document.querySelector('.ant-affix');

        const firstColumn = document.getElementById('first-column');
        const secondColumn = document.getElementById('second-column');

        if (affixTextarea.style.display === 'none') {
            affixTextarea.style.display = 'block';

            // firstColumn.style.height = '60vh';
            firstColumn.style.height = '69vh';
            if (secondColumn !== null) secondColumn.style.height = '60vh';
        } else {
            affixTextarea.style.display = 'none';

            // firstColumn.style.height = '76vh';
            firstColumn.style.height = '81.75vh';
            if (secondColumn !== null) secondColumn.style.height = '76vh';
        }
    }

    onSendMessage(e) {
        const message = document.getElementById('new-message-textarea').value;

        //* check if the message is empty, because the disabled attribute of the button culd easily be removed by inspecting the element
        if (message.trim() === '') {
            document.getElementById('send-message-button').disabled = true;
            alert("The message can't be empty");
            return;
        }

        // // the path in the URl should've already been checked for validity of the team and channel, so I should be fine using the pathname directly
        const { email, uid } = this.props.authInfo;
        const { fullName, displayName, photoURL } = this.props.profileInfo;
        const userInfo = { email, uid, name: displayName || fullName, photoURL };

        db
            // .collection(`teams/${this.props.team.name}/channels/${this.props.channel.name}/posts`)
            .collection(`teams/${this.props.team.key}/channels/${this.props.channel.key}/posts`)
            .add({
                createdAt: firestore.FieldValue.serverTimestamp(),
                text: message,
                createdBy: userInfo
            })
            .then((docRef) => {
                // console.log("Document written with ID: ", docRef.id);
                this.setState(() => ({ value: '' }));
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        const { value } = this.state;

        return (
            <>
                <Button
                    onClick={this.toggleTextarea}
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
                            autoSize={{ minRows: 1, maxRows: 8 }}
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
                            {/* <li className="action"><SendOutlined /></li> */}
                            <li className="action">
                                <Button id="send-message-button" type="text" size="small" style={{ color: 'white' }} icon={<SendOutlined />} onClick={this.onSendMessage.bind(this)} />
                            </li>
                        </ul>
                        {/* </div> */}

                    </span>
                </Affix>
            </>
        )
    }
}

export default TextareaMessage;