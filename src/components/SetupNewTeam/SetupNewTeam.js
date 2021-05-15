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
            step: 1,
        }

        this.pages = [TeamName, TeamChannels, TeamInvites];

        this.changePage.bind(this);
    }

    changePage() {
        this.setState((prevState) => ({ step: prevState.step + 1 }))
    }

    render() {
        return (
            <>
                {this.pages.map((Comp, index) => { if (index === this.state.step) return (<Comp step={this.state.step} changePage={this.changePage} />) })}
            </>
        )
    }
}

export default SetupNewTeam;