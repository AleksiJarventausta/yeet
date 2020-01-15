import React from "react";

import FeedItem from "./FeedItem";
import Match from "./Match";

import { EventSourcePolyfill } from "event-source-polyfill";
import axios from "axios";

import { Header } from "semantic-ui-react";
import { isEmpty } from "underscore";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nests: null,
      listening: false,
      matched: false,
      matchedUser: {}
    };
  }

  // Marks the post voted when user has voted it.
  // Changes items attribute voted to true and
  // updates it to upper level components.
  postVoted(id) {
    //console.log("postVoted:", id);
    const newItems = this.props.posts.map(item => {
      if (item._id === id) {
        item.voted = true;
      }
      return item;
    });

    if (newItems.length() < 2) {
      console.log("low on stack")
    }
    this.props.updatePosts(newItems);
  }

  getGameInfo(data) {
    //console.log("got data:", data);
    if (data.games.length > 0) {
      let newList = [];

      axios
        .post("/games/search-id", { ids: data.games })
        .then(res => {
          //console.log("Haettu pelit:", res.data, res);
          newList = res.data.map(g => {
            const newGameItem = { ...g, title: g.name };

            return newGameItem;
          });

          let old = { ...this.state.matchedUser };
          //console.log("old matched:", old);
          const updatedUser = { ...old, games: newList };
          //console.log("updatedUser:", updatedUser);
          this.setState(prevState => ({
            ...prevState,
            matchedUser: updatedUser
          }));
        })
        .catch(err => console.log(err));
    }
  }

  componentDidMount() {
    if (!this.state.listening) {
      const token = JSON.parse(localStorage.jwtTokenTeams);
      const events = new EventSourcePolyfill(
        "http://yeet-yeet.rahtiapp.fi/match/connect",
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
          //console.log("AAA matched user:", parsedData);

          this.getGameInfo(parsedData);

          this.setState(prevState => ({
            ...prevState,
            matchedUser: parsedData
          }));
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
              games={item.games}
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
          <Header as="h2">Found gamers: </Header>
          {isEmpty(this.state.matchedUser) ? (
            feeditems
          ) : (
            <Match
              matchedUser={this.state.matchedUser}
              description={this.state.matchedUser.description}
              games={this.state.matchedUser.games}
              username={this.state.matchedUser.username}
              discord={this.state.matchedUser.discord}
              issearching={this.props.issearching}
            />
          )}
        </div>
      )
    );
  }
}
