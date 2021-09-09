import { Component, createRef } from 'react';
import { Input, Avatar, Row, Col } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import styles from './Members.module.css';

export default class Members extends Component {
    constructor(props) {
        super(props);

        this.findMembersInput = createRef();
        console.log(props);
    }

    componentDidMount() {
        this.findMembersInput.current.focus();
    }
    componentDidUpdate() {
        this.findMembersInput.current.focus();
    }

    render() {
        return (
            <>
                <div className={styles.flex}>
                    <Input size="medium" ref={this.findMembersInput} style={{ marginBottom: '8%', margin: '0% 6% 2.5%', width: '-webkit-fill-available' }} />

                    <span style={{
                        borderBottom: '1px solid gray', display: 'block', width: '-webkit-fill-available'
                    }}></span>

                    <div className={styles.membersWrap + ' column-with-slider'}>

                        <div className={styles.member}>
                            <UserAddOutlined className={styles.addPeopleAvatar} /* style={{ color: 'rgba(var(--sk_highlight,18,100,163),1)', background: '#1D9BD11A', padding: '8px', fontSize: '20px' }} */ />
                            <span className={styles.displayName}>Add people</span>
                        </div>

                        {/* <div className={styles.member}>
                            <div style={{ width: '100%' }}>
                                <div>
                                    <Avatar className={styles.avatar}
                                        shape="square" size={36} alt="user's profile picture"
                                        src={'https://ca.slack-edge.com/T01C79M7CDS-U01HWJ364JE-gc4663961925-48' || 'https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'}
                                    />
                                    <span className={styles.displayName}>Abhi</span>
                                    <span className={styles.statusIcon}>o</span>
                                    <span className={styles.fullName}>abhinov ojha</span>
                                </div>

                                <span className={styles.whatIdo}>Senior Web Developer</span>
                            </div>
                        </div> */}
                        {/* <div className={styles.member}>
                            <Row style={{ width: '100%', height: '100%' }}>
                                <Col style={{ alignSelf: 'center', marginRight: '3%' }}>
                                    <Avatar className={styles.avatar}
                                        shape="square" size={36} alt="user's profile picture"
                                        src={'https://ca.slack-edge.com/T01C79M7CDS-U01HWJ364JE-gc4663961925-48' || 'https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'}
                                    />
                                </Col>
                                <Col style={{ alignSelf: 'center' }} flex="auto">
                                    <div>
                                        <span className={styles.displayName}>Abhi</span>
                                        <span className={styles.statusIcon}>o</span>
                                        <span className={styles.fullName}>abhinov ojha</span>
                                    </div>
                                    <div>
                                        <span className={styles.whatIdo}>Senior Web Developer</span>
                                    </div>
                                </Col>
                            </Row>
                        </div> */}
                        {this.props.channel.members.map(({ displayName, fullName, email, photoURL, uid, whatIdo = "" }) => (
                            <div className={styles.member} key={uid}>
                                <Row style={{ width: '100%', height: '100%' }}>
                                    <Col style={{ alignSelf: 'center', marginRight: '3%' }}>
                                        <Avatar className={styles.avatar}
                                            shape="square" size={36} alt="user's profile picture"
                                            src={photoURL || 'https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'}
                                        />
                                    </Col>
                                    <Col style={{ alignSelf: 'center' }} flex="auto">
                                        <div>
                                            <span className={styles.displayName}>{displayName ? displayName : fullName}</span>
                                            <span className={styles.statusIcon}>o</span>
                                            <span className={styles.fullName}>{displayName ? fullName : ''}</span>
                                        </div>
                                        <div>
                                            <span className={styles.whatIdo}>{whatIdo}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        ))}

                        {/* <div className={styles.member}>3rd</div>
                        <div className={styles.member}>4th</div>
                        <div className={styles.member}>5th</div> */}
                    </div>
                </div>
            </>
        )
    }
};