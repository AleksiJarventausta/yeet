import React from "react";

import { TextArea, Button, Grid, Form, Input } from "semantic-ui-react";

export default class UserInfo extends React.Component {
  state = {
    username: "",
    discord: "",
    additional: ""
  };

  render() {
    return (
      <div>
        {/* this.state.isAutist && <p>juttui</p>*/}
        {/*TODO: Tee kentistä koko alueen levyiset*/}
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
