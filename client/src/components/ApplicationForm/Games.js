import React from "react";
import { Label, Icon } from "semantic-ui-react";

import axios from "axios";

export default class Games extends React.Component {
  state = {
    games: []
  };

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

    axios
      .post("/post/deletegame", { _id: game.id })
      .then(res => {
        console.log("Poistettiin peli", game);
      })
      .catch(err => console.log(err));
  }

  getGameInfo(data) {
    if (data.games.length > 0) {
      let newList = [];

      axios
        .post("/games/search-id", { ids: data.games })
        .then(res => {
          //console.log("Haettu pelit:", res.data, res);
          newList = res.data.map(g => {
            const newGameItem = { ...g, title: g.name };

            return newGameItem;
          });

          this.setState({ games: newList });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const gameItems = this.props.info.games.map(game => {
      //const gameItems = this.getGameInfo({games: [1332, 11198]}).map(game => {

      return (
        <Label key={game.id} deleteGame={this.deleteGame}>
          {game.name}{" "}
          {!this.props.issearching && (
            <Icon
              game={game}
              onClick={e => {
                this.deleteGame(game);
              }}
              name="delete"
            />
          )}
        </Label>
      );
    });
    return gameItems;
  }
}
