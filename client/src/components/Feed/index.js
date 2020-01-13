import React, {useEffect} from "react";
import FeedItem from "./FeedItem";
import Match from "./Match";
import axios from "axios";

import { Header, Grid, Divider, Label } from "semantic-ui-react";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);

  }
  state = {
    nests: null,
    listening: false,
    matched: false
  }


  postVoted(id) {
    console.log("postVoted:", id);
    const newItems = this.props.posts.map(item => {
      if (item._id == id) {
        item.voted = true;
      }
      return item;
    });
    this.props.updatePosts(newItems);
  }

  componentDidMount() {
      console.log("Feeditem did mount");
      if (true) {
        console.log("if true");
        const events = new EventSource('http://yeet-yeet.rahtiapp.fi/match/connect');
        events.onmessage = (event) => {
          const parsedData = JSON.parse(event.data);
          if (event.data === "matched") {
            this.setState({matched:true})
          }
        };

        this.setState({listening: true});
        console.log("set listening true");
      }
    };


  render() {
    let items = this.props.posts;

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
