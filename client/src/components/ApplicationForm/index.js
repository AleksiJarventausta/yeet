import React from "react";
import DescriptionBox from "./DescriptionBox";
import UserInfo from "./UserInfo";

export default class ApplicationForm extends React.Component {
  render() {
    return (
      <div>
        <UserInfo></UserInfo>
        <p>Description: </p>
        <DescriptionBox />
        <p>game search things</p>
        <button>Start searching</button>
      </div>
    );
  }
}
