import React, { Component } from "react";
import FileSaver from "file-saver";
import { Context } from "./Context";
import LeftMenu from "./classes/LeftMenu";
import Content from "./classes/Content";



export default class App extends Component {
  render() {
    return (
      <Context>
        <LeftMenu/>
        <Content/>
      </Context>
    );
  }
}
