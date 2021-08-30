import { Component } from 'react';

import { Layout, Menu } from "antd"; // , Typography
import {
    MessageOutlined,
    MoreOutlined,
    CaretDownOutlined,
    NumberOutlined,
    PlusOutlined,
    // PlusCircleTwoTone,
    PlusSquareFilled,
} from '@ant-design/icons';

import getTeam from '../../services/getTeam';
// const { Link } = Typography;
const { Sider } = Layout;
const { SubMenu } = Menu;

export default class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // collapsed: true,
            collapsed: false,
        };
    }

    componentDidMount() { //!!! what if it's really quick and is already logged in on DidMount, wiil this be a problem
        /* console.log(this.state.myTeams);
        if (this.state.myTeam === null) {
            getMyTeams(this.props.authInfo.email)
                // .then(teams => this.setState(() => ({ myTeams: teams })));
                .then(teams => this.setState(() => ({ myTeams: teams })));
        } */

        //!! only check if the team is valid if it comes from the URL, if it comes directly from logging in into the workspace, then there's no way the team will be non-existent or the user won't be a member of it
        if (this.props.team === null) {
            const teamKey = this.props.match.params.team;
            /* this.props.authInfo.isAuthenticated === true && */
            if (teamKey) {
                getTeam(teamKey)
                    .then(teamInfo => {
                        if (teamInfo === null) {
                            this.props.invalidTeam();
                            console.log('%c invalid team', 'font-size: 3em; font-weight: bolder;');
                        } else {
                            console.log(teamInfo);
                            this.props.onTeamChange({ ...teamInfo });
                        }
                    });
            }
            //TODO do something similar for the channel too
        }

    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;

        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} className="sidebar" collapsedWidth="0" width={175}
                breakpoint="md"
                // trigger={null}
                // zeroWidthTriggerStyle={{ position: 'absolute', top: 0, left: '80%' }} // left: 0 -> when it was like this, the whole name of the team couldn't be seen
                zeroWidthTriggerStyle={{ position: 'absolute', top: 0, left: '90%', width: 'max-content' }}
                onBreakpoint={(broken) => {
                    console.log(broken);
                    console.log(this);
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" className="children" >{/* defaultSelectedKeys={['1']} */}
                    {/* {this.props.match.params.team ? */}
                    {this.props.team ?
                        // <SubMenu key="sub0" title={this.props.match.params.team}>
                        <SubMenu key="sub0" title={this.props.team?.name}>
                            {/* <SubMenu key="sub0" title={this.props.team}> */}
                            {/* <Menu.Item key="1">
                                <span>{this.props.match.params.team}</span>
                            </Menu.Item> */}
                        </SubMenu>
                        : ''
                    }
                    <Menu.Item key="2" icon={<MessageOutlined />}>
                        Threads
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MoreOutlined />} title="More">
                        <Menu.Item key="3">All unreads</Menu.Item>
                        <Menu.Item key="4">All DMs</Menu.Item>
                        <Menu.Item key="5">Mentions & reactions</Menu.Item>
                        <Menu.Item key="6">Saved items</Menu.Item>
                        <hr />
                        <Menu.Item key="7">Channel browser</Menu.Item>
                        <Menu.Item key="8">File browser</Menu.Item>
                        <Menu.Item key="9">People & user groups</Menu.Item>
                        <Menu.Item key="10">Apps</Menu.Item>
                        <hr />
                        <Menu.Item key="11">Customise this list in your <a href="#/preferences" style={{ color: 'blue' }}>preferences</a></Menu.Item>
                        {/* <Menu.Item key="11">Customise this list in your <Link href="#/preferences" style={{ color: 'blue' }}>preferences</Link></Menu.Item> */}
                    </SubMenu>
                    <SubMenu key="sub2" icon={<CaretDownOutlined />} title="Channels">
                        <Menu.Item key="12" icon={<NumberOutlined />}>channel1</Menu.Item>
                        <Menu.Item key="13" icon={<NumberOutlined />} >general</Menu.Item>
                        <Menu.Item key="14" icon={<PlusOutlined />}>announcements</Menu.Item>
                        {/* <Menu.Item key="15" icon={<PlusCircleTwoTone />}>Add channels</Menu.Item> */}
                        <Menu.Item key="15" icon={<PlusSquareFilled />}>Add channels</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<CaretDownOutlined />} title="Direct Messages">
                        <Menu.Item key="16">first person</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
};