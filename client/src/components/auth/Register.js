import React, { Component } from "react";
import {  withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { Grid } from "@material-ui/core";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email:"",
            password: "",
            errors:{}
        };
    }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    

    this.props.registerUser(newUser, this.props.history);
  };


  render() {
    //const {errors} = this.state;
    const {errors} = this.props;
    return (
      <div className="base-wrapper">
        <Grid container justify="center">
          <form noValidate onSubmit={this.onSubmit}>

          <div className="auth-group">
          <label>
            <div className="auth-label">Name</div>
            <input
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
              id="name"
              type="text"
              className="auth-input"
            />
            <div className="auth-error">{errors.name}</div>
          </label>
        </div>

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
            Sign up
          </button>
        </div>
        <div className="bottom-group">
        </div>
          </form>
      </Grid>
      </div>

    );
  }

}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));