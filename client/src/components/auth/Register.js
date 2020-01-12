import React, { Component } from "react";
import {  withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Button, Message, Form, Grid} from "semantic-ui-react";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            discord:"",
            password: "",
            errors:{}
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
      password: this.state.password
    };
    axios
        .post("/user/register", newUser)
        .then(res => this.props.history.push("/"))
        .catch(err =>
        console.log(err));
  };


  render() {
    const {errors} = this.props;
    return (
      <div className="base-wrapper">
        <Grid centered>
          <Grid.Column>
            <Message>
          <Form noValidate onSubmit={this.onSubmit}>
          <div className="auth-group">
            <Form.Field>
          <label>
            <div className="auth-label">Name</div>
            <input
              onChange={this.onChange}
              value={this.state.username}
              id="username"
              type="text"
              className="auth-input"
              placeholder="username"
            />
        </label>
        </Form.Field>
        </div>

        <div className="auth-group">
          <Form.Field>
          <label>
            <div className="auth-label">Discord</div>
            <input
              onChange={this.onChange}
              value={this.state.discord}
              id="discord"
              type="text"
              className="auth-input"
              placeholder="user#0000"
            />
        </label>
        </Form.Field>
        </div>

        <div className="auth-group">
          <Form.Field>
          <label>
            <div className="auth-label">Password (min 8 characters)</div>
            <input
              onChange={this.onChange}
              id="password"
              type="password"
              className="auth-input"
            />
        </label>
        </Form.Field>
        </div>

        <div>
          <Button type="submit" className="auth-button">
            Sign up
          </Button>
        </div>
        <div className="bottom-group">
        </div>
      </Form>
      </Message>
      </Grid.Column>
      </Grid>
      </div>

    );
  }

}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withRouter(Register)
