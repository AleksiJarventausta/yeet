import React from "react";
import {Link} from "react-router-dom";
import {Button, Menu, Header, Dropdown} from "semantic-ui-react";
import {isEmpty} from "underscore";


export default class HeaderThing extends React.Component {
  state = {
    activeItem: "home"
  };


  handleItemClick = (e, { name }) => {
    this.setState({activeItem: name })
  }

  render() {
    console.log(this.props.user);
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
                    active={this.state.activeItem === 'home'}
                    as={Link} to='/'
                    onClick={(event, data) => this.handleItemClick(event, data)}>
              Home
          </Menu.Item>

          {!isEmpty(this.props.user) ?
            <Menu.Item name="logIn"
              active={this.state.activeItem === 'logIn'}
              as={Link} to='/signOut'
              onClick={(event, data) => this.handleItemClick(event, data)}>
              Sign out
            </Menu.Item>
            :
            <Menu.Item name="logIn"
              active={this.state.activeItem === 'logIn'}
              as={Link} to='/login'
              onClick={(event, data) => this.handleItemClick(event, data)}>
              Log in
            </Menu.Item>
          }
            <Dropdown item text='Settings'
                      name='settings'
                      active={this.state.activeItem === 'settings'}>
              <Dropdown.Menu>
                <Dropdown.Item icon='user circle' text='User Info'
                  as={Link} to='/userinfo'
                  onClick={(event, data) => this.handleItemClick(event, data)}/>
              </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}
