import {AppstoreAddOutlined, DeleteOutlined} from "@ant-design/icons";
import ContextConsumer from "../contextapi/Context";
import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";
import { Modal } from 'antd';
import { Form, Input, Row, Col} from 'antd';
import {addCollection, removeCollection} from "../reduxState/actions";
import uniquid from "uniquid";
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function Collections() {
  const { collections } = useSelector((state) => state.collectionReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [input, setInput] = useState("");

  const showModal = () => {
        setIsModalVisible(true);
  };

  const dispatch = useDispatch();

  const handleOk = (trigger) => {
      let collection = {
          id: uniquid(),
          name: input,
          documents: []
      };
      setInput("");
      trigger.addCollection(collection);
      dispatch(addCollection(collection));
      setIsModalVisible(false);
  };

  const remove = (trigger,collection) => {
      trigger.removeCollection(collection);
      dispatch(removeCollection(collection));
  };

  const handleCancel = () => {
      setInput("");
      setIsModalVisible(false);
  };
  return (
      <ContextConsumer>
        {(value) => {
          const { setCollection, trigger } = value;
          return (
              <div className="col-4 border border-top-0">
                <div className="p-3 bg-light border border-1">
                  <div className="d-flex justify-content-between">
                    Collections
                    <AppstoreAddOutlined className="d-flex mt-1 justify-content-end" onClick={showModal} />
                      <>
                          <Modal title="Basic Modal" visible={isModalVisible} onOk={() => handleOk(trigger)} onCancel={handleCancel}>
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
                <div>
                  {
                    collections && collections.map(collection => {
                      return(
                          <>
                              <Row>
                                  <Col md={16}>
                                      <div key={collection.id} onClick={() => setCollection({id: collection.id, name: collection.name})} className="p-2" style={{cursor: "pointer"}}>
                                          {collection.name}
                                      </div>
                                  </Col>
                                  <Col md={4} offset={4}>
                                      <div onClick={() => remove(trigger,collection)} className="p-2" style={{cursor: "pointer"}}>
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
