import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, Divider } from "semantic-ui-react";

// Utils
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuth";

import axios from "axios";

import Login from "./components/auth/Login";
import Feed from "./components/Feed";
import ApplicationForm from "./components/ApplicationForm";
import Header from "./components/Header";
import Register from "./components/auth/Register";
import SignOut from "./components/auth/SignOut";
import UserInfo from "./components/Settings/userInfo.js";

import "./App.css";
import Axios from "axios";

Axios.defaults.baseURL = "http://yeet-yeet.rahtiapp.fi";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.setCurrentTab = this.setCurrentTab.bind(this);
    this.changeSearchingState = this.changeSearchingState.bind(this);

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
    errors: [],
    isSearching: false,
    posts: [],
    /* Current tab e.g current view: "home", "signOut", "logIn", "userInfo" */
    currentTab: "home",
    styles: {
      positiveColor: "green",
      negativeColor: "red"
    }
  };

  setCurrentUser(user) {
    this.setState({ user });
  }

  // When the user decides to start/stop searching,
  // change the state to match that and
  // if the user starts searching
  // fetch posts from the database and put them
  // on the state of this component
  setCurrentTab(tab) {
    this.setState({ currentTab: tab });
    console.log("Set tab to: " + tab);
  }
  changeSearchingState() {
    const currentState = this.state.isSearching;
    console.log("Clicked! the current state on app is!", currentState);
    this.setState({ isSearching: !currentState });
    if (currentState === false) {
      this.getPosts();
    }
  }

  updatePosts(updatedPosts) {
    this.setState({ posts: updatedPosts });
  }

  // Get posts from database and
  // put them on state.posts as a list
  getPosts() {
    const items = [];
    axios
      .get("/match/matches")
      .then(res => {
        const data = res.data;
        console.log("tietokannasta haetut postaukset:", data);
        const items = data.map(item => {
          return { ...item, voted: false };
        });

        this.setState({ posts: items });
      })
      .catch(err => console.log(err));
  }

  // Fetch posts from the database when the site is
  // rendered for the first time
  componentDidMount() {
    this.getPosts();
  }

  render() {
    return (
      <Router>
        <Grid container stackable>
          {/* Header row */}
          <Grid.Row centered>
            <Grid.Column>
              <Header
                setCurrentTab={this.setCurrentTab}
                tab={this.state.currentTab}
                user={this.state.user}
              />
            </Grid.Column>
          </Grid.Row>

          <Switch>
            <Route path="/" exact>
              {/* Kontentti row */}
              <Grid.Row>
                <Grid.Column width={7}>
                  <ApplicationForm
                    user={this.state.user}
                    styles={this.state.styles}
                    clicked={this.changeSearchingState}
                  />
                </Grid.Column>
                <Grid.Column width={9}>
                  <Feed
                    updatePosts={this.updatePosts.bind(this)}
                    posts={this.state.posts}
                    isSearching={this.state.isSearching}
                  ></Feed>
                </Grid.Column>
              </Grid.Row>
            </Route>
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  setCurrentTab={this.setCurrentTab}
                  setCurrentUser={this.setCurrentUser}
                />
              )}
            />
            <Route
              path="/register"
              render={props => (
                <Register {...props} setCurrentTab={this.setCurrentTab} />
              )}
            />
            <Route
              path="/signout"
              render={props => (
                <SignOut {...props} setCurrentUser={this.setCurrentUser} />
              )}
            />
            <Route
              path="/userinfo"
              render={props => (
                <UserInfo {...props} user={this.state.user} setCurrentTab={this.setCurrentTab} />
              )}
            />
            <Route>Error: Something went wrong :( Try again later.</Route>
          </Switch>
        </Grid>
      </Router>
    );
  }
}

export default App;
