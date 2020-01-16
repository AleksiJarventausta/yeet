import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";

// Utils
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuth";

import axios from "axios";
import { isEmpty } from "underscore";

import Login from "./components/auth/Login";
import Feed from "./components/Feed";
import ApplicationForm from "./components/ApplicationForm";
import Header from "./components/Header";
import Register from "./components/auth/Register";
import SignOut from "./components/auth/SignOut";
import UserSettings from "./components/Settings/userSettings.js";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.setCurrentTab = this.setCurrentTab.bind(this);
    this.changeSearchingState = this.changeSearchingState.bind(this);

    this.state = {
      user: {},
      errors: [],
      issearching: false,
      posts: [],
      // Current tab e.g current view: "home", "signOut", "logIn", "userSettings"
      currentTab: "home",
      styles: {
        positiveColor: "green",
        negativeColor: "red"
      }
    };
  }
  // Fetch posts from the database when the site is
  // rendered for the first time
  componentDidMount() {
    this.setUpdatePostsInterval();
    if (localStorage.jwtTokenTeams) {
      //console.log("is logged in");
      // Set auth token header auth
      const token = JSON.parse(localStorage.jwtTokenTeams);
      setAuthToken(token);

      // Decode token and get user info and exp
      const decoded = jwt_decode(token);

      // Set user and isAuthenticated
      this.setCurrentUser(decoded);

      //console.log("set current user to:" + decoded.username)
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

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  setUpdatePostsInterval() {
    const updateInterval = setInterval(() => {
      //console.log("getting posts");
      this.getPosts();
    }, 2000);
    this.setState({ intervalId: updateInterval });
  }

  // Set the username and discord, then put
  // empty values for games, additional and description.
  setCurrentUser(user) {
    //console.log("user:", user);

    if (user !== null) {
      this.getUserInfo2(user);
      this.getPosts();
      // games, additional and description has to bet set
      // these "empty" values, because the user does not return contain them
      // because they are fetched in different function
      const newUser = {
        username: user.username,
        discord: user.discord,
        games: [],
        additional: "",
        description: ""
      };
      //console.log("set currentuser:", newUser);
      this.setState({ user: newUser });
    } else {
      //console.log("set currentuser null");
      this.setState({ user: {} });
    }
  }

  getGameInfo(data) {
    if (data.games.length > 0) {
      let newList = [];

      axios
        .post("/games/search-id", { ids: data.games })
        .then(res => {
          //console.log("Haettu pelit:", res.data, res);
          newList = res.data.map(g => {
            const newGameItem = { ...g, title: g.name };

            return newGameItem;
          });

          this.setState(prevState => ({
            user: { ...prevState.user, games: newList }
          }));
        })
        .catch(err => console.log(err));
    }
  }

  removeItem(array, id) {
    for (var i in array) {
      if (array[i]._id === id) {
        array.splice(i, 1);
        break;
      }
    }
    return array;
  }

  getPostsGameInfo(data) {
    //console.log("data ja data.games", data, data.games);

    if (data.games.length > 0) {
      let newList = [];

      axios
        .post("/games/search-id", { ids: data.games })
        .then(res => {
          //console.log("Haettu pelit:", res.data, res);
          newList = res.data.map(g => {
            const newGameItem = { ...g, title: g.name };

            return newGameItem;
          });
          //console.log("newList:", newList);

          let updatedPosts = [...this.state.posts];
          const newDataObject = { ...data, games: newList, voted: false };

          //console.log("newDataObject:", newDataObject);

          // TODO: Make this remove the old post and add the updated post in the same place (same index as the deleted post)
          updatedPosts = this.removeItem(updatedPosts, data._id);
          updatedPosts.push(newDataObject);

          //console.log("updatedPosts:", updatedPosts);
          this.setState(prevState => ({
            posts: updatedPosts
          }));
        })
        .catch(err => console.log(err));
    }
  }

  // Fetch users data from the database and
  // set users games, additional and description.
  getUserInfo() {
    axios
      .get("/post")
      .then(res => {
        const data = res.data;
        //console.log("Haettu käyttäjän tiedot:", data);

        this.getGameInfo(data);

        this.setState(prevState => ({
          user: {
            ...prevState.user,
            games: data.games,
            username: this.state.user.username,
            discord: this.state.user.discord,
            additional: this.state.user.additional,
            description: data.description
          }
        }));
      })
      .catch(err => console.log(err));
  }

  getUserInfo2(user) {
    axios
      .get("/post")
      .then(res => {
        const data = res.data;
        //console.log("Haettu käyttäjän tiedot:", data);

        this.getGameInfo(data);

        this.setState(prevState => ({
          user: {
            ...prevState.user,
            ...user,
            games: data.games,
            username: this.state.user.username,
            discord: this.state.user.discord,
            additional: this.state.user.additional,
            description: data.description
          }
        }));
      })
      .catch(err => console.log(err));
  }
  setCurrentTab(tab) {
    this.setState({ currentTab: tab });
    //console.log("Set tab to: " + tab);
  }

  // When the user decides to start/stop searching,
  // change the state to match that and
  // if the user starts searching
  // fetch posts from the database and put them
  // on the state of this component
  changeSearchingState() {
    const currentState = this.state.issearching;
    //console.log("issearching is changed:", currentState, "->", !currentState);
    const setSearch = {
      active: !currentState
    };
    axios
      .post("/post/search", setSearch)
      .then(res => {
        this.setState({ issearching: !currentState });
        if (currentState === false) {
          this.getPosts();
        }
      })
      .catch(err => console.log(err));
  }

  updatePosts(updatedPosts) {
    this.setState({ posts: updatedPosts });
  }

  // Updates every field of user
  updateUser(updatedUser) {
    this.setState({ user: updatedUser });
  }

  // Updated the gamelist in state
  onGameslistUpdated(updatedList) {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        games: updatedList
      }
    }));
  }
  // Get posts from database and
  // put them on state in posts as a list
  getPosts() {
    axios
      .get("/match/matches")
      .then(res => {
        const data = res.data;
        //console.log("Tietokannasta haetut postaukset:", data);
        const items = data.map(item => {
          this.getPostsGameInfo(item);
          return { ...item, voted: false };
        });

        this.setState({ posts: items });
      })
      .catch(err => console.log(err));
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
                setCurrentUser={this.setCurrentUser.bind(this)}
              />
            </Grid.Column>
          </Grid.Row>

          <Switch>
            <Route path="/" exact>
              {/* Kontentti row */}
              <Grid.Row>
                <Grid.Column width={7}>
                  {!isEmpty(this.state.user) && (
                    <ApplicationForm
                      info={this.state.user}
                      issearching={this.state.issearching}
                      styles={this.state.styles}
                      clicked={this.changeSearchingState}
                      updateUser={this.updateUser.bind(this)}
                      updateGamelist={this.onGameslistUpdated.bind(this)}
                    />
                  )}
                  {isEmpty(this.state.user) && (
                    <div>
                      <h2>You have to log in to see content</h2>
                      <Button primary as={Link} to="/login" content="Log in" />
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column width={9}>
                  {this.state.issearching && (
                    <Feed
                      updatePosts={this.updatePosts.bind(this)}
                      posts={this.state.posts}
                      issearching={this.state.issearching}
                    ></Feed>
                  )}
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
              path="/usersettings"
              render={props => (
                <UserSettings
                  {...props}
                  user={this.state.user}
                  setCurrentTab={this.setCurrentTab}
                  setCurrentUser={this.setCurrentUser}
                />
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
