import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { PageHeader } from "antd";
import "../css/site.css";
import {
  FileAddOutlined,
  SyncOutlined,
  DeleteTwoTone,
  RedoOutlined,
  UndoOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import RowConsumer from "../Context";

class LeftMenu extends React.Component {
  addElement = (dispatch, trigger, e) => {
    trigger.addElement(this.state.object);
    dispatch({ type: "ADD_DOCUMENT", payload: { nextRow: this.state.object } });
  };

  removeElement = (dispatch, trigger, e) => {
    trigger.removeElement(this.state.object);
    dispatch({
      type: "REMOVE_DOCUMENT",
      payload: { prevRow: this.state.object },
    });
  };

  updateElement = (dispatch, trigger, e) => {
    trigger.updateElement(this.state.object, this.state.object2);
    dispatch({
      type: "UPDATE_DOCUMENT",
      payload: { nexRow: this.state.object2 },
    });
  };

  undo = (dispatch, trigger, e) => {
    let rows = trigger.undo();
    dispatch({ type: "UNDO", payload: { undoRowList: rows } });
  };

  redo = (dispatch, trigger, e) => {
    let rows = trigger.redo();
    dispatch({ type: "REDO", payload: { redoRowList: rows } });
  };

  commit = (trigger, e) => {
    trigger.commit();
  };

  render() {
    return (
      <RowConsumer>
        {(value) => {
          const { dispatch, trigger ,rows} = value;
          return (
            <div style={{ marginTop: "16px", marginLeft: "16px" }}>
              <Row style={{ marginBottom: "16px", marginLeft: "0px" }}>
                <Col lg={5}>Adding Value:</Col>
                <Col>
                  <input
                    type="text"
                    name="object"
                    onChange={(e) =>
                      this.setState({
                        [e.target.name]: JSON.parse(e.target.value),
                      })
                    }
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "16px", marginLeft: "0px" }}>
                <Col lg={5}>Updated Value:</Col>
                <Col style={{ float: "left" }}>
                  <input
                    type="text"
                    name="object2"
                    onChange={(e) =>
                      this.setState({
                        [e.target.name]: JSON.parse(e.target.value),
                      })
                    }
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
                  <Button onClick={this.addElement.bind(this, dispatch,trigger)} type="primary" style={{ paddingBottom: "10px" }}>
                    <FileAddOutlined />
                  </Button>
                </Col>
                <Col lg={2} style={{ marginBottom: "16px" }}>
                  <Button onClick={this.removeElement.bind(this, dispatch,trigger)} type="primary" style={{ paddingBottom: "10px" }}>
                    <SyncOutlined />
                  </Button>
                </Col>
                <Col lg={2} style={{ marginBottom: "16px" }}>
                  <Button onClick={this.updateElement.bind(this, dispatch,trigger)} type="primary" style={{ paddingBottom: "10px" }}>
                    <DeleteTwoTone twoToneColor="#fff" />
                  </Button>
                </Col>
                <Col lg={2} style={{ marginBottom: "16px" }}>
                  <Button onClick={this.undo.bind(this,dispatch,trigger)} type="primary" style={{ paddingBottom: "10px" }}>
                    <UndoOutlined />
                  </Button>
                </Col>
                <Col lg={2} style={{ marginBottom: "16px" }}>
                  <Button onClick={this.redo.bind(this,dispatch,trigger)} type="primary" style={{ paddingBottom: "10px" }}>
                    <RedoOutlined />
                  </Button>
                </Col>
                <Col lg={2} style={{ marginBottom: "16px" }}>
                  <Button onClick={this.commit.bind(this,trigger)} type="primary" style={{ paddingBottom: "10px" }}>
                    <SaveOutlined />
                  </Button>
                </Col>
              </Row>


              <div style={{marginTop: "16px", marginLeft: "16px"}}>
                        <Row style={{marginBottom: "16px", marginLeft: "0px"}}>
                            <PageHeader
                                className="site-page-header"
                                title="Pretty Formatter"
                                subTitle=""
                                style={{width: 'calc(100% - 48px)'}}
                            />
                        </Row>
                        <Row style={{marginBottom: "16px", marginLeft: "0px",width: 'calc(100% - 48px)'}}>
                            <Col lg={3} style={{paddingLeft: "0px"}}>
                                <Row style={{marginBottom: "16px", marginLeft: "0px"}}>
                                    <PageHeader
                                        className="site-page-header"
                                        title="Inputs"
                                        subTitle=""
                                        style={{width: '100%'}}
                                    />
                                </Row>
                            </Col>
                            <Col lg={9} style={{paddingRight: "0px"}}>
                                <Row style={{marginBottom: "16px", marginLeft: "0px"}}>
                                    <PageHeader
                                        className="site-page-header"
                                        title="Data"
                                        subTitle=""
                                        style={{width: '100%'}}
                                    />
                                </Row>
                                <Row style={{marginBottom: "16px", marginLeft: "0px", border:"1px solid rgb(235, 237, 240)", padding: "16px"}}>
                                    {rows &&
                                       rows.map((row) => <div key={row.id}>{JSON.stringify(row)}</div>)}
                                </Row>
                            </Col>
                        </Row>
                    </div>

            </div>
          );
        }}
      </RowConsumer>
    );
  }
}
export default LeftMenu;
