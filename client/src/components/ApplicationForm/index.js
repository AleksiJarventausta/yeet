import React from "react";
import DescriptionBox from "./DescriptionBox";

export default class ApplicationForm extends React.Component {
  render() {
    return (
      <div>
        <p>description: </p>
        <DescriptionBox />
        <p>game search things</p>
      </div>
    );
  }
}
