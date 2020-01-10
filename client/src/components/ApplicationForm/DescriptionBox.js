import React from "react";
import { TextArea, Button, Grid, Form } from "semantic-ui-react";

const CHAR_MAX = 255;

export default class CreatePost extends React.Component {
  state = {
    description: "",
    charsLeft: CHAR_MAX
  };

  render() {
    return (
      <div>
        <span>Description: </span>
        <Form>
          <TextArea
            style={{ width: "100%", minWidth: "100%", maxWidth: "100%" }}
            rows={3}
            placeholder="Write your description here..."
            onChange={(event, data) => {
              if (data.value.length <= CHAR_MAX) {
                this.setState({
                  description: data.value,
                  charsLeft: CHAR_MAX - data.value.length
                });
                //console.log("state vaihdettu");
              }
            }}
            value={this.state.description}
          />
        </Form>
        <span>
          Characters used: {CHAR_MAX - this.state.charsLeft}/{CHAR_MAX}
        </span>
      </div>
    );
  }
}

/* A PU A
export default class DescriptionBox extends React.Component {
  state = {
    description: "",
    isTooLong: false
  };

  render() {
    return (
      <div>
        <Form>
          <TextArea
            placeholder="Write your description here"
            style={{ width: "100%", minWidth: "100%", maxWidth: "100%" }}
            rows={3}
            onChange={(event, data) => {
              if (data.value.length <= CHAR_MAX) {
                this.setState({
                  description: data.value,
                  isTooLong: false
                });
              } else {
                this.setState({
                  description: data.value,
                  isTooLong: true
                });
              }
            }}
            value={this.state.description}
          />
        </Form>
      </div>
    );
  }
}
*/
