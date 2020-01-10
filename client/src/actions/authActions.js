import axios from "axios";
import setAuthToken from "../utils/setAuth";
import jwt_decode from "jwt-decode";


export const registerUser =  (userData, history) => dispatch => {
    axios
        .post("/user/register", userData)
        .then(res => history.push("/"))
        .catch(err => 
        console.log(err));
}

// Login - get user token
 
  // Set logged in user
 
  
  // User loading
  /*
  export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };
  */
 
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