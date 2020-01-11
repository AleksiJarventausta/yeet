import React from "react";
import { Grid, Divider, Label } from "semantic-ui-react";

export default class Match extends React.Component {
  state = {
    matched: false
  };

  gameItems = this.props.games.map(game => {
    return <Label> {game + " "}</Label>;
  });

  render() {
  return (
    <div className={this.className}>
      <div className="content">
        <i className="user icon" />
        {this.props.username}
        <br />
        <br />
        You share interest in these games:
        <div className="header">{this.gameItems}</div>
        <br />
        <div className="description">{this.props.description}</div>
        <br />
      </div>

      <div className="extra content">

          {/* Nimi vasemmalle, Buttonit oikealle */}
          <button
            className="ui positive basic button">
            Accept
          </button>
          <button className="ui negative basic button">
            Decline
          </button>
      </div>
    </div>
  );
}
}
