import React from "react";
import DescriptionBox from "./DescriptionBox";
import UserInfo from "./UserInfo";
import SearchBar from "./SearchBar";
import Games from "./Games";
import { Button, Icon, Message, Header } from "semantic-ui-react";
import { green, red } from "@material-ui/core/colors";
import axios from "axios";

// TODO: Laita tämä käyttämään App.js:n tilaa isSearching eikä omaa paskakikkaretta

export default class ApplicationForm extends React.Component {
  state = {
    isSearching: false,
    info: {
      games: [],
      username: "",
      discord: "",
      additional: "",
      description: ""
    },
    color: this.props.styles.positiveColor,
    text: "Start searching"
  };

  getUserInfo() {
    const items = [];
    axios
      .get("/post")
      .then(res => {
        const data = res.data;
        console.log("haettu userinfo data:", data);
        this.setState({
          info: {
            games: data.games,
            username: "placeholder user",
            discord: "ph nickname#1234",
            additional: "ph MTGA username#4321",
            description: data.description
          }
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    // Fetch data from backend

    if (this.state.info.username === "") {
      this.getUserInfo();
    }

    /* Test data
    this.setState({
      info: {
        games: ["This", "That"],
        username: "user",
        discord: "nickname#1234",
        additional: "MTGA username#4321",
        description: "I am a gamer."
      }
    }); */
  }

  updateState(data) {
    console.log("updated state");
    this.setState(prevState => ({
      info: {
        ...prevState.info,
        username: data.username,
        discord: data.discord,
        additional: data.additional,
        description: data.description
      }
    }));
  }

  gameslistUpdated(updatedList) {
    // Ei niin mitään lupausta että toi staten päivittäminen toimii
    this.setState(prevState => ({
      info: {
        ...prevState.info,
        games: updatedList
      }
    }));
  }

  sendNewPost(searchState) {
    const data = {
      description: "apua", // TODO: hanki tähän kaikki tarvittavat tiedot
      active: searchState
    };
    axios
      .post("/post/search", data)
      .then(res => console.log("Uusi hakemus tehty", data, res))
      .catch(err => console.log(err));
  }

  whenClicked() {
    this.props.clicked();
    const current = this.state.isSearching;
    if (!this.state.isSearching) {
      this.setState({
        color: this.props.styles.negativeColor,
        text: "Stop searching"
      });
      this.sendNewPost(!current);
    } else {
      this.setState({
        color: this.props.styles.positiveColor,
        text: "Start searching"
      });
      this.sendNewPost(!current);
    }
    this.setState({ isSearching: !current });
    console.log("Clicked!");
  }

  render() {
    return (
      <div>
        <Header as="h2">Your application form</Header>
        <Message>
          <UserInfo
            updateInfo={this.updateState.bind(this)}
            info={this.state.info}
          ></UserInfo>
          <div>
            <br />
          </div>
          <DescriptionBox
            updateInfo={this.updateState.bind(this)}
            info={this.state.info}
          />
          <br />
          <SearchBar
            games={this.state.info.games}
            listUpdated={this.gameslistUpdated.bind(this)}
          />
          <br />
          <Games
            games={this.state.info.games}
            listUpdated={this.gameslistUpdated.bind(this)}
          />
          <br />
        </Message>
        <div className="centered">
          <Button onClick={() => this.whenClicked()} color={this.state.color}>
            {this.state.isSearching && <Icon name="pause" />}
            {this.state.text}
            {!this.state.isSearching && <Icon name="right arrow icon" />}
          </Button>
        </div>
      </div>
    );
  }
}
