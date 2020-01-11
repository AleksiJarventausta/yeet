import React from "react";
import { Grid, Divider, Label } from "semantic-ui-react";

export default function FeedItem(props) {
  const gameItems = props.games.map(game => {
    return <Label> {game + " "}</Label>;
  });

  return (
    <div className="ui card">
      <div className="content">
        <div className="header">{gameItems}</div>

        <div className="description">{props.description}</div>
      </div>

      <div className="extra content">
        <Grid>
          <Grid.Column width={6}>
            <i className="user icon" />
            {props.username}
          </Grid.Column>
          <Grid.Column width={10} textAlign="right">
            {/* Nimi vasemmalle, Buttonit oikealle */}
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
}
