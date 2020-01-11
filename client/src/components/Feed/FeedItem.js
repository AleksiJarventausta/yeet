import React from "react";
import { Grid, Divider, Label, Card, Icon, Button } from "semantic-ui-react";

export default class FeedItem extends React.Component {
  liked() {
    const id = this.props.key;
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
            <Grid.Column width={6}>
              <i className="user icon" />
              {this.props.username}
            </Grid.Column>
            <Grid.Column width={10} textAlign="right">
              <Button>
                <Icon name="thumbs up"></Icon>
              </Button>
              <Button>
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
