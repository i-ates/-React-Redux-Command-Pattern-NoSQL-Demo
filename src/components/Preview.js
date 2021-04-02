import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import ContextConsumer from "../contextapi/Context";
import { useSelector, useDispatch } from "react-redux";
import obj2xml from "../helper/obj2xml";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import XMLViewer from "react-xml-viewer";
import ReactJson from "react-json-view";
import { useState, useEffect } from "react";
import { updateCollection } from "../reduxState/actions";
import swal from "sweetalert";

export default function Preview() {
  const { collections } = useSelector((state) => state.collectionReducer);
  const customTheme = {
    attributeKeyColor: "#FF0000",
    attributeValueColor: "#461634",
  };
  const [currentDocument, setCurrentDocument] = useState(null);
  const [editState, setEditState] = useState(false);
  const [updatedDocument, setUpdatedDocument] = useState({});

  const dispatch = useDispatch();

  function editButtonPressed() {
    setEditState(!editState);
    setUpdatedDocument(null);
  }

  useEffect(() => {
    setEditState(false);
    setUpdatedDocument(null);
  }, [currentDocument]);

  function handleOk(
    trigger,
    setUndoCommandsCount,
    setRedoCommandsCount,
    collections,
    collection
  ) {
    
    swal({
      title: "Are you sure?",
      text: "Do you really want to save your changes?",
      icon: "warning",
      buttons: true,
      dangerMode: false,
      
    }).then(async (willUpdate) => {
      if (willUpdate) {
        try {
          let oldCollection = collections.filter((c) => {
            return c.id === collection.id;
          })[0];
      
          let newCollection = { ...oldCollection };
          let count = 0;
          newCollection.documents.forEach((d, index) => {
            if (d.id === updatedDocument.id) {
              count = index;
            }
          });
          newCollection.documents = [...oldCollection.documents];
          newCollection.documents.splice(count, 1, updatedDocument);
      
          trigger.updateCollection(oldCollection, newCollection);
          setUndoCommandsCount(trigger.getInvoker().getUndoCommands().length);
          setRedoCommandsCount(trigger.getInvoker().getRedoCommands().length);
          dispatch(updateCollection(newCollection));
          editButtonPressed();
          
          await swal({
            title: "Succesfully document updated.",
            icon: "success",
            timer: 1000,
          });
        } catch (error) {
          swal({
            title: "Warning!",
            text: "Something went wrong.",
            icon: "warning",
            dangerMode: true,
          });
        }
      }
    });
    



    
  }

  function updateContent(e) {
    setUpdatedDocument(e);
  }
  function closeEdit(){
    swal({
      title: "Are you sure?",
      text: "Do you really want to discard your changes?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (discardChanges) => {
      if (discardChanges) {
        try {
          editButtonPressed()
        } catch (error) {
          swal({
            title: "Warning!",
            text: "Something went wrong.",
            icon: "warning",
            dangerMode: true,
          });
        }
      }
    });
  }

  return (
    <ContextConsumer>
      {(value) => {
        const {
          document,
          collection,
          isJSON,
          trigger,
          setUndoCommandsCount,
          setRedoCommandsCount,
        } = value;

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
        setCurrentDocument(document);
        return (
          <div className="col-6 border border-top-0">
            <div className="p-3 bg-light border border-1">
              <div className="d-flex justify-content-between">
                Content
                <div className="row mr-2">
                  {updatedDocument?.content && (
                    <div className="row mr-2">
                      <CloseOutlined
                        className="d-flex mt-1 justify-content-end mr-2"
                        onClick={() => closeEdit()}
                      />
                      <CheckOutlined
                        className="d-flex mt-1 justify-content-end "
                        onClick={() =>
                          handleOk(
                            trigger,
                            setUndoCommandsCount,
                            setRedoCommandsCount,
                            collections,
                            collection
                          )
                        }
                      />
                    </div>
                  )}
                  {!updatedDocument?.content && (
                    <div className="row mr-2">
                      {editState && (
                        <CloseOutlined
                          className="d-flex mt-1 justify-content-end mr-2"
                          onClick={() => closeEdit()}
                        />
                      )}
                      {!editState && (
                        <EditOutlined
                          className="d-flex mt-1 justify-content-end "
                          onClick={() => editButtonPressed()}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={!editState ? "p-3 " : undefined}>
              {currDocument ? (
                editState ? (
                  <div>
                    <Editor value={currDocument} onChange={updateContent} />
                  </div>
                ) : isJSON ? (
                  <ReactJson src={currDocument} />
                ) : (
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
