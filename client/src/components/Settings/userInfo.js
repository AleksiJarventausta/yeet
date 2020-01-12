import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import setAuthToken from "../../utils/setAuth";
import jwt_decode from "jwt-decode";

import {Link} from "react-router-dom";
import { Button, Message, Form, Grid} from "semantic-ui-react";


class UserInfo extends Component {
  render() {
    return (
      <Grid centered>
        <Grid.Column>
        <Message>
        Käyttäjätiedot
        </Message>
        </Grid.Column>
      </Grid>
    )}
}

export default withRouter(UserInfo);
