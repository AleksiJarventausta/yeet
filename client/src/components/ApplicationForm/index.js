import React from "react";
import DescriptionBox from "./DescriptionBox";
import UserInfo from "./UserInfo";
import { Button, Icon, Message, Header } from "semantic-ui-react";
import { green, red } from "@material-ui/core/colors";

export default class ApplicationForm extends React.Component {
  state = {
    isSearching: false,
    color: "green",
    text: "Start searching"
  };

  whenClicked() {
    const current = this.state.isSearching;
    if (!this.state.isSearching) {
      this.setState({
        color: "red",
        text: "Stop searching"
      });
    } else {
      this.setState({
        color: "green",
        text: "Start searching"
      });
    }
    this.setState({ isSearching: !current });
    console.log("Clicked!");
  }

  render() {
    return (
      <div>
        <Header as="h2">Your application form</Header>
        <Message>
          <UserInfo></UserInfo>
          <div>
            <br />
          </div>
          <DescriptionBox />
          <span>game search things</span>
          <br />
        </Message>
        <div className="centered">
          <Button onClick={() => this.whenClicked()} color={this.state.color}>
            {this.state.isSearching && <Icon name="pause" />}
            {this.state.text}
            {!this.state.isSearching && <Icon name="right arrow icon" />}
          </Button>
        </div>
      </div>
    );
  }
}
