import { AppstoreAddOutlined, DeleteOutlined } from "@ant-design/icons";
import ContextConsumer from "../contextapi/Context";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import uniquid from "uniquid";
import { updateCollection } from "../reduxState/actions";
import swal from "sweetalert";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
export default function Documents() {
  const { collections } = useSelector((state) => state.collectionReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [documentName, setDocumentName] = useState(null);
  const [errors, setErrors] = useState({});

  const showModal = () => {
    setIsModalVisible(true);
  };

  const dispatch = useDispatch();

  const handleOk = (
    trigger,
    setUndoCommandsCount,
    setRedoCommandsCount,
    oldCollection
  ) => {
    if (isThereEror()) {
      swal({
        title: "Warning!",
        text: "All blanks must be filled.",
        icon: "warning",
        dangerMode: true,
      });
      return;
    }
    let document = {
      id: uniquid(),
      name: documentName,
      content: {},
    };
    setIsModalVisible(false);
    swal({ title: "Successfully added.", icon: "success", timer: 1500 }).then(
      (isClicked) => {
        setDocumentName(null);
        let collection = {
          id: oldCollection.id,
          name: oldCollection.name,
          documents: oldCollection.documents,
        };
        collection.documents = [...collection.documents, document];
        trigger.updateCollection(oldCollection, collection);
        setUndoCommandsCount(trigger.getInvoker().getUndoCommands().length);
        setRedoCommandsCount(trigger.getInvoker().getRedoCommands().length);
        dispatch(updateCollection(collection));
      }
    );
  };
  const remove = (
    trigger,
    setUndoCommandsCount,
    setRedoCommandsCount,
    oldCollection,
    documentId,
    document,
    setDocument
  ) => {
    
    swal({
			title: "Are you sure?",
			text: "Do you really want to delete document?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then(async (willDelete) => {
			if (willDelete) {
				try {
					await swal({
						title: "Succesfully deleted.",
						icon: "success",
            timer: 1500
					});
					let collection = {
            id: oldCollection.id,
            name: oldCollection.name,
            documents: oldCollection.documents,
          };
          collection.documents = [
            ...collection.documents.filter((d) => d.id !== documentId),
          ];
          trigger.updateCollection(oldCollection, collection);
          setUndoCommandsCount(trigger.getInvoker().getUndoCommands().length);
          setRedoCommandsCount(trigger.getInvoker().getRedoCommands().length);
          dispatch(updateCollection(collection));
          if(documentId === document.id){
            setDocument(undefined);
          }
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
  };
  const handleCancel = () => {
    setDocumentName(null);
    setErrors({});
    setIsModalVisible(false);
  };
  const onChange = (event) => {
    const { value, name } = event.target;
    const e = {
      ...errors,
    };
    value.trim() === "" ? (e[name] = `Must be filled.`) : (e[name] = undefined);
    setDocumentName(value);
    setErrors(e);
  };
  const isThereEror = () => {
    try {
      let result = documentName === null || documentName.trim() === "";
      return result;
    } catch (err) {
      return true;
    }
  };
  return (
    <ContextConsumer>
      {(value) => {
        const {
          setDocument,
          collection,
          trigger,
          setUndoCommandsCount,
          setRedoCommandsCount,
          document,
        } = value;
        let currCollection = undefined;
        if (collection !== undefined) {
          currCollection = collections.filter((c) => {
            return c.id === collection.id;
          })[0];
        }
        const { documentName: documentError } = errors;
        return (
          <div className="col-3 border border-top-0">
            <div className="p-3 bg-light border border-1">
              <div className="d-flex justify-content-between">
                Documents{" "}
                {currCollection && (
                  <>
                    <AppstoreAddOutlined
                      className="d-flex mt-1 justify-content-end"
                      onClick={showModal}
                    />
                    <>
                      <Modal
                        title="Add a Document"
                        visible={isModalVisible}
                        onOk={() =>
                          handleOk(
                            trigger,
                            setUndoCommandsCount,
                            setRedoCommandsCount,
                            currCollection
                          )
                        }
                        onCancel={handleCancel}
                      >
                        <Form {...layout} name="basic">
                          <Form.Item
                            label="Document Name"
                            rules={[
                              {
                                required: true,
                                message: "Please input your document name!",
                              },
                            ]}
                          >
                            <Input
                              className={
                                documentError
                                  ? "form-control is-invalid shadow p-2"
                                  : "form-control shadow p-2"
                              }
                              onChange={(e) => onChange(e)}
                              name="documentName"
                              value={documentName}
                            />
                          </Form.Item>
                        </Form>
                      </Modal>
                    </>
                  </>
                )}{" "}
              </div>
            </div>
            <div
              style={{
                overflow: "auto",
                height: "540px",
              }}
            >
              {currCollection &&
                currCollection.documents &&
                currCollection.documents.map((singleDocument) => {
                  return (
                    <>
                      <Row
                        className="p-1"
                        style={{
                          backgroundColor:
                            document && document?.id === singleDocument?.id
                              ? "#EFEFF1"
                              : null,
                          marginBottom: 5,
                        }}
                      >
                        <Col md={16}>
                          <div
                            key={singleDocument.id}
                            onClick={() =>
                              setDocument({
                                id: singleDocument.id,
                                name: singleDocument.name,
                              })
                            }
                            className="p-2"
                            style={{ cursor: "pointer" }}
                          >
                            {singleDocument.name}{" "}
                          </div>
                        </Col>
                        <Col md={4} offset={4}>
                          <div
                            onClick={() =>
                              remove(
                                trigger,
                                setUndoCommandsCount,
                                setRedoCommandsCount,
                                currCollection,
                                singleDocument.id,
                                document,
                                setDocument
                              )
                            }
                            className="p-2 d-flex justify-content-end"
                            style={{ cursor: "pointer" }}
                          >
                            <DeleteOutlined />
                          </div>
                        </Col>
                      </Row>
                    </>
                  );
                })}{" "}
            </div>
          </div>
        );
      }}
    </ContextConsumer>
  );
}
