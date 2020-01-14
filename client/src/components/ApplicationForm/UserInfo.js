import React from "react";

import { Form, Input } from "semantic-ui-react";

export default class UserInfo extends React.Component {
  render() {
    return (
      <Form>
        <Form.Field>
          <label>Name:</label>
          <Input
            disabled={true}
            value={this.props.info.username}
            placeholder="username/nickname"
            onChange={(event, data) => {
              const newData = {
                ...this.props.info,
                username: data.value
              };
              this.props.updateInfo(newData);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Discord:</label>
          <Input
            disabled
            value={this.props.info.discord}
            placeholder="eg. testUser#1234"
            onChange={(event, data) => {
              console.log("changed discord-field");
              const newData = {
                ...this.props.info,
                discord: data.value
              };
              console.log("AAAAA new User data (from user info)", newData);
              this.props.updateInfo(newData);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Additional contact information:</label>
          <Input
            disabled={this.props.issearching}
            onChange={(event, data) => {
              //this.setState({ username: data.value });
              const newData = {
                ...this.props.info,
                additional: data.value
              };
              this.props.updateInfo(newData);
            }}
            value={this.props.info.additional}
            placeholder="eg. MTGA testPlayer#1234"
          />
        </Form.Field>
      </Form>
    );
  }
}
