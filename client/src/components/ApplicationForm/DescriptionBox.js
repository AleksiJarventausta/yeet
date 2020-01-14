import React from "react";
import { TextArea, Form } from "semantic-ui-react";

// Maximum numbers ofcharacters the user can use
// on his/hers description
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

  render() {
    //console.log("descriptionbox this.props.info:", this.props.info);
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Description:</label>
            <TextArea
              disabled={this.props.issearching}
              value={this.props.info.description}
              style={{ width: "100%", minWidth: "100%", maxWidth: "100%" }}
              rows={3}
              placeholder="Write your description here..."
              onChange={(event, data) => {
                if (data.value.length <= CHAR_MAX) {
                  this.setState({
                    charsLeft: CHAR_MAX - data.value.length
                  });
                  const newData = {
                    ...this.props.info,
                    description: data.value
                  };

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
