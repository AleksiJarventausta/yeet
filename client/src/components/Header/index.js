import React from "react";
import { Grid, Divider, Label, Menu, Header } from "semantic-ui-react";

export default class HeaderThing extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item>
          <Header as="h1">MatchGamer</Header>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item name="Home">Home</Menu.Item>
          <Menu.Item name="Settings">Settings</Menu.Item>
          <Menu.Item name="Log in">Log in</Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
