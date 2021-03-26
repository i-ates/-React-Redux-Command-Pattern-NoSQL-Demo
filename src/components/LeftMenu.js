import {useRef} from "react";
import { useDispatch } from "react-redux";
import ContextConsumer from "../contextapi/Context";

import {
  undoChange,
  redoChange,
  addCollection,
  removeCollection,
  updateCollection,
} from "../reduxState/actions";

import { Button, Row, Col } from "react-bootstrap";
import { PageHeader } from "antd";
import "./css/site.css";
import {
  FileAddOutlined,
  SyncOutlined,
  DeleteTwoTone,
  RedoOutlined,
  UndoOutlined,
  SaveOutlined,
} from "@ant-design/icons";


const LeftMenu = () => {
  const object1 = useRef();
  const object2 = useRef();

  const dispatch = useDispatch();

  const add = (trigger) => {
    let collection = JSON.parse(object1.current.value);
    trigger.addCollection(collection);
    dispatch(addCollection(collection));
  };

  const remove = (trigger) => {
    let collection = JSON.parse(object1.current.value);
    trigger.removeCollection(collection);
    dispatch(removeCollection(collection));
  };

  const update = (trigger) => {
    let collection = JSON.parse(object1.current.value);
    let collectionUpdated = JSON.parse(object2.current.value);
    trigger.updateCollection(collection, collectionUpdated);
    dispatch(updateCollection(collectionUpdated));
  };

  const undo = (trigger) => {
    let collections = trigger.undo();
    dispatch(undoChange(collections));
  };

  const redo = (trigger) => {
    let collections = trigger.redo();
    dispatch(redoChange(collections));
  };

  const commit = (trigger) => {
    trigger.commit();
  };

  return (
    <ContextConsumer>
      {(value) => {
        const { trigger } = value;
        return (
          <div style={{ marginTop: "16px", marginLeft: "16px" }}>
            <Row style={{ marginBottom: "16px", marginLeft: "0px" }}>
              <Col lg={5}>Adding Value:</Col>
              <Col>
                <input
                  type="text"
                  ref={object1}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "16px", marginLeft: "0px" }}>
              <Col lg={5}>Updated Value:</Col>
              <Col style={{ float: "left" }}>
                <input
                  type="text"
                  ref={object2}
                />
              </Col>
            </Row>

            <Row style={{ marginBottom: "16px", marginLeft: "0px" }}>
              <PageHeader
                className="site-page-header responsiveHeader"
                title="Operations"
              />
            </Row>
            <Row style={{ marginBottom: "16px", marginLeft: "0px" }}>
              <Col lg={2} style={{ marginBottom: "16px" }}>
                <Button
                  onClick={() => add(trigger)}
                  type="primary"
                  style={{ paddingBottom: "10px" }}
                >
                  <FileAddOutlined/>
                </Button>
              </Col>
              <Col lg={2} style={{ marginBottom: "16px" }}>
                <Button
                  onClick={() => remove(trigger)}
                  type="primary"
                  style={{ paddingBottom: "10px" }}
                >
                  <SyncOutlined/>
                </Button>
              </Col>
              <Col lg={2} style={{ marginBottom: "16px" }}>
                <Button
                  onClick={() => update(trigger)}
                  type="primary"
                  style={{ paddingBottom: "10px" }}
                >
                  <DeleteTwoTone/>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={2} style={{ marginBottom: "16px" }}>
                <Button
                  onClick={() => undo(trigger)}
                  type="primary"
                  style={{ paddingBottom: "10px" }}
                >
                  <UndoOutlined />
                </Button>
              </Col>
              <Col lg={2} style={{ marginBottom: "16px" }}>
                <Button
                  onClick={() => redo(trigger)}
                  type="primary"
                  style={{ paddingBottom: "10px" }}
                >
                  <RedoOutlined />
                </Button>
              </Col>
              <Col lg={2} style={{ marginBottom: "16px" }}>
                <Button
                  onClick={() => commit(trigger)}
                  type="primary"
                  style={{ paddingBottom: "10px" }}
                >
                  <SaveOutlined />
                </Button>
              </Col>
            </Row>
          </div>
        );
      }}
    </ContextConsumer>
  );
};

export default LeftMenu;
