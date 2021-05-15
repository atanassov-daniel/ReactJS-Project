import { Component } from 'react';
import { Typography, Row, Col, Button, Input } from 'antd';

import styles from './TeamName.module.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

class TeamInvites extends Component {
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

        if (value.trim() === '') this.setState({ disabled: true });
        else this.setState({ disabled: false });
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

export default TeamInvites;