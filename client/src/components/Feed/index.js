import React from "react";

import FeedItem from "./FeedItem";
import Match from "./Match";

import { EventSourcePolyfill } from "event-source-polyfill";
import axios from "axios";

import { Header, Loader } from "semantic-ui-react";
import { isEmpty } from "underscore";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nests: null,
      listening: false,
      matched: false,
      matchedUser: {},
      posts: []
    };
    this.getPosts = this.getPosts.bind(this);
    this.setMatchPoller = this.setMatchPoller.bind(this);
    this.timeoutLoop = this.timeoutLoop.bind(this);
  }

  // Marks the post voted when user has voted it.
  // Changes items attribute voted to true and
  // updates it to upper level components.
  postVoted(id) {
    //console.log("postVoted:", id);
    const newItems = this.state.posts.map(item => {
      if (item._id === id) {
        item.voted = true;
      }
      return item;
    });
    /*
    if (newItems.length < 2) {
      console.log("low on stack")
    }
    */
    this.setState({ posts: newItems });
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

  timeoutLoop() {
    this.getPosts();
    this.setState({ stopPoller: setTimeout(this.timeoutLoop, 4000) });
  }

  setMatchPoller() {
    let timer = 0;
    timer = setTimeout(this.timeoutLoop, 4000);

    this.setState({ stopPoller: timer});
  }

  componentDidMount() {
    this.getPosts();
    this.setMatchPoller();
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
    clearTimeout(this.state.stopPoller);
    if (this.state.listening) {
      this.state.events.close();
      this.setState({ listening: false });
    }
  }

  getPosts() {
    axios
      .get("/match/matches")
      .then(res => {
        const data = res.data;
        const items = data.map(item => {
          return { ...item, voted: false };
        });

        this.setState({ posts: items });
      })
      .catch(err => console.log(err));
  }

  render() {
    let feeditems = null;
    let counter = 0;
    if (this.state.posts) {
      feeditems = this.state.posts.map(item => {
        let feedItem = null;
        if (item.voted === false && counter < 2) {
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
          <Header as="h2">
            {!isEmpty(this.state.matchedUser)
              ? "Matched with:"
              : isEmpty(feeditems)
              ? "Searching for other gamers..."
              : "Found gamers:"}
          </Header>
          {isEmpty(feeditems) && <Loader active inline="centered" />}
          {isEmpty(this.state.matchedUser) ? (
            feeditems
          ) : (
            <Match
              matchedUser={this.state.matchedUser}
              description={this.state.matchedUser.description}
              games={this.state.matchedUser.games}
              username={this.state.matchedUser.username}
              discord={this.state.matchedUser.discord}
              additional={this.state.matchedUser.additional}
              issearching={this.props.issearching}
            />
          )}
        </div>
      )
    );
  }
}
