import React from "react";
import { Grid, Divider } from "semantic-ui-react";

export default function FeedItem(props) {
  const gameItems = props.games.map(game => {
    return <span style={{ color: "black" }}>{game + " "}</span>;
  });

  return (
    <div class="ui card">
      <div class="content">
        <div class="header">Games: {gameItems}</div>

        <div class="description">{props.description}</div>
      </div>

      <div class="extra content">
        <Grid>
          <Grid.Column width={6}>
            <i class="user icon" />
            {props.username}
          </Grid.Column>
          <Grid.Column width={10} textAlign="right">
            {/* Nimi vasemmalle, Buttonit oikealle */}
            <button class="ui positive basic button">
              <i class="icon thumbs up" />
            </button>
            <button class="ui negative basic button">
              <i class="icon thumbs down" />
            </button>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
}
