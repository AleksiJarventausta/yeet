import React from "react";
import {Label, Menu, Header, Dropdown} from "semantic-ui-react";

export default class HeaderThing extends React.Component {
  state = {
    activeItem: ""
  }

  handleItemClick = (e, { name }) => {
    if (this.state.activeItem !== name) {
      this.setState({activeItem: name })
    } else {
      this.setState({activeItem: ""})
    }

    if (name === 'home') {
      console.log("Switch to home layout")
    } else if (name === 'logIn') {
      console.log("Switch to login layout")
    }
  }

  render() {
    return (
      <Menu>
        <Menu.Item>
          <Header as="h1">MatchGamer</Header>
        </Menu.Item>



        <Menu.Menu position="right">
          <Menu.Item name="home"
                    active={this.state.activeItem === 'home'}
                    onClick={this.handleItemClick}>
                    Home
          </Menu.Item>
          <Menu.Item name="logIn"
            active={this.state.activeItem === 'logIn'}
            onClick={this.handleItemClick}>
            Log in
          </Menu.Item>
            <Dropdown item text='Settings'
                      name='settings'
                      active={this.state.activeItem === 'settings'}
                      onClick={this.handleItemClick}>
              <Dropdown.Menu>
                <Dropdown.Item icon='edit' text='Place' />
                <Dropdown.Item icon='globe' text='Holder' />
              </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}
