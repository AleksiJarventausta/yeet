import _ from "lodash";
import React, { Component } from "react";
import { Search, Grid, Header, Segment, Form } from "semantic-ui-react";

import axios from "axios";

const initialState = { isLoading: false, results: [], value: "" };

// Testidataa
const source = [
  {
    title: "Bauch, Kihn and Schoen",
    description: "Diverse coherent archive",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/sur4dye/128.jpg",
    price: "$89.82"
  },
  {
    title: "Sawayn - Grady",
    description: "Diverse optimizing budgetary management",
    image:
      "https://s3.amazonaws.com/uifaces/faces/twitter/karthipanraj/128.jpg",
    price: "$72.69"
  },
  {
    title: "McGlynn Inc",
    description: "Seamless well-modulated success",
    image:
      "https://s3.amazonaws.com/uifaces/faces/twitter/stefanozoffoli/128.jpg",
    price: "$70.78"
  },
  {
    title: "Langosh, Lind and Langworth",
    description: "Virtual encompassing collaboration",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/silv3rgvn/128.jpg",
    price: "$69.89"
  },
  {
    title: "Bednar - Ritchie",
    description: "Versatile homogeneous firmware",
    image:
      "https://s3.amazonaws.com/uifaces/faces/twitter/chaabane_wail/128.jpg",
    price: "$20.96"
  },
  {
    title: "Kessler - Will",
    description: "Multi-layered asynchronous encryption",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/nateschulte/128.jpg",
    price: "$69.48"
  },
  {
    title: "Gerhold, Hettinger and Hahn",
    description: "Advanced background encryption",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/mahdif/128.jpg",
    price: "$47.39"
  },
  {
    title: "Nader LLC",
    description: "Optional attitude-oriented moratorium",
    image:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ChrisFarina78/128.jpg",
    price: "$0.34"
  },
  {
    title: "Stark, Bradtke and Grant",
    description: "Visionary demand-driven adapter",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/sreejithexp/128.jpg",
    price: "$94.22"
  },
  {
    title: "Conn - Kuhn",
    description: "Networked analyzing capability",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/jwalter14/128.jpg",
    price: "$27.59"
  }
];

export default class SearchExampleStandard extends Component {
  state = initialState;
  /*
  getGameList(value) {
    const list = [
      { title: "LoL" },
      { title: "WoW" },
      { title: "Counter-Strike" }
    ];
    this.setState({
      gamesList: list
    });
*/
  /*
  componentDidMount() {
    this.getGameList(this.state.value);
  }
  */

  getGameList(value) {
    const address = "/games/search";
    axios
      .post(address, { search: value })
      .then(res => {
        const data = res.data;
        console.log("haettu games data:", data);
        const list = [];
        data.map(game => {
          list.push({ title: game.name });
        });
        this.setState({
          results: list
        });
      })
      .catch(err => console.log(err));
  }

  handleResultSelect = (e, { result }) => {
    console.log("Selected:", result);
    this.setState({ value: "" });
    const list = this.props.games;
    list.push(result.title);
    this.props.listUpdated(list);
  };

  handleSearchChange = (e, { value }) => {
    console.log("handleSearchChange");
    this.getGameList(value);
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false
        /*results: _.filter(this.state.gamesList, isMatch)*/
      });
      console.log("this.state.results", this.state.results);
    }, 300);
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
              {!this.props.isSearching && (
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
