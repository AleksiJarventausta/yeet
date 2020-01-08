import axios from "axios";
import setAuthToken from "../utils/setAuth";
import jwt_decode from "jwt-decode";

import {GET_ERRORS, SET_CURRENT_USER, GET_USERS} from "./types";

export const registerUser =  (userData, history) => dispatch => {
    axios
        .post("/user/register", userData)
        .then(res => history.push("/"))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Login - get user token
export const loginUser = (userData, history) => dispatch => {
    axios
      .post("/user/login", userData)
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
        dispatch(setCurrentUser(decoded));
        

      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  
  // Set logged in user
  export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };
  
  // User loading
  /*
  export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };
  */

  export const getUsers = history => dispatch => {
    axios
      .get("/user/search")
      .then(res => dispatch({
          type: GET_USERS,
          payload:res.data
      }))
      .catch(err => 
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
          })
      );
  }
  
  // Log user out
  export const logoutUser = history => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtTokenTeams");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  
    history.push("/");
  };