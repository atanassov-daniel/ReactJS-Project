import { Component } from 'react'
import { Image, Typography, Row, Col, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons'

import styles from './GetStarted.module.css';

const { Title, Paragraph } = Typography;

class GetStarted extends Component {
    openCreate(e) {
        this.props.history.push('/setupTeam/name')
    }

    render() {
        return (
            <>
                <Title level={1} style={{ fontWeight: 'bold' }}>Create a new Slack workspace</Title>
                <Paragraph style={{ fontSize: '1.2em' }}>Slack gives your team a home — a place where they can talk and work together. To create a new workspace, click the button below.</Paragraph>
                <Button
                    className={styles.createButton}
                    style={{
                        backgroundColor: '#611f69',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 'large',
                        height: 'fit-content',
                        width: 'fit-content',
                        borderRadius: '0.25em',
                    }}
                    onClick={this.openCreate.bind(this)}
                /* style={{ float: 'right' }}onClick={""} id="create-workspace-button" */ >
                    Create a Workspace <ArrowRightOutlined />
                </Button>
            </>
        );
    }
}

export default GetStarted;