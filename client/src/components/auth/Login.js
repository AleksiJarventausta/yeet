import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import setAuthToken from "../../utils/setAuth";
import jwt_decode from "jwt-decode";

import { Link } from "react-router-dom";
import { Button, Message, Form, Grid, Input, Label } from "semantic-ui-react";

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

  componentDidMount() {
    this.props.setCurrentTab("logIn");
  }


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
        this.props.history.push("/");
        this.props.setCurrentTab("home");
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;
    return (
      <Grid centered>
        <Grid.Column>
          <Message>
            <Form noValidate onSubmit={this.onSubmit}>
              <Form.Field>
                Username
                <Input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="username"
                  className="auth-input"
                />
                {errors.username}
              </Form.Field>
              <Form.Field>
                Password
                <Input
                  onChange={this.onChange}
                  error={errors.password}
                  id="password"
                  type="password"
                  className="auth-input"
                />
                {errors.password}
              </Form.Field>

              <Button.Group fluid>
                <Button primary type="submit" content="Log in" />
                <Button as={Link} content="Sign up" to="/register" />
              </Button.Group>
            </Form>
            {/*No account? Register <Link to="/register"> here </Link>*/}
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(Login);
