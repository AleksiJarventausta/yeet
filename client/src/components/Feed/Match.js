import React from "react";
import { Grid, Divider, Label, Card, Header, Icon, Button, Container } from "semantic-ui-react";

export default class Match extends React.Component {
  state = {
    matched: false
  };

  gameItems = this.props.games.map(game => {
    return <Label> {game + " "}</Label>;
  });

  render() {
  return (
    <Card fluid>
      <Card.Content>
        <Header size="medium">
          <Icon name="user"/>
          <Header.Content>{this.props.username}</Header.Content>
        </Header>
        You share interest in these games:
        <Container>{this.gameItems}</Container>
        <Card.Description>{this.props.description}</Card.Description>
      </Card.Content>

      <Card.Content extra>

          {/* Nimi vasemmalle, Buttonit oikealle */}
          <Button positive>
            Accept
          </Button>
          <Button negative>
            Decline
          </Button>
      </Card.Content>
    </Card>
  );
}
}
