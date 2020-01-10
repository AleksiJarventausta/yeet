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
        <p>Name: </p>
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
        <p>Discord: </p>
        <Form>
          <Input
            fluid
            placeholder="Discord name and tag, eg. User#1234"
            onChange={(event, data) => {
              this.setState({ discord: data.value });
            }}
            value={this.state.discord}
          />
        </Form>
        <p>Additional contact info: </p>
        <Form>
          <Input
            fluid
            placeholder="Additional contact information, eg. MTGA User#1234"
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
