import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button, Message, Form, Grid} from "semantic-ui-react";

class Register extends Component {
    constructor(props) {
        super(props);
        this.cancelRegistration = this.cancelRegistration.bind(this);
        this.state = {
              username: "",
              discord:"",
              password: "",
              passwordconfirm: "",
              errors:{}
          };
    }


  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      discord: this.state.discord,
      password: this.state.password,
      passwordconfirm: this.state.passwordconfirm
    };
    axios
        .post("/user/register", newUser)
        .then(res => {
          console.log("axios res");
          this.props.setCurrentTab("logIn");
          this.props.history.push("/login");
        })
        .catch(err => console.log(err));
  };

  cancelRegistration () {
    this.props.history.push("/");
  }

  render() {
    const {errors} = this.props;
    return (
      <div className="base-wrapper">
        <Grid centered>
          <Grid.Column>
            <Message>
          <Form noValidate onSubmit={this.onSubmit}>
          <div className="auth-group">
            <Form.Field>
          <label>
            <div className="auth-label">Name</div>
            <input
              onChange={this.onChange}
              value={this.state.username}
              id="username"
              type="text"
              className="auth-input"
              placeholder="username"
            />
        </label>
        </Form.Field>
        </div>

        <div className="auth-group">
          <Form.Field>
          <label>
            <div className="auth-label">Discord</div>
            <input
              onChange={this.onChange}
              value={this.state.discord}
              id="discord"
              type="text"
              className="auth-input"
              placeholder="user#0000"
            />
        </label>
        </Form.Field>
        </div>

        <div className="auth-group">
        <Form.Field>
          <label>
            <div className="auth-label">Password (min 8 characters)</div>
            <input
              onChange={this.onChange}
              id="password"
              type="password"
              className="auth-input"
            />
        </label>
        </Form.Field>
        </div>

        <div className="auth-group">
        <Form.Field>
          <label>
            <div className="auth-label">Password again</div>
            <input
              onChange={this.onChange}
              id="passwordconfirm"
              type="password"
              className="auth-input"
            />
        </label>
        </Form.Field>
        </div>

        <div>
          <Button type="submit" className="auth-button">
            Sign up
          </Button>
          <Button
            onClick={this.cancelRegistration}>
            Cancel
          </Button>
        </div>
        <div className="bottom-group">
        </div>
      </Form>
      </Message>
      </Grid.Column>
      </Grid>
      </div>

    );
  }

}
export default withRouter(Register)
