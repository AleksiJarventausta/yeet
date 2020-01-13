import React from "react";
import {Link} from "react-router-dom";
import {Button, Menu, Header, Dropdown} from "semantic-ui-react";
import {isEmpty} from "underscore";
import { withRouter } from "react-router-dom";

class HeaderThing extends React.Component {

  handleItemClick = (e, { name }) => {
    //this.setState({activeItem: name })

    if (name === "home" ) {
      this.props.history.push("/");
    } else if (name === "logIn" ) {
      this.props.history.push("/login");
    } else if (name === "signOut" ) {
      this.props.history.push("/signout");
    } else if (name === "userInfo" ) {
      this.props.history.push("/userinfo");
    }
    this.props.setCurrentTab(name);
  }

  render() {
    return (
      <Menu tabular>
        <Menu.Item
          name="home"
          as={Link} to='/'
          onClick={(event, data) => this.handleItemClick(event, data)}>
          <Header >
            MatchGamer
          </Header>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="home"
                    active={this.props.tab === 'home'}
                    as={Link} to='/'
                    onClick={(event, data) => this.handleItemClick(event, data)}>
              Home
          </Menu.Item>

          {!isEmpty(this.props.user) ?
            <Menu.Item name="signOut"
              active={this.props.tab === 'logIn'}
              onClick={(event, data) => this.handleItemClick(event, data)}>
              Sign out
            </Menu.Item>
            :
            <Menu.Item name="logIn"
              active={this.props.tab === 'logIn'}
              onClick={(event, data) => this.handleItemClick(event, data)}>
              Log in
            </Menu.Item>
          }
            <Dropdown item text='Settings'
                      name='settings'>
              <Dropdown.Menu>
                {!isEmpty(this.props.user) &&
                <Dropdown.Item icon='user circle' text='User Info'
                  name="userInfo"
                  onClick={(event, data) => this.handleItemClick(event, data)}/>
                }
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(HeaderThing);
