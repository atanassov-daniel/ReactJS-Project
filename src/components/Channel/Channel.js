import { Component } from 'react';
import { Link } from "react-router-dom";

import ChannelHeader from '../ChannelHeader/ChannelHeader';


class Channel extends Component {
    render() {
        return (
            <>
                <ChannelHeader />
                <Link to="/messages"> messages </Link>
                <Link to="/details"> details </Link>
                <Link to="/"> homepage </Link>
            </>
        );
    }
}

export default Channel;