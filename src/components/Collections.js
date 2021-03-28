import {AppstoreAddOutlined, DeleteOutlined} from "@ant-design/icons";
import ContextConsumer from "../contextapi/Context";
import {useDispatch, useSelector} from "react-redux";
import { useState} from "react";
import { Modal } from 'antd';
import { Form, Input, Row, Col} from 'antd';
import {addCollection, removeCollection} from "../reduxState/actions";
import uniquid from "uniquid";
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export default function Collections() {
  const { collections } = useSelector((state) => state.collectionReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [input, setInput] = useState("");

  const showModal = () => {
        setIsModalVisible(true);
  };

  const dispatch = useDispatch();

  const handleOk = (trigger,setUndoCommandsCount) => {
      let collection = {
          id: uniquid(),
          name: input,
          documents: []
      };
      setInput("");
      trigger.addCollection(collection);
      setUndoCommandsCount(trigger.getInvoker().getUndoCommands().length)
      dispatch(addCollection(collection));
      setIsModalVisible(false);
  };

  const remove = (trigger,collection,setUndoCommandsCount) => {
      trigger.removeCollection(collection);
      setUndoCommandsCount(trigger.getInvoker().getUndoCommands().length)
      dispatch(removeCollection(collection));
  };

  const handleCancel = () => {
      setInput("");
      setIsModalVisible(false);
  };
  return (
      <ContextConsumer>
        {(value) => {
          const { setCollection, trigger,setUndoCommandsCount, collection} = value;
          return (
              <div className="col-4 border border-top-0">
                <div className="p-3 bg-light border border-1">
                  <div className="d-flex justify-content-between">
                    Collections
                    <AppstoreAddOutlined className="d-flex mt-1 justify-content-end" onClick={showModal} />
                      <>
                          <Modal title="Start a Collection" visible={isModalVisible} onOk={() => handleOk(trigger,setUndoCommandsCount)} onCancel={handleCancel}>
                              <Form
                                  {...layout}
                                  name="basic"
                              >
                                  <Form.Item
                                      label="Collection Name"
                                      rules={[{ required: true, message: 'Please input your collection name!' }]}
                                  >
                                      <Input onChange={(e) => {setInput(e.target.value)}} value={input} />
                                  </Form.Item>
                              </Form>
                          </Modal>
                      </>
                  </div>
                </div>
                <div style={{overflow:"auto", height: "540px"}}>
                  {
                    collections && collections.map(singleCollection => {
                      return(
                          <>
                            <Row className="p-1" style={{backgroundColor:collection && collection?.id == singleCollection?.id ? '#EFEFF1' : null,marginTop:5,marginBottom:5}} >
                              <Col md={16}>
                                <div key={singleCollection.id} onClick={() => setCollection({id: singleCollection.id, name: singleCollection.name})} className="p-2" style={{cursor: "pointer"}}>
                                  {singleCollection.name}
                                </div>
                              </Col>
                              <Col md={4} offset={4} >
                                <div onClick={() => remove(trigger,singleCollection,setUndoCommandsCount)} className="p-2 d-flex justify-content-end" style={{cursor: "pointer"}}>
                                  <DeleteOutlined />
                                </div>
                              </Col>
                            </Row>
                          </>
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
