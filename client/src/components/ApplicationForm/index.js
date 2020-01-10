import React from "react";
import DescriptionBox from "./DescriptionBox";
import UserInfo from "./UserInfo";
import { Button } from "semantic-ui-react";
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
      this.setState({ color: "red", text: "Stop searching" });
    } else {
      this.setState({ color: "green", text: "Start searching" });
    }
    this.setState({ isSearching: !current });
    console.log("Clicked!");
  }

  render() {
    return (
      <div>
        <UserInfo></UserInfo>
        <DescriptionBox />
        <span>game search things</span>
        <br />
        <Button
          onClick={() => this.whenClicked()}
          color={this.state.color}
          class="ui icon right labeled button"
        >
          {this.state.text}
          <i aria-hidden="true" class="right arrow icon"></i>
        </Button>
      </div>
    );
  }
}
