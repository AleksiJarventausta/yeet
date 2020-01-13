import React from "react";
import DescriptionBox from "./DescriptionBox";
import UserInfo from "./UserInfo";
import SearchBar from "./SearchBar";
import Games from "./Games";
import { Button, Icon, Header, Segment } from "semantic-ui-react";
import axios from "axios";

// TODO: Laita tämä käyttämään App.js:n tilaa isSearching eikä omaa paskakikkaretta

export default class ApplicationForm extends React.Component {
  state = {
    color: this.props.styles.positiveColor,
    text: "Start searching"
  };

  sendUpdatedInfoToDatabase(data) {
    // Change the address and parse data to form the back wants
    const address = "";
    axios
      .post(address, data)
      .then(res =>
        console.log("Hakemuksen tiedot päivitetty tietokantaan", data, res)
      )
      .catch(err => console.log(err));
  }

  updateState(newUser) {
    console.log("updated userInfo:", newUser);
    const info = {
      ...this.props.info,
      username: newUser.username,
      discord: newUser.discord,
      additional: newUser.additional,
      description: newUser.description
    };

    this.props.updateUser(info);
    //this.sendUpdatedInfoToDatabase(data);
  }

  // Updated the gamelist in app.js
  gameslistUpdated(updatedList) {
    this.props.updateGamelist(updatedList);
  }

  // Sends the new application to the database (?)
  sendNewPost(searchState) {
    const data = {
      description: "hard-coded palceholder", // TODO: hanki tähän kaikki tarvittavat tiedot
      active: searchState
    };
    axios
      .post("/post/search", data)
      .then(res => console.log("Uusi hakemus tehty", data, res))
      .catch(err => console.log(err));
  }

  whenClicked() {
    this.props.clicked();
    const current = this.props.isSearching;
    if (!current) {
      this.setState({
        color: this.props.styles.negativeColor,
        text: "Stop searching"
      });
      this.sendNewPost(!current);
    } else {
      this.setState({
        color: this.props.styles.positiveColor,
        text: "Start searching"
      });
      this.sendNewPost(!current);
    }
    console.log("Clicked!");
  }

  render() {
    return (
      <div>
        <Header as="h2">Your application form</Header>
        <Segment.Group>
          <Segment>
            <UserInfo
              updateInfo={this.updateState.bind(this)}
              info={this.props.info}
              isSearching={this.props.isSearching}
            />
          </Segment>
          <Segment>
            <DescriptionBox
              updateInfo={this.updateState.bind(this)}
              info={this.props.info}
              isSearching={this.props.isSearching}
            />
          </Segment>
          <Segment>
            <SearchBar
              updateInfo={this.updateState.bind(this)}
              info={this.props.info}
              isSearching={this.props.isSearching}
            />
            <br />
            <Games
              info={this.props.info}
              listUpdated={this.gameslistUpdated.bind(this)}
              isSearching={this.props.isSearching}
            />
          </Segment>
        </Segment.Group>
        <Button
          fluid
          size="big"
          onClick={() => this.whenClicked()}
          color={this.state.color}
        >
          {this.state.isSearching && <Icon name="pause" />}
          {this.state.text}
          {!this.state.isSearching && <Icon name="right arrow icon" />}
        </Button>
      </div>
    );
  }
}
