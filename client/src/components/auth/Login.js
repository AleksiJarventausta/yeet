import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Grid } from "@material-ui/core";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email:"",
            password: "",
            errors:{}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    componentDidMount() {
        if(this.props.auth.isAuthenticated){
        }
    }

    componentDidUpdate() {
        if(this.props.auth.isAuthenticated)
        {
        }
    }


    onSubmit = e => {
        e.preventDefault();
        const newLogin = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(newLogin, this.props.history);
    };

    render() {
        const {errors} = this.props;
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
    { loginUser }
  )(withRouter(Login));
