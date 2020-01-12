import React from "react";
import { Grid, Divider, Label, Card, Icon, Button } from "semantic-ui-react";
import axios from "axios";

export default class FeedItem extends React.Component {
  liked() {
    const id = this.props.id;
    console.log("Liked", id);
    const data = {
      _id: id,
      like: true
    };
    axios
      .post("/match/like", data)
      .then(res => console.log("sent liked", res))
      .catch(err => console.log(err));
  }

  notLiked() {
    const id = this.props.id;
    console.log("Not liked", id);
    const data = {
      _id: id,
      like: false
    };
    axios
      .post("/match/like", data)
      .then(res => console.log("sent not liked", res))
      .catch(err => console.log(err));
  }

  render() {
    const gameItems = this.props.games.map(game => {
      return <Label> {game + " "}</Label>;
    });

    // Fix here things (dont use divs and classname, use instead ui-semantic things (<Card>))

    return (
      <Card>
        <Card.Content>
          <Card.Header>{gameItems}</Card.Header>

          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
        <Card.Content>
          <Grid>
            <Grid.Column width={7}>
              <Icon name="user"/>
              {this.props.username}
            </Grid.Column>
            <Grid.Column width={9} textAlign="right">
              <Button color="green" onClick={() => this.liked()}>
                <Icon name="thumbs up"></Icon>
              </Button>
              <Button color="red" onClick={() => this.notLiked()}>
                <Icon name="thumbs down"></Icon>
              </Button>
            </Grid.Column>
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}
