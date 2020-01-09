import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Utils
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuth";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Login from './components/auth/Login';

import './App.css';
import Axios from 'axios';

if (localStorage.jwtTokenTeams) {
  // Set auth token header auth
  const token = JSON.parse(localStorage.jwtTokenTeams);
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./";
  }
}
Axios.defaults.baseURL="http://yeet-yeet.rahtiapp.fi";

function App() {
  return (

    <Provider store={store}>
        <Router >
          <div className="App">

          </div>
          <Switch>
              <Route path="/" component= {Login}/>
          </Switch>

        </Router>
      </Provider>
  );
}


export default App;
