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
              <i className="user icon" />
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

/*
(
      <div className="ui card">
        <div className="content">
          <div className="header">{gameItems}</div>

          <div className="description">{this.props.description}</div>
        </div>

        <div className="extra content">
          <Grid>
            <Grid.Column width={6}>
              <i className="user icon" />
              {this.props.username}
            </Grid.Column>
            <Grid.Column width={10} textAlign="right">
              <button className="ui positive basic button">
                <i class="icon thumbs up" />
              </button>
              <button className="ui negative basic button">
                <i className="icon thumbs down" />
              </button>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
    */
