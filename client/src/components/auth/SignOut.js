import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import setAuthToken from "../../utils/setAuth";
import jwt_decode from "jwt-decode";

import {Link} from "react-router-dom";
import { Button, Message, Form, Grid} from "semantic-ui-react";


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

  // Signout here
  componentDidMount() {
    localStorage.removeItem("jwtTokenTeams");
    setAuthToken(false);
    this.props.setCurrentUser(null)
  }

  componentDidUpdate() {}

  onSubmit(e) {
    e.preventDefault();
    const newLogin = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      //.post("/user/login", newLogin)
      //.then(res => {})
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    return (
        <Grid centered>
          <Grid.Column>
          <Message>
            Signed out
          </Message>
          </Grid.Column>
          </Grid>
    );
  }
}

export default withRouter(Login);
