import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import setAuthToken from "../../utils/setAuth";
import jwt_decode from "jwt-decode";
import {
  Button,
  Form,
  Grid,
  Input,
  Icon,
  Header,
  Segment
} from "semantic-ui-react";

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      discord: "",
      additional: "",
      newpassword1: "",
      newpassword2: "",
      password: "",
      infoSaved: false,
      errors: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.cancelSettings = this.cancelSettings.bind(this);
  }

  componentDidMount() {
    //console.log("asd");
    //console.log("User: " + this.props.user.username)
    this.setState({
      username: this.props.user.username,
      discord: this.props.user.discord,
      additional: this.props.user.additional
    });
  }

  cancelSettings() {
    this.props.history.push("/");
  }
  onSubmit(e) {
    e.preventDefault();
    /* Poista alla oleva kun saadaan tietoa, tehdään lopussa */
    this.setState({ infoSaved: true });
    const newInfo = {
      username: this.state.username,
      discord: this.state.discord,
      additional: this.state.additional,
      newpassword1: this.state.newpassword1,
      newpassword2: this.state.newpassword2,
      password: this.state.password
    };
    axios
      .post("/user/update", newInfo)
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
        this.setState({ infoSaved: true });
      })
      .catch(err => console.log(err));
  }

  updateBox(e, data) {
    if (e.target.name === "username") {
      this.setState({ username: data.value });
    } else if (e.target.name === "discord") {
      this.setState({ discord: data.value });
    } else if (e.target.name === "additional") {
      this.setState({ additional: data.value });
    } else if (e.target.name === "newpassword1") {
      this.setState({ newpassword1: data.value });
    } else if (e.target.name === "newpassword2") {
      this.setState({ newpassword2: data.value });
    } else if (e.target.name === "password") {
      this.setState({ password: data.value });
    }
  }

  render() {
    return (
      <Grid centered>
        <Grid.Column>
          <Form onSubmit={this.onSubmit}>
            <Segment.Group>
              <Segment>
                <Form.Field>
                  <Header>Logged in as {this.state.username}</Header>
                  {/* Username
                  <Input
                    name="username"
                    disabled={true}
                    onChange={(event, data) => {
                      this.updateBox(event, data);
                    }}
                    value={this.state.username}
                    placeholder={this.state.username}
                  /> */}
                </Form.Field>
                <Form.Field>
                  Discord tag
                  <Input
                    name="discord"
                    onChange={(event, data) => {
                      this.updateBox(event, data);
                    }}
                    value={this.state.discord}
                    placeholder={"discord"}
                  />
                </Form.Field>
                {/* <Form.Field>
                <Input
                  name="additional"
                  onChange={(event, data) => {
                    this.updateBox(event, data);
                  }}
                  value={this.state.additional}
                  placeholder={"additional contact information"}
                />
                </Form.Field> */}
              </Segment>
              <Segment>
                <Form.Field>
                  Change password
                  <Input
                    name="newpassword1"
                    onChange={(event, data) => {
                      this.updateBox(event, data);
                    }}
                    placeholder="New Password"
                    type="password"
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    name="newpassword2"
                    onChange={(event, data) => {
                      this.updateBox(event, data);
                    }}
                    placeholder="New Password Again"
                    type="password"
                  />
                </Form.Field>
              </Segment>
              <Segment>
                <Input
                  name="password"
                  onChange={(event, data) => {
                    this.updateBox(event, data);
                  }}
                  placeholder="Your current password"
                  type="password"
                />
                <Button type="submit">
                  <Icon name="pencil alternate" />
                  Save
                </Button>
                <Button onClick={this.cancelSettings}>Cancel</Button>
                {this.state.errors !== "" && (
                  <h2>some errors: {this.state.errors}</h2>
                )}
                {this.state.infoSaved && <Header> Info saved! </Header>}
              </Segment>
            </Segment.Group>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(UserSettings);
