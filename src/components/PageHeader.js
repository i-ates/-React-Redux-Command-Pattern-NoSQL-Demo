import React from "react";
import logo from "../assets/download.jpeg";

export default function PageHeader() {
  return (
    <>
      <div className="w-100 pt-4 px-4 d-flex">
        <img src={logo} style={{ height: 120, width: 120 }} />
        <p
          className="text-start pl-3 align-middle mt-4 "
          style={{ fontSize: "24px" }}
        >
          Local Firestore
          <figure style={{fontSize:"14px"}}>
            <blockquote className="blockquote">
              <p style={{fontFamily: 'Courier New monospace'}}>NoSQL Database Demo</p>
            </blockquote>
            <figcaption className="blockquote-footer ">
              Copyright © Üzümlü Kek 2021. All rights reserved.
            </figcaption>
          </figure>
        </p>
      </div>
      <hr className="mt-0 mx-4" />
    </>
  );
}
