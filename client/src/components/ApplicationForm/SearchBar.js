import _ from "lodash";
import React, { Component } from "react";
import { Search, Grid, Form } from "semantic-ui-react";

import axios from "axios";

const initialState = { isLoading: false, results: [], value: "" };
const CancelToken = axios.CancelToken;
let cancel;

export default class SearchExampleStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // Get list of games from the backend and put in in state.
  // The gamelist should contain games matching the given parameter.
  getGameList(value) {
    const address = "/games/search";
    if(cancel !== undefined) {
      cancel();
    }
    axios
      .post(address, { search: value }, {cancelToken: new CancelToken(function executor(c)
        {
          cancel = c;
        })
      })
      .then(res => {
        const data = res.data;
        console.log("Haettiin pelit:", data);

        let list = data.map(game => {
          return { title: game.name, id: game.id };
        });
        this.setState({
          results: list
        });
      })
      .catch(err => console.log(err));
  }

  // Execute when user clicks a game.
  // Update gamelist in upper levers components.
  handleResultSelect = (e, { result }) => {
    //console.log("Added game:", result);
    this.setState({ value: "" });
    const list = this.props.info.games;
    list.push({ name: result.title, title: result.title, id: result.id });
    const newData = {
      ...this.props.info,
      games: list
    };
    this.props.updateInfo(newData);
    axios
      .post("/post/addgame", { _id: result.id })
      .then(res => {
        console.log("Added game", result.title, res);
      })
      .catch(err => console.log(err));
  };

  // Fetch new gamelist matching the given keyword and put in state.
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      this.getGameList(value);
      this.setState({
        isLoading: false
      });
    }, 400);
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Grid>
        <Grid.Column>
          <Form>
            <Form.Field>
              <label>Search games:</label>
            </Form.Field>
            <Form.Field>
              {!this.props.issearching && (
                <Search
                  fluid
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true
                  })}
                  results={results}
                  value={value}
                  {...this.props}
                />
              )}
            </Form.Field>
          </Form>
        </Grid.Column>
        {/* ___For debugging purposes only___
        <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: "auto" }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: "auto" }}>
              {JSON.stringify(source, null, 2)}
            </pre>
          </Segment>
        </Grid.Column>
        */}
      </Grid>
    );
  }
}
