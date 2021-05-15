import { Component } from 'react';
import { Typography, Row, Col, Button, Input } from 'antd';

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

        if (value.trim() === '') this.setState({ disabled: true });
        else this.setState({ disabled: false });
        console.log(this.pages);
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
            </>
        )
    }
}
