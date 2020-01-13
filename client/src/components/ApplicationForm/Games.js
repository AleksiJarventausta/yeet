import React from "react";
import { Label, Icon } from "semantic-ui-react";

export default class Games extends React.Component {
  removeItem(array, item) {
    for (var i in array) {
      if (array[i] == item) {
        array.splice(i, 1);
        break;
      }
    }
    return array;
  }

  deleteGame(game) {
    const old = this.props.info.games;
    let updated = this.removeItem(old, game);
    this.props.listUpdated(updated);
  }

  render() {
    const gameItems = this.props.info.games.map(game => {
      return (
        <Label deleteGame={this.deleteGame}>
          {game}{" "}
          <Icon
            game={game}
            onClick={e => {
              this.deleteGame(game);
            }}
            name="delete"
          />
        </Label>
      );
    });
    return gameItems;
  }
}
