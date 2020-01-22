import React from "react";
import DescriptionBox from "./DescriptionBox";
import UserInfo from "./UserInfo";
import SearchBar from "./SearchBar";
import Games from "./Games";
import { Button, Icon, Header, Segment } from "semantic-ui-react";
import axios from "axios";

import _ from "lodash";

export default class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
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
      this.sendNewPost(!current);
    } else {
      //console.log("Searching has been stopped!");
      this.sendNewPost(!current);
    }
  }

  render() {
    return (
      <div>
        {!this.props.issearching && (
          <Header as="h2">Your application form</Header>
        )}
        <Segment.Group>
          {!this.props.issearching && (
            <Segment>
              <UserInfo
                updateToDatabase={this.throttledUpdate}
                updateInfo={this.updateState}
                info={this.props.info}
                issearching={this.props.issearching}
              />
            </Segment>
          )}
          <Segment>
            {!this.props.issearching ? (
              <div>
                <DescriptionBox
                  updateInfo={this.updateState}
                  updateToDatabase={this.throttledUpdate}
                  info={this.props.info}
                  issearching={this.props.issearching}
                />
                <br />
              </div>
            ) : (
              <Segment>{this.props.info.description}</Segment>
            )}
            {!this.props.issearching && (
              <div>
                <SearchBar
                  updateInfo={this.updateState}
                  info={this.props.info}
                  issearching={this.props.issearching}
                />
                <br />
              </div>
            )}
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
          color={
            this.props.issearching
              ? this.props.styles.negativeColor
              : this.props.styles.positiveColor
          }
        >
          {this.props.issearching && <Icon name="pause" />}
          {this.props.issearching ? "Stop searching" : "Start searching"}
          {!this.props.issearching && <Icon name="arrow right" />}
        </Button>
      </div>
    );
  }
}
