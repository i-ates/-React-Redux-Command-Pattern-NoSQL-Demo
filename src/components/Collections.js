import { AppstoreAddOutlined, DeleteOutlined } from "@ant-design/icons";
import ContextConsumer from "../contextapi/Context";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "antd";
import { Form, Input, Row, Col } from "antd";
import { addCollection, removeCollection } from "../reduxState/actions";
import uniquid from "uniquid";
import swal from "sweetalert";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function Collections() {
  const { collections } = useSelector((state) => state.collectionReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [collectionName, setCollectionName] = useState(null);
  const [errors, setErrors] = useState({});

  const showModal = () => {
    setIsModalVisible(true);
  };

  const dispatch = useDispatch();

  const handleOk = (trigger, setUndoCommandsCount) => {
    if (isThereEror()) {
      swal({
        title: "Warning!",
        text: "All blanks must be filled.",
        icon: "warning",
        dangerMode: true,
      });
      return;
    }
    let collection = {
      id: uniquid(),
      name: collectionName,
      documents: [],
    };
    setIsModalVisible(false);
    swal({
      title: "Successfully added.",
      icon: "success",
      timer: 1500,
    }).then((isClicked) => {
      setCollectionName(null);
      trigger.addCollection(collection);
      setUndoCommandsCount(trigger.getInvoker().getUndoCommands().length);
      dispatch(addCollection(collection));
    });
  };

  const isThereEror = () => {
    try {
      let result = collectionName === null || collectionName.trim() === "";
      return result;
    } catch (err) {
      return true;
    }
  };

  const remove = (
    trigger,
    collection,
    setUndoCommandsCount,
    currCollection,
    setCollection,
    setDocument
  ) => {
    swal({
      title: "Are you sure?",
      text: "Do you really want to delete collection?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          if (collection.id === currCollection.id) {
            setDocument(undefined);
            setCollection(undefined);
          }
          trigger.removeCollection(collection);
          setUndoCommandsCount(trigger.getInvoker().getUndoCommands().length);
          dispatch(removeCollection(collection));
          await swal({
            title: "Succesfully deleted.",
            icon: "success",
            timer: 1500,
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
  };

  const onChange = (event) => {
    const { value, name } = event.target;
    const e = { ...errors };
    if (
      value.trim() === ""
        ? (e[name] = `Must be filled.`)
        : (e[name] = undefined)
    );
    setCollectionName(value);
    setErrors(e);
  };

  const handleCancel = () => {
    setCollectionName(null);
    setErrors({});
    setIsModalVisible(false);
  };
  return (
    <ContextConsumer>
      {(value) => {
        const {
          setCollection,
          trigger,
          setUndoCommandsCount,
          collection,
          setDocument,
        } = value;
        const { collectionName: collectionError } = errors;
        return (
          <div className="col-3 border border-top-0">
            <div className="p-3 bg-light border border-1">
              <div className="d-flex justify-content-between">
                Collections
                <AppstoreAddOutlined
                  className="d-flex mt-1 justify-content-end"
                  onClick={showModal}
                />
                <>
                  <Modal
                    title="Start a Collection"
                    visible={isModalVisible}
                    onOk={() => handleOk(trigger, setUndoCommandsCount)}
                    onCancel={handleCancel}
                  >
                    <Form {...layout} name="basic">
                      <Form.Item
                        label="Collection Name"
                        rules={[
                          {
                            required: true,
                            message: "Please input your collection name!",
                          },
                        ]}
                      >
                        <Input
                          className={
                            collectionError
                              ? "form-control is-invalid shadow-sm p-2"
                              : "form-control shadow-sm p-2"
                          }
                          onChange={(e) => onChange(e)}
                          name="collectionName"
                          value={collectionName}
                        />
                      </Form.Item>
                    </Form>
                  </Modal>
                </>
              </div>
            </div>
            <div style={{ overflow: "auto", height: "540px" }}>
              {collections &&
                collections.map((singleCollection) => {
                  return (
                    <>
                      <Row
                        className="p-1"
                        style={{
                          backgroundColor:
                            collection &&
                            collection?.id === singleCollection?.id
                              ? "#EFEFF1"
                              : null,
                          marginBottom: 5,
                        }}
                      >
                        <Col md={16}>
                          <div
                            key={singleCollection.id}
                            onClick={() =>
                              setCollection({
                                id: singleCollection.id,
                                name: singleCollection.name,
                              })
                            }
                            className="p-2"
                            style={{ cursor: "pointer" }}
                          >
                            {singleCollection.name}
                          </div>
                        </Col>
                        <Col md={4} offset={4}>
                          <div
                            onClick={() =>
                              remove(
                                trigger,
                                singleCollection,
                                setUndoCommandsCount,
                                collection,
                                setCollection,
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
                })}
            </div>
          </div>
        );
      }}
    </ContextConsumer>
  );
}
