import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Utils
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuth";

import Login from "./components/auth/Login";

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
    this.setCurrentUser(null)

    // Redirect to login
    window.location.href = "./";
  }
}
<<<<<<< HEAD
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
        <div className="App"></div>
        <Switch>
          <Route
            path="/login"
            render={props => (
              <Login {...props} setCurrentUser={this.setCurrentUser} />
            )}
          />
        </Switch>
      </Router>
    );
  }
=======
Axios.defaults.baseURL = "http://yeet-yeet.rahtiapp.fi";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App"></div>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
>>>>>>> a91252c50d63fb78a44880cebb8b2e4d9c715b1a
}

export default App;
