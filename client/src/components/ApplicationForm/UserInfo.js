import React from "react";

import { TextArea, Button, Grid, Form, Input } from "semantic-ui-react";

export default class UserInfo extends React.Component {
  render() {
    console.log("UserInfoon tulevat tiedot", this.props.info);

    return (
      <Form>
        <Form.Field>
          <label>Name:</label>
          <Input
            disabled={true}
            onChange={(event, data) => {
              //this.setState({ username: data.value });
              const newData = {
                username: data.value
              };
              this.props.updateInfo(newData);
            }}
            value={this.props.info.username}
            placeholder="username/nickname"
          />
        </Form.Field>
        <Form.Field>
          <label>Discord:</label>
          <Input
            disabled
            onChange={(event, data) => {
              //this.setState({ username: data.value });
              const newData = {
                discord: data.value
              };
              this.props.updateInfo(newData);
            }}
            value={this.props.info.discord}
            placeholder="eg. testUser#1234"
          />
        </Form.Field>
        <Form.Field>
          <label>Additional contact information:</label>
          <Input
            disabled={this.props.isSearching}
            onChange={(event, data) => {
              //this.setState({ username: data.value });
              const newData = {
                ...this.state,
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

/* 
  render() {
    return (
      <div>
        <span>Name: </span>
        <Form>
          <Input
            fluid
            placeholder="username/nickname"
            onChange={(event, data) => {
              this.setState({ username: data.value });
            }}
            value={this.state.username}
          />
        </Form>
        <span>Discord: </span>
        <Form>
          <Input
            fluid
            placeholder="eg. testUser#1234"
            onChange={(event, data) => {
              this.setState({ discord: data.value });
            }}
            value={this.state.discord}
          />
        </Form>
        <span>Additional contact info: </span>
        <Form>
          <Input
            fluid
            placeholder="eg. MTGA testPlayer#1234"
            onChange={(event, data) => {
              this.setState({ additional: data.value });
            }}
            value={this.state.additional}
          />
        </Form>
      </div>
    );
  }
}

*/
