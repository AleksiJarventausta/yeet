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
    const items = this.state.items;
    /*const items = [
      {
        _id: "0123",
        description: "I am a gamer",
        username: "user1",
        games: ["Lol", "Wow", "CS"]
      },
      { _id: "0123", description: "I am an another gamer" }
    ]; */
    const feeditems = items.map(item => (
      <div>
        <FeedItem
          key={item._id}
          description={item.description}
          games={item.games}
          username={item.username}
        ></FeedItem>
        <button>Like</button>
        <button>Not like</button>
      </div>
    ));
    return <div>{feeditems}</div>;
  }
}