import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, Divider } from "semantic-ui-react";

// Utils
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuth";

import Login from "./components/auth/Login";
import Feed from "./components/Feed";

import "./App.css";
import Axios from "axios";

Axios.defaults.baseURL = "http://yeet-yeet.rahtiapp.fi";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    if (localStorage.jwtTokenTeams) {
      // Set auth token header auth
      const token = JSON.parse(localStorage.jwtTokenTeams);
      setAuthToken(token);

      // Decode token and get user info and exp
      const decoded = jwt_decode(token);

      // Set user and isAuthenticated
      this.setCurrentUser(decoded);

      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        this.setCurrentUser(null);

        // Redirect to login
        window.location.href = "./";
      }
    }
  }
  state = {
    user: {},
    isAuthenticated: false,
    errors: []
  };

  setCurrentUser(user) {
    this.setState({ user });
  }

  render() {
    return (
      <Router>
        <Grid container stackable>
          {/* Header row */}
          <Grid.Row centered>
            <Grid.Column>
              {<p>Header</p> /* TODO: Add Header component here */}
            </Grid.Column>
          </Grid.Row>
          {/* Kontentti row */}
          <Grid.Row>
            <Grid.Column width={7}>
              <p>
                My own post My own post My own post My own post My own post My
                own post My own post My own post My own post My own post{" "}
              </p>
              <p>
                Search status Search status Search status Search status Search
                status Search status Search status Search status Search status
                Search status Search status Search status{" "}
              </p>
              {/* TODO: Add OwnPost and StatusInfo components here */}
            </Grid.Column>
            <Grid.Column width={9}>
              <Feed></Feed>
              {/* TODO: Add OtherUsersPost(s) here */}
            </Grid.Column>
          </Grid.Row>
          <Switch>
            <Route
              path="/login"
              render={props => (
                <Login {...props} setCurrentUser={this.setCurrentUser} />
              )}
            />
          </Switch>
        </Grid>
      </Router>
    );
  }
}

export default App;
