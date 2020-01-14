import React from "react";
import { Label, Icon } from "semantic-ui-react";

export default class Games extends React.Component {
  // Function to remove specific item from a list.
  // Would be better to use some library but it works.
  removeItem(array, item) {
    for (var i in array) {
      if (array[i] === item) {
        array.splice(i, 1);
        break;
      }
    }
    return array;
  }

  // Remove a game from selected games and
  // update that information to upper level.
  deleteGame(game) {
    const old = this.props.info.games;
    let updated = this.removeItem(old, game);
    this.props.listUpdated(updated);
    console.log("Removed game:", game);
  }

  render() {
    console.log("AAAAA", this.props.info.games);
    const gameItems = this.props.info.games.map(game => {
      return (
        <Label key={game.id} deleteGame={this.deleteGame}>
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
