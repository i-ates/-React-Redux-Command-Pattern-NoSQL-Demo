import React, { Component } from "react";
import FileSaver from 'file-saver';
import 'antd/dist/antd.css';
import { Context } from "./Context";
import LeftMenu from "./classes/LeftMenu";

export default class App extends Component {

  render() {
    return (
      <Context>
          <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
              integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
              crossOrigin="anonymous"
          />
        <LeftMenu/>
      </Context>
    );
  }
}
