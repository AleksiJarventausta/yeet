import React from "react";
import FeedItem from "./FeedItem";
import Match from "./Match";
import axios from "axios";

import { Header, Grid, Divider, Label } from "semantic-ui-react";

export default class Feed extends React.Component {
  state = {
    items: []
  };

  postVoted(id) {
    console.log("postVoted:", id);
    const newItems = this.state.items.map(item => {
      if (item._id == id) {
        item.voted = true;
      }
      return item;
    });
    this.setState({ items: newItems });
  }

  getPosts() {
    const items = [];
    axios
      .get("/match/matches")
      .then(res => {
        const data = res.data;
        console.log("haettu data:", data);
        const items = data.map(item => {
          return { ...item, voted: false };
        });

        this.setState({ items: items });
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
    let counter = 0;
    if (items) {
      feeditems = items.map(item => {
        if (item.voted == false && counter < 2) {
          counter = counter + 1;
          return (
            <FeedItem
              voted={this.postVoted.bind(this)}
              key={item._id}
              id={item._id}
              description={item.description}
              games={["testGame", "testGame2"]}
              username={item.poster.username}
            />
          );
        }
      });
    }
    return (
      this.props.isSearching && (
        <div>
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
