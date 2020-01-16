import React from "react";
import DescriptionBox from "./DescriptionBox";
import UserInfo from "./UserInfo";
import SearchBar from "./SearchBar";
import Games from "./Games";
import { Button, Icon, Header, Segment } from "semantic-ui-react";
import axios from "axios";

import _ from "lodash";

// Texts for the button
const START_TEXT = "Start searching";
const STOP_TEXT = "Stop searching";

export default class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.styles.positiveColor,
      text: START_TEXT
    };
    this.updateState = this.updateState.bind(this);
    this.gameslistUpdated = this.gameslistUpdated.bind(this);

    this.throttledUpdate = _.throttle(
      data => this.updateToDatabase(data),
      1000
    ).bind(this);
  }

  // Send the application information to the database
  sendUpdatedInfoToDatabase(data) {
    // Change the address and parse data to form the back wants
    const address = "/post/search";
    axios.post(address, data).catch(err => console.log(err));
  }

  // Send users (changed) info to the App.js and
  // to the database (commented out)
  updateState(newUser) {
    //console.log("updated userInfo:", newUser);
    const info = {
      ...this.props.info,
      username: newUser.username,
      discord: newUser.discord,
      additional: newUser.additional,
      description: newUser.description
    };

    this.props.updateUser(info);
  }

  // A pu A
  updateToDatabase(newUser) {
    //console.log("updated userInfo:", newUser);
    //console.log("aaaa");
    const info = {
      ...this.props.info,
      username: newUser.username,
      discord: newUser.discord,
      additional: newUser.additional,
      description: newUser.description
    };

    this.sendUpdatedInfoToDatabase(info);
  }

  // Updated the gamelist in app.js
  gameslistUpdated(updatedList) {
    this.props.updateGamelist(updatedList);
  }

  // Sends the new application to the database (?),
  // when the users starts the search
  sendNewPost(searchState) {
    const data = {
      description: this.props.info.description, // TODO: hanki tähän kaikki tarvittavat tiedot
      active: searchState
    };
    axios
      .post("/post/search", data)
      //.then(res => console.log("Uusi hakemus tehty", data, res))
      .catch(err => console.log(err));
  }

  // Change search state (issearching) in the App.js and
  // change the buttons style to match current search state and
  // notify back end that searching as started.
  whenClicked() {
    this.props.clicked();
    const current = this.props.issearching;
    if (!current) {
      //console.log("Searching has been started!");
      this.setState({
        color: this.props.styles.negativeColor,
        text: STOP_TEXT
      });
      this.sendNewPost(!current);
    } else {
      //console.log("Searching has been stopped!");
      this.setState({
        color: this.props.styles.positiveColor,
        text: START_TEXT
      });
      this.sendNewPost(!current);
    }
  }

  render() {
    return (
      <div>
        <Header as="h2">Your application form</Header>
        <Segment.Group>
          <Segment>
            <UserInfo
              updateToDatabase={this.throttledUpdate}
              updateInfo={this.updateState}
              info={this.props.info}
              issearching={this.props.issearching}
            />
          </Segment>
          <Segment>
            <DescriptionBox
              updateInfo={this.updateState}
              updateToDatabase={this.throttledUpdate}
              info={this.props.info}
              issearching={this.props.issearching}
            />
          </Segment>
          <Segment>
            <SearchBar
              updateInfo={this.updateState}
              info={this.props.info}
              issearching={this.props.issearching}
            />
            <br />
            <Games
              info={this.props.info}
              listUpdated={this.gameslistUpdated}
              issearching={this.props.issearching}
            />
          </Segment>
        </Segment.Group>
        <Button
          fluid
          size="big"
          onClick={() => this.whenClicked()}
          color={this.state.color}
        >
          {this.props.issearching && <Icon name="pause" />}
          {this.state.text}
          {!this.props.issearching && <Icon name="arrow right" />}
        </Button>
      </div>
    );
  }
}
