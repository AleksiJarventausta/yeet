import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import setAuthToken from "../../utils/setAuth";
import jwt_decode from "jwt-decode";

import {Link} from "react-router-dom";
import { Button, Message, Form, Grid, Input, Icon} from "semantic-ui-react";


class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      username: "username",
      discord: "vilps#1234",
      password1: "",
      password2: "",
      infoSaved: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit() {
    /* Poista alla oleva kun saadaan tietoa, tehdään lopussa */
    this.setState({infoSaved: true})
    const newInfo= {
      username: this.state.username,
      discord: this.state.discord,
      password1: this.state.password1,
      password2: this.state.password2
    };
    axios
      .post("", newInfo)
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
        this.setState({infoSaved: true})
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  updateBox(e, data) {
    console.log(e.target.name)
    if (e.target.name === "username") {
      this.setState({username: data.value})
    } else if (e.target.name === "discord") {
      this.setState({discord: data.value})
    } else if (e.target.name === "password1") {
      this.setState({password1: data.value})
    } else if (e.target.name === "password2") {
      this.setState({password2: data.value})
    }
  };

  render() {
    return (
      <Grid centered>
        <Grid.Column>
        <Form onSubmit={this.onSubmit}>
          <Message>
          <Form.Field>
            <Input
            name="username"
            onChange={(event, data) => {this.updateBox(event, data)}}
            value={this.state.username}/>
          </Form.Field>
          <Form.Field>
          <Input
          name="discord"
          onChange={(event, data) => {this.updateBox(event, data)}}
          value={this.state.discord}/>
          </Form.Field>
          <Form.Field>
          <Input
          name="password1"
          onChange={(event, data) => {this.updateBox(event, data)}}
          placeholder="New Password"
          value={this.state.password}/>
          </Form.Field>
          <Form.Field>
          <Input
          name="password2"
          onChange={(event, data) => {this.updateBox(event, data)}}
          placeholder="New Password Again"
          value={this.state.password}/>
          </Form.Field>
          </Message>
          <Button type="submit">
            <Icon name="pencil alternate" />
            Save
            </Button>
          {this.state.infosaved &&
              <h2>
                info saved
              </h2>
            }  {this.state.infoSaved &&
              <h2>
                info saved
              </h2>
            }
        </Form>
        </Grid.Column>
      </Grid>
    )}
}

export default withRouter(UserInfo);
