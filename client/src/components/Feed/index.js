import React from "react";
import FeedItem from "./FeedItem";
import axios from "axios";

import { Header, Grid, Divider, Label } from "semantic-ui-react";

export default class Feed extends React.Component {
  state = {
    items: []
  };

  getPosts() {
    const items = [];
    axios
      .get("/match/matches")
      .then(res => {
        const data = res.data;
        console.log("haettu data:", data);
        this.setState({ items: data });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    let items = this.state.items;
    /*
    const items = [
      {
        _id: "0123",
        description: "I am a gamer",
        username: "user1",
        games: [
          "LoL",
          "Wow",
          "CS",
          "League of Legends",
          "World of Warcraft",
          "Counter-Strike: Global offensive"
        ]
      },
      {
        _id: "2223",
        description: "I am an another gamer",
        username: "Autism",
        games: ["Wow", "CS"]
      }
    ];
    */
    let feeditems = null;
    if (items) {
      feeditems = items.map(item => (
        <FeedItem
          key={item._id}
          description={item.description}
          games={["testGame", "testGame2"]}
          username={item.poster.username}
        />
      ));
    }
    return (
      this.props.isSearching && (
        <div>
          <Header as="h2">Found gamers:</Header>
          {feeditems}
        </div>
      )
    );
  }
}
