import React from "react";
import { TextArea, Button, Grid, Form } from "semantic-ui-react";

const CHAR_MAX = 255;

export default class CreatePost extends React.Component {
  constructor() {
    super();
    this.state = {
      charsLeft: CHAR_MAX
    };
  }

  state = {
    charsLeft: CHAR_MAX
  };

  componentDidMount() {}

  render() {
    //console.log("DescriptionBox props.info:", this.props.info);
    //console.log("Characters used:", this.props.info.description.length);
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Description:</label>
            <TextArea
              disabled={this.props.isSearching}
              value={this.props.info.description}
              style={{ width: "100%", minWidth: "100%", maxWidth: "100%" }}
              rows={3}
              placeholder="Write your description here..."
              onChange={(event, data) => {
                console.log("data:", data);
                if (data.value.length <= CHAR_MAX) {
                  this.setState({
                    charsLeft: CHAR_MAX - data.value.length
                  });
                  const newData = {
                    ...this.props.info,
                    description: data.value
                  };
                  console.log("newData", newData);
                  this.props.updateInfo(newData);
                }
              }}
            />
            <label>
              Characters used: {this.props.info.description.length}/{CHAR_MAX}
            </label>
          </Form.Field>
        </Form>
      </div>
    );
  }
}
