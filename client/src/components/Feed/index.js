import React from "react";
import FeedItem from "./FeedItem";

export default class Feed extends React.Component {
  state = {
    items: []
  };

  componentDidMount() {
    // TODO: fetch list of items from the database
    const fetchedItems = [];
    this.setState({ items: fetchedItems });
  }

  render() {
    //const { items } = this.state.items;
    const items = [
      { _id: "0123", description: "I am a gamer" },
      { _id: "0123", description: "I am an another gamer" }
    ];
    const feeditems = items.map(item => (
      <div>
        <FeedItem key={item._id} description={item.description}></FeedItem>
        <button>Like</button>
        <button>Not like</button>
      </div>
    ));
    return <div>{feeditems}</div>;
  }
}
