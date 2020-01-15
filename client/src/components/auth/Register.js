import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button, Message, Form, Grid, Input } from "semantic-ui-react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.cancelRegistration = this.cancelRegistration.bind(this);
    this.state = {
      username: "",
      discord: "",
      password: "",
      passwordconfirm: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      discord: this.state.discord,
      password: this.state.password,
      passwordconfirm: this.state.passwordconfirm
    };
    axios
      .post("/user/register", newUser)
      .then(res => {
        console.log("axios res");
        this.props.setCurrentTab("logIn");
        this.props.history.push("/login");
      })
      .catch(err => console.log(err));
  };

  cancelRegistration() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="base-wrapper">
        <Grid centered>
          <Grid.Column>
            <Message>
              <Form noValidate onSubmit={this.onSubmit}>
                <Form.Field>
                  Username
                  <Input
                    onChange={this.onChange}
                    value={this.state.username}
                    id="username"
                    type="text"
                    className="auth-input"
                    placeholder="username"
                  />
                </Form.Field>

                <Form.Field>
                  Discord tag
                  <Input
                    onChange={this.onChange}
                    value={this.state.discord}
                    id="discord"
                    type="text"
                    className="auth-input"
                    placeholder="user#0000"
                  />
                </Form.Field>
                <Form.Field>
                  Password (8 characters minimum)
                  <Input
                    onChange={this.onChange}
                    id="password"
                    type="password"
                    className="auth-input"
                  />
                </Form.Field>

                <Form.Field>
                  Password again
                  <Input
                    onChange={this.onChange}
                    id="passwordconfirm"
                    type="password"
                    className="auth-input"
                  />
                </Form.Field>

                <Button.Group fluid>
                  <Button
                    primary
                    type="submit"
                    className="auth-button"
                    content="Sign up"
                  />
                  <Button onClick={this.cancelRegistration} content="Cancel" />
                </Button.Group>
                <div className="bottom-group"></div>
              </Form>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default withRouter(Register);
