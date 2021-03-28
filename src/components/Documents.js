import React, { Component } from "react";
import { AppstoreAddOutlined } from "@ant-design/icons";
import ContextConsumer from "../contextapi/Context";
import {useSelector} from "react-redux";

export default function Documents() {
  const { collections } = useSelector((state) => state.collectionReducer);
  return (
      <ContextConsumer>
        {(value) => {
          const { setDocument, collection } = value;
          let currCollection = undefined;
          if(collection != undefined) {
            currCollection = collections.filter(c => {
              return c.id === collection.id
            })[0];
          }
          return (
              <div className="col-4 border border-top-0">
                <div className="p-3 bg-light border border-1">
                  <div className="d-flex justify-content-between">
                    Documents
                    <AppstoreAddOutlined className="d-flex mt-1 justify-content-end" />
                  </div>
                </div>
                <div>
                  {
                    currCollection && currCollection.documents && currCollection.documents.map(document => {
                      return(
                          <div key={document.id} onClick={() => setDocument({id: document.id, name: document.name})} className="p-2">
                            {document.name}
                          </div>
                      );
                    })
                  }
                </div>
              </div>
          );
        }}
      </ContextConsumer>
  );
}
