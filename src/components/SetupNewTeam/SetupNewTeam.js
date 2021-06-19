import { Component } from 'react';
import { Typography, Row, Col, Button, Input } from 'antd';
import { Route } from 'react-router-dom';

import TeamName from './Pages/TeamName';
import TeamChannels from './Pages/TeamChannels';
import TeamInvites from './Pages/TeamInvites';
// import styles from './TeamName.module.css';

class SetupNewTeam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            team: null,
            channel: null
        }

        this.pages = [TeamName, TeamChannels, TeamInvites];
        //!!! or I could use hash routing for the subpages for the different sterps of the process

        // this.changePage.bind(this); // with this it dodn't work, I had to do it below when passing the function in the component itself
    }

    changePage() {
        console.log(this);
        this.setState((prevState) => ({ step: prevState.step + 1 }));
        console.log('change??');
        console.log(this.state.step);
    }

    setTeam(teamId) {
        console.log('teamId');
        this.setState(() => ({ team: teamId }))
    }

    setChannel(channel) {
        console.log('channelId');
        this.setState(() => ({ channel: channel }));
    }

    render() {
        return (
            <>
                {/* {this.pages.map((Comp, index) => {
                    if (index === this.state.step) return (
                        <Comp step={this.state.step}
                            changePage={this.changePage.bind(this)}
                            setTeam={this.setTeam.bind(this)}
                            setChannel={this.setChannel.bind(this)}
                            authInfo={this.props.authInfo}
                            team={this.state.team}
                        />
                    )
                })} */}
                {this.pages
                    .filter((Comp, index) => index === this.state.step)
                    .map(Comp => (
                        <Route
                            render={(props) =>
                                <Comp
                                    step={this.state.step}
                                    changePage={this.changePage.bind(this)}
                                    setTeam={this.setTeam.bind(this)}
                                    setChannel={this.setChannel.bind(this)}
                                    authInfo={this.props.authInfo}
                                    team={this.state.team}
                                    channel={this.state.channel}
                                    {...props}
                                />
                            }
                        />
                    ))}
            </>
        )
    }
}

export default SetupNewTeam;