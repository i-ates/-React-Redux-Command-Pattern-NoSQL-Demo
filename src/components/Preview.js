import React, { Component } from "react";
import { AppstoreAddOutlined } from "@ant-design/icons";

export default class Preview extends Component {
  render() {
    return (
      <div className="col-4 border border-top-0">
        <div className="p-3 bg-light border border-1">
          <div className="d-flex justify-content-between">
            Content
            <AppstoreAddOutlined className="d-flex mt-1 justify-content-end" />
          </div>
        </div>
      </div>
    );
  }
}
