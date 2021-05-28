import { Component } from 'react';
import { Typography, Row, Col, Button, Input } from 'antd';

import TeamName from './Pages/TeamName';
import TeamChannels from './Pages/TeamChannels';
import TeamInvites from './Pages/TeamInvites';
// import styles from './TeamName.module.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

class SetupNewTeam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            team: null
        }

        this.pages = [TeamName, TeamChannels, TeamInvites];

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

    render() {
        return (
            <>
                {this.pages.map((Comp, index) => {
                    if (index === this.state.step) return (
                        <Comp step={this.state.step}
                            changePage={this.changePage.bind(this)}
                            setTeam={this.setTeam.bind(this)}
                            authInfo={this.props.authInfo}
                            team={this.state.team}
                        />
                    )
                })}
            </>
        )
    }
}

export default SetupNewTeam;