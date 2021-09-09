import { Component } from 'react';
import { PageHeader, Tooltip, Avatar, Typography, Row, Col } from 'antd';
import { AntDesignOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';

import ChannelInfoModal from '../ChannelInfoModal/ChannelInfoModal';
import styles from './ChannelHeader.module.css';
// const { Text, Paragraph } = Typography;

export default class ChannelHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            visibleInfoModal: false,
            activeTab: null,
        };

        this.updateDimensions = this.updateDimensions.bind(this);
        this.showInfoModal = this.showInfoModal.bind(this);
        this.hideInfoModal = this.hideInfoModal.bind(this);

        console.log(`zdrkopr`);
        console.log(this.props);
    }

    updateDimensions(e) {
        this.setState({ width: window.innerWidth });
    }
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    showInfoModal(e, tab) {
        console.log(tab);
        this.setState(() => ({ visibleInfoModal: true, activeTab: tab }));
    }
    hideInfoModal(e) {
        this.setState(() => ({ visibleInfoModal: false }));
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    randomIndex(min, max) {
        let indexesSet = new Set(Array(3).fill().map(el => this.getRandomInt(min, max)));
        console.log(indexesSet);

        if (max <= 2) return Array(max).fill().map((el, index) => index);

        while (indexesSet.size < 3) indexesSet.add(this.getRandomInt(min, max));
        return Array.from(indexesSet).sort((a, b) => a - b);
    }

    render() {
        const members = this.props.channel.members;
        const membersCount = members.length;
        if (this.state.width >= 800) var indexesArray = this.randomIndex(0, membersCount);

        return (
            <>
                {this.state.visibleInfoModal === true ?
                    <ChannelInfoModal
                        visible={this.state.visibleInfoModal}
                        activeTab={this.state.activeTab}
                        hideEditModal={this.hideInfoModal}
                        channel={this.props.channel}
                        team={this.props.team}
                    />
                    // authInfo={authInfo}  profileInfo={this.state.profileInfo} 
                    : ''
                }

                <PageHeader
                    id="channel-header" className="site-page-header"
                    style={{
                        borderBottom: '1.5px solid grey',
                        borderRight: '1.5px solid grey',
                        display: 'flow-root'
                    }}
                // title={`#${this.props.channel?.name || ''}`}
                >
                    {/* <h2 style={{ display: 'inline' }}>#{this.props.channel?.name || ''}</h2> */}
                    <Row>
                        <Col style={{ display: 'flex' }}>
                            <div className={styles.channelNameWrap} onClickCapture={(e) => this.showInfoModal(e, 'about')}>
                                <h2 style={{ margin: 0, display: 'inline', fontWeight: 'bold' }}># {this.props.channel?.name || ''} </h2>
                                <svg height=".6em" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>
                            </div>
                        </Col>
                        <Col flex="auto" style={{ display: 'flex', alignItems: 'center' }}>
                            <span>Company-wide announcements and work-based matters</span>
                        </Col>
                        <Col style={{ maxWidth: 'fit-content', alignSelf: 'center' }}>
                            <Tooltip
                                trigger="hover" placement="bottomRight" arrowPointAtCenter autoAdjustOverflow
                                title={
                                    <>
                                        <h4 style={{ color: 'white', marginBottom: '0px', fontWeight: 'bold' }}>View all members of this channel</h4>
                                        <i style={{ color: 'lightgrey' }}>Includes Rajvat Ashikur, Anubhav Ajmera, and John Doe</i>
                                    </>
                                }
                                color="black"
                            >
                                <div className={styles.membersWrap} onClickCapture={(e) => this.showInfoModal(e, 'members')}>
                                    <div id="tooltip-members" style={{ display: 'flex' }}/*//* the display flex is there so that the number of members gets centered probably */>
                                        {this.state.width < 800
                                            ? <UserOutlined style={{ fontSize: '15px', alignSelf: 'center' }} />
                                            :
                                            <Avatar.Group
                                                size="small"
                                                /* size={{
                                                    xs: 24,
                                                    sm: 32,
                                                    md: 40
                                                }} */
                                                maxCount={3}
                                                maxStyle={{
                                                    color: '#f56a00',
                                                    backgroundColor: '#fde3cf',
                                                }}
                                                style={{ alignSelf: 'center' }}
                                            // style={{ float: 'left', display: 'none' }}
                                            >
                                                {indexesArray.map(index => (
                                                    <Avatar shape="square" key={members[index].uid} src={members[index].photoURL || 'https://t4.ftcdn.net/jpg/02/51/95/53/240_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'} />
                                                ))}

                                                {/* <Avatar shape="square" src={""} />
                                                <Avatar shape="square"
                                                    style={{
                                                        backgroundColor: '#f56a00',
                                                    }}
                                                >
                                                    K
                                                </Avatar>
                                                <Avatar shape="square"
                                                    style={{
                                                        backgroundColor: '#1890ff',
                                                    }}
                                                    icon={<AntDesignOutlined />}
                                                /> */}
                                            </Avatar.Group>
                                        }
                                        <span
                                            /* strong */
                                            className={styles.membersCount}
                                        // style={{ marginBlock: '5px', marginLeft: '.5em', alignSelf: 'center', fontWeight: 'bold', color: '#1d1c1db3' }}
                                        >
                                            {membersCount}
                                        </span>
                                    </div>
                                </div>
                            </Tooltip>
                        </Col>
                    </Row>
                    {/* <UserAddOutlined style={{
                    border: '10px solid rgba(211,211,211, 0.05)',
                    borderRadius: '3px',
                    backgroundColor: 'rgba(211,211,211, 0.2)',
                }} /> */}
                </PageHeader >
            </>
        )
    }
};