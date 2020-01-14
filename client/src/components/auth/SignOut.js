import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import setAuthToken from "../../utils/setAuth";

import {Message, Grid} from "semantic-ui-react";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
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
