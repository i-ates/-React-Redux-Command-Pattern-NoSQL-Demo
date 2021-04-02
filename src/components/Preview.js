import { AppstoreAddOutlined } from "@ant-design/icons";
import ContextConsumer from "../contextapi/Context";
import { useSelector } from "react-redux";
import obj2xml from "../helper/obj2xml";

import XMLViewer from "react-xml-viewer";
import ReactJson from "react-json-view";
import { useState } from "react";
import { JsonEditor } from "react-json-edit";

export default function Preview() {
  const { collections } = useSelector((state) => state.collectionReducer);
  const customTheme = {
    attributeKeyColor: "#FF0000",
    attributeValueColor: "#461634",
  };
  const isModalVisible = useState(false);

  return (
    <ContextConsumer>
      {(value) => {
        const { document, collection, isJSON } = value;
        let currDocument;
        if (collection !== undefined && document !== undefined) {
          currDocument = collections
            .filter((c) => {
              return c.id === collection.id;
            })[0]
            ?.documents.filter((d) => {
              return d.id === document.id;
            })[0];
        }
        return (
          <div className="col-4 border border-top-0">
            <div className="p-3 bg-light border border-1">
              <div className="d-flex justify-content-between">
                Content
                <AppstoreAddOutlined
                  className="d-flex mt-1 justify-content-end"
                  //onClick={() => updateContent()}
                />
              </div>
            </div>
            <div className="p-3 ">
              {currDocument ? (
                isJSON ? (
                  <JsonEditor
                    className="bg-light"
                    style={{ border: "none" }}
                    tableLike={true}
                    value={currDocument}
                  />
                ) : (
                  //<ReactJson src={currDocument} />
                  <XMLViewer
                    xml={obj2xml(currDocument)}
                    theme={customTheme}
                    indentSize={6}
                    collapsible={true}
                  />
                )
              ) : null}
            </div>
          </div>
        );
      }}
    </ContextConsumer>
  );
}
