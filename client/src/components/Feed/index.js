import React from "react";
import FeedItem from "./FeedItem";
import axios from "axios";

export default class Feed extends React.Component {
  state = {
    items: []
  };

  getPosts() {
    const items = [];
    axios
      .get("/match/matches")
      .then(res => (items = res))
      .catch(err => console.log(err));
    return items;
  }

  componentDidMount() {
    const fetchedItems = this.getPosts();
    this.setState({ items: fetchedItems });
  }

  render() {
    //const items = this.state.items;
    const items = [
      {
        _id: "0123",
        description: "I am a gamer",
        username: "user1",
        games: ["LoL", "Wow", "CS"]
      },
      {
        _id: "0123",
        description: "I am an another gamer",
        username: "Autism",
        games: ["Wow", "CS"]
      }
    ];
    const feeditems = items.map(item => (
      <div class="centered">
        <FeedItem
          key={item._id}
          description={item.description}
          games={item.games}
          username={item.username}
        ></FeedItem>
        <div></div> {/* Makes little space between FeedItems */}
      </div>
    ));
    return (
      <div>
        <h2>Found gamers:</h2>
        {feeditems}
      </div>
    );
  }
}
