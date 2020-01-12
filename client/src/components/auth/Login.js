import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Grid } from "@material-ui/core";
import axios from "axios";
import setAuthToken from "../../utils/setAuth";
import jwt_decode from "jwt-decode";

import { Button, Message, Form} from "semantic-ui-react";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentDidMount() {}

  componentDidUpdate() {}

  onSubmit(e) {
    e.preventDefault();
    const newLogin = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("/user/login", newLogin)
      .then(res => {
        // Save to localStorage

        // Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtTokenTeams", JSON.stringify(token));
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        this.props.setCurrentUser(decoded);
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="base-wrapper">
        <Grid container justify="center">
          <Message>
          <Form noValidate onSubmit={this.onSubmit}>
            <div className="auth-group">
              <Form.Field>
                <label>
                  <div className="auth-label">Username</div>
                  <input
                    onChange={this.onChange}
                    value={this.state.username}
                    error={errors.username}
                    id="username"
                    type="username"
                    className="auth-input"
                  />
                <div className="auth-error">{errors.username}</div>
                </label>
              </Form.Field>
            </div>

            <div className="auth-group">
              <Form.Field>
                <label>
                  <div className="auth-label">Password</div>
                  <input
                    onChange={this.onChange}
                    error={errors.password}
                    id="password"
                    type="password"
                    className="auth-input"
                  />
                  <div className="auth-error">{errors.password}</div>
                </label>
              </Form.Field>
            </div>

            <div>
              <Button type="submit" className="auth-button">
                Sign In
              </Button>
              <Button >
                Register
              </Button>
            </div>
            <div className="bottom-group"></div>
          </Form>
        </Message>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Login);
