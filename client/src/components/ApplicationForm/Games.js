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
    const old = this.props.games;
    let updated = this.removeItem(old, game);
    console.log("updated list after remove:", updated);
    this.props.listUpdated(updated);
  }

  render() {
    console.log("this.props.games", this.props.games);
    const gameItems = this.props.games.map(game => {
      return (
        <Label deleteGame={this.deleteGame}>
          {game}{" "}
          <Icon
            game={game}
            onClick={e => {
              console.log("clicked remove icon", e);
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
