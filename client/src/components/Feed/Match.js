import React from "react";
import { Label, Card, Header, Icon } from "semantic-ui-react";

export default class Match extends React.Component {
  state = {
    matched: false
  };

  render() {
    return (
      <Card fluid>
        <Card.Content>
          <Header size="huge">
            <Icon name="user" />
            <Header.Content>{this.props.username}</Header.Content>
          </Header>
          <Header size="large">
            <Header.Content>Discord: {this.props.discord}</Header.Content>
          </Header>
          {this.props.additional && (
            <Header size="medium">
              <Header.Content>
                Additional info: {this.props.additional}
              </Header.Content>
            </Header>
          )}
          <Label.Group size="large">
            {this.props.matchedUser.games.map(game => {
              if (!game.id) {
                const id = game;
                game = { id: id };
              }
              return <Label key={game.id}> {game.name}</Label>;
            })}
          </Label.Group>
          <Card.Description>{this.props.description}</Card.Description>
        </Card.Content>
        {/*
        <Button.Group attached="bottom" size="big">
          <Button positive>Accept</Button>
          <Button negative>Decline</Button>
        </Button.Group>
        */}
      </Card>
    );
  }
}
