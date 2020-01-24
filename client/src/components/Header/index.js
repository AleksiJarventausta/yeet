import React from "react";
import { Link } from "react-router-dom";
import { Menu, Header, Dropdown } from "semantic-ui-react";
import { isEmpty } from "underscore";
import { withRouter } from "react-router-dom";

class HeaderThing extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }

  setCurrentUser(user) {
    this.props.setCurrentUser(user);
  }
  handleItemClick = (e, { name }) => {
    e.preventDefault();
    //this.setState({activeItem: name })

    if (name === "home") {
      this.props.history.push("/");
    } else if (name === "logIn") {
      this.props.history.push("/login");
    } else if (name === "signOut") {
      this.props.history.push("/signout");
    } else if (name === "userSettings") {
      this.props.history.push("/userSettings");
    }
    this.props.setCurrentTab(name);
  };

  render() {
    return (
      <Menu tabular>
        <Menu.Item
          name="home"
          as={Link}
          to="/"
          onClick={(event, data) => this.handleItemClick(event, data)}
        >
          <Header>MatchMaker</Header>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            icon="home"
            name="home"
            active={this.props.tab === "home"}
            as={Link}
            to="/"
            onClick={(event, data) => this.handleItemClick(event, data)}
          />
          <Dropdown item name="settings" icon="user">
            <Dropdown.Menu>
              {!isEmpty(this.props.user) ? (
                <Dropdown.Item
                  icon="lock"
                  text="Log out"
                  name="signOut"
                  active={this.props.tab === "logIn"}
                  onClick={(event, data) => this.handleItemClick(event, data)}
                />
              ) : (
                <Dropdown.Item
                  icon="key"
                  text="Log in"
                  name="logIn"
                  active={this.props.tab === "logIn"}
                  onClick={(event, data) => this.handleItemClick(event, data)}
                />
              )}
              {!isEmpty(this.props.user) && (
                <Dropdown.Item
                  icon="pencil"
                  text="Edit user information"
                  name="userSettings"
                  onClick={(event, data) => this.handleItemClick(event, data)}
                />
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(HeaderThing);
