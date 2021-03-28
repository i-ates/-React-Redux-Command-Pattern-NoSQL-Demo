import { AppstoreAddOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import ContextConsumer from "../contextapi/Context";

export default class Collections extends Component {
  render() {
    return (
      <ContextConsumer>
        {(value) => {
          const { setCollection } = value;
          return (
            <div className="col-4 border border-top-0">
              <div className="p-3 bg-light border border-1">
                <div className="d-flex justify-content-between">
                  Collections
                  <AppstoreAddOutlined className="d-flex mt-1 justify-content-end" />
                </div>
              </div>
              <div onClick={() => setCollection("DENEME")} className="p-2">
                {"DENEME"}
              </div>
            </div>
          );
        }}
      </ContextConsumer>
    );
  }
}
