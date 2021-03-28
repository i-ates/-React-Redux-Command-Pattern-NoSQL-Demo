import { HomeOutlined } from "@ant-design/icons";
import React from "react";
import ContextConsumer from "../contextapi/Context";

export default function ContentHeader() {
  return (
    <ContextConsumer>
      {(value) => {
        const {document,collection} = value;
        return (
          <div className="row justify-content-start p-3 bg-light no-gutters border rounded border-1">
            <HomeOutlined className="mr-3 mt-1" /> {collection && collection.name !== undefined ? collection.name : ""}{document && document.name !== undefined ? ` > ${document.name}` : ""}
          </div>
        );
      }}
    </ContextConsumer>
  );
}
