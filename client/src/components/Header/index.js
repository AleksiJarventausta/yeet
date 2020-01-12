import React from "react";
import {Link} from "react-router-dom";
import {Button, Menu, Header, Dropdown} from "semantic-ui-react";


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
      //this.props.history.push('/')
    } else if (name === 'logIn') {
      console.log("Switch to login layout")
      //this.props.history.push('/login')
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
                    onClick={this.handleItemClick}
                    as={Link} to='/'>
              Home
          </Menu.Item>

          <Menu.Item name="logIn"
            active={this.state.activeItem === 'logIn'}
            onClick={this.handleItemClick}
            as={Link} to='/login'>
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
