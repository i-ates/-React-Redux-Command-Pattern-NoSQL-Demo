import React from "react";
import logo from "../assets/download.jpeg";

export default function PageHeader() {
  return (
    <>
      <div>
        <div className="w-100 pt-5 px-4 mb-4 d-flex">
          <img src={logo} className="d-inline" style={{height:100,width:100}} />
          <p
            className="text-start pl-3 align-middle mt-4 "
            style={{ fontSize: "24px" }}
          >
            Cloud Firestore
          </p>
        </div>
      </div>
      <hr className="mt-0 mx-4" />
    </>
  );
}
