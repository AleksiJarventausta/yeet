import React from "react";
import DescriptionBox from "./DescriptionBox";
import UserInfo from "./UserInfo";
import { Button, Icon } from "semantic-ui-react";
import { green, red } from "@material-ui/core/colors";

export default class ApplicationForm extends React.Component {
  state = {
    isSearching: false,
    color: "green",
    text: "Start searching",
    icon: "right arrow icon"
  };

  whenClicked() {
    const current = this.state.isSearching;
    if (!this.state.isSearching) {
      this.setState({
        color: "red",
        text: "Stop searching",
        icon: "left arrof icon"
      });
    } else {
      this.setState({
        color: "green",
        text: "Start searching",
        icon: "right arrow icon"
      });
    }
    this.setState({ isSearching: !current });
    console.log("Clicked!");
  }

  render() {
    return (
      <div>
        <h2>Your application form</h2>
        <UserInfo></UserInfo>
        <DescriptionBox />
        <span>game search things</span>
        <br />
        <div class="centered">
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
