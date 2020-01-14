import React from "react";

import FeedItem from "./FeedItem";
import Match from "./Match";
import {EventSourcePolyfill} from 'event-source-polyfill'

import { Header } from "semantic-ui-react";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nests: null,
      listening: false,
      matched: false
    };
  }

  // Marks the post voted when user has voted it.
  // Changes items attribute voted to true and
  // updates it to upper level components.
  postVoted(id) {
    console.log("postVoted:", id);
    const newItems = this.props.posts.map(item => {
      if (item._id === id) {
        item.voted = true;
      }
      return item;
    });
    this.props.updatePosts(newItems);
  }

  componentDidMount() {
    if (!this.state.listening) {
      const token = JSON.parse(localStorage.jwtTokenTeams);
      const events = new EventSourcePolyfill(
        "http://localhost:5000/match/connect",
        {
          headers: {
            Authorization: token
          },
          skipDefaultHeaders: true
        }
      );
      events.onmessage = event => {
        try {
          const parsedData = JSON.parse(event.data);

        } catch (e) {}
      };
      this.setState({ events: events });
      this.setState({ listening: true });
    }
  }

  componentWillUnmount() {
    if (this.state.listening) {
      this.state.events.close();
      this.setState({ listening: false });
    }
  }

  render() {
    let items = this.props.posts;

    let feeditems = null;
    let counter = 0;
    if (items) {
      feeditems = items.map(item => {
        let feedItem = null;
        if (item.voted === false && counter < 2) {
          //console.log("id of this feeditem is:", item._id);
          counter = counter + 1;
          feedItem = (
            <FeedItem
              voted={this.postVoted.bind(this)}
              key={item._id}
              postId={item._id}
              userId={item.poster._id}
              description={item.description}
              games={[
                { name: "testGame", _id: 1 },
                { name: "testGame2", _id: 2 }
              ]}
              username={item.poster.username}
            />
          );
        }
        return feedItem;
      });
    }
    return (
      this.props.issearching && (
        <div>
          {/*true && <h1>Matched!</h1>*/}
          {this.state.matched && <h1>Matched!</h1>}

          <Header as="h2">Found gamers:</Header>
          {/* Placeholder Match objekti */}
          <Match
            description={"UwU OwO"}
            games={["testGame", "testGame2"]}
            username={"HentaiMaster9000"}
          />
          {feeditems}
        </div>
      )
    );
  }
}
