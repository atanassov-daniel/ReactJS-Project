import { Divider } from 'antd';
import { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

const api = {
    baseUrl: 'https://api.soundcloud.com',
    client_id: 'caf73ef1e709f839664ab82bef40fa96'
};

class Scroll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tracks: [],
            hasMoreItems: true,
            nextHref: null
        };
    }

    loadItems(page) {
        var self = this;

        var url = api.baseUrl + '/users/8665091/favorites';
        if (this.state.nextHref) {
            url = this.state.nextHref + `&client_id=${api.client_id}`;
            console.log(url);
        } else {
            url = `${url}?client_id=${api.client_id}&linked_partitioning=${1}&page_size=${10}`
        }

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if (data) {
                    var tracks = self.state.tracks;
                    data.collection.forEach((track) => {
                        tracks.push(track);
                    });

                    if (data.next_href) {
                        self.setState({
                            tracks: tracks,
                            nextHref: data.next_href
                        });
                    } else {
                        self.setState({
                            hasMoreItems: false
                        });
                    }
                }
            });
    }

    render() {
        /* const items = [];
        this.state.tracks.forEach((track, index) => {
            items.push(
                <div className="track" key={index}>
                    <a href={track.permalink_url} target="_blank" rel="noreferrer">
                        <img src={track.artwork_url} width="150" height="150" alt="track thumbnail" />
                        <p className="title">{track.title}</p>
                    </a>
                </div>
            );
        }); */
        return (
            <InfiniteScroll
                pageStart={0}
                loader={<div className="loader">Loading ...</div>}
                useWindow={false}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                getScrollParent={() => document.querySelector('#first-column')}
            >
                {/* {items} */}
                {this.state.tracks.map((track, index) => (
                    <div className="track" key={index}>
                        <a href={track.permalink_url} target="_blank" rel="noreferrer">
                            <img src={track.artwork_url} width="150" height="150" alt="track thumbnail" />
                            <p className="title">{track.title}</p>
                        </a>
                    </div>
                ))}
                {this.state.hasMoreItems === false ? <div style={{ fontSize: '50px', fontWeight: 'bold' }}>There are no more</div> : ''}
            </InfiniteScroll>
        );
    }
}

export default Scroll;