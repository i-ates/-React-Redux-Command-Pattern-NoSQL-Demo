import React, { Component } from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {ContextProvider} from "./contextapi/Context";
import allReducers from "./reduxState/reducers"
import "antd/dist/antd.css";
import LeftMenu from "./components/LeftMenu";
import Content from "./components/Content";

const store = createStore(allReducers,window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__());

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ContextProvider>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
            crossOrigin="anonymous"
          />
          <LeftMenu/>
          <Content/>
        </ContextProvider>
      </Provider>
    );
  }
}
