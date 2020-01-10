import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Grid } from "@material-ui/core";
import axios from "axios";
import setAuthToken from "../../utils/setAuth";
import jwt_decode from "jwt-decode";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  onSubmit(e){
    e.preventDefault();
    const newLogin = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/user/login", newLogin)
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
      })
      .catch(err =>
        this.setState({errors:err.response.data})
      );
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="base-wrapper">
        <Grid container justify="center">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="auth-group">
              <label>
                <div className="auth-label">Email address</div>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className="auth-input"
                />
                <div className="auth-error">{errors.email}</div>
              </label>
            </div>

            <div className="auth-group">
              <label>
                <div className="auth-label">Password</div>
                <input
                  onChange={this.onChange}
                  error={errors.password}
                  id="password"
                  type="password"
                  className="auth-input"
                />
                <div className="auth-error">{errors.password}</div>
              </label>
            </div>

            <div>
              <button type="submit" className="auth-button">
                Sign In
              </button>
            </div>
            <div className="bottom-group"></div>
          </form>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Login);
