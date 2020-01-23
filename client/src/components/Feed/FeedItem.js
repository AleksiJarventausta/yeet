import React from "react";
import { Label, Card, Icon, Button } from "semantic-ui-react";
import axios from "axios";

export default class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }
  // Updates to the database that user liked a post.
  // Updates the posts attribute voted to upper level component.
  liked() {
    const id = this.props.postId;
    this.props.voted(id);
    const data = {
      postId: id,
      like: true
    };
    axios
      .post("/match/like", data)
      .then(res => console.log("sent liked", res))
      .catch(err => console.log(err));
  }

  // Basically same as liked() and these two should be
  // connected to be only one function.
  notLiked() {
    const id = this.props.postId;
    this.props.voted(id);
    const data = {
      postId: id,
      like: false
    };

    axios.post("/match/like", data).catch(err => console.log(err));
  }

  componentDidMount() {
    axios
      .post("/games/search-id", { ids: this.props.games })
      .then(res => {
        const gameArray = res.data.map(g => {
          return { ...g, title: g.name };
        });
        this.setState({ games: gameArray });
      })
      .catch(err => console.log(err));
  }

  render() {
    // Creating the gametags that are shown in the post
    const gameItems = this.state.games.map(game => {
      return <Label key={game.id}> {game.name + " "}</Label>;
    });

    return (
      <Card>
        <Card.Content>
          <Label.Group size="large">{gameItems}</Label.Group>
          <Card.Description>{this.props.description}</Card.Description>
          <Icon name="user" />
          {this.props.username}
        </Card.Content>
        <Button.Group attached="bottom" size="big">
          <Button icon="thumbs up" color="green" onClick={() => this.liked()} />
          <Button
            icon="thumbs down"
            color="red"
            onClick={() => this.notLiked()}
          />
        </Button.Group>
      </Card>
    );
  }
}
