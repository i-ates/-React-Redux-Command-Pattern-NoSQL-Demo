import { HomeOutlined } from "@ant-design/icons";
import React from "react";

export default function ContentHeader() {
  return (
    <div className="row justify-content-start p-3 bg-light no-gutters border rounded border-1">
      <HomeOutlined className="mr-3 mt-1" /> {"> users > asdqweqw"}
    </div>
  );
}
