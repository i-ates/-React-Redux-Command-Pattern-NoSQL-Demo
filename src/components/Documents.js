import {AppstoreAddOutlined, DeleteOutlined} from "@ant-design/icons";
import ContextConsumer from "../contextapi/Context";
import {useDispatch, useSelector} from "react-redux";
import {Col, Form, Input, Modal, Row} from "antd";
import {useState} from "react";
import uniquid from "uniquid";
import {updateCollection} from "../reduxState/actions";

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
export default function Documents() {
  const {collections} = useSelector((state) => state.collectionReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [input, setInput] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const dispatch = useDispatch();

  const handleOk = (trigger, setUndoCommandsCount,setRedoCommandsCount, oldCollection) => {
    let document = {
      id: uniquid(),
      name: input,
    };
    setInput("");
    let collection = {id: oldCollection.id, name: oldCollection.name, documents: oldCollection.documents};
    collection.documents = [...collection.documents,document];
    trigger.updateCollection(oldCollection, collection);
    setUndoCommandsCount(trigger.getInvoker().getUndoCommands().length);
    setRedoCommandsCount(trigger.getInvoker().getRedoCommands().length);
    dispatch(updateCollection(collection));
    setIsModalVisible(false);
  };
  const remove = (trigger,setUndoCommandsCount,setRedoCommandsCount,oldCollection,documentId) => {
    let collection = {id: oldCollection.id, name: oldCollection.name, documents: oldCollection.documents};
    collection.documents = [...collection.documents.filter(d => d.id !== documentId)];
    trigger.updateCollection(oldCollection, collection);
    setUndoCommandsCount(trigger.getInvoker().getUndoCommands().length);
    setRedoCommandsCount(trigger.getInvoker().getRedoCommands().length);
    dispatch(updateCollection(collection));
  };
  const handleCancel = () => {
    setInput("");
    setIsModalVisible(false);
  };
  return (
    <ContextConsumer>
      {(value) => {
        const {setDocument, collection, trigger, setUndoCommandsCount, setRedoCommandsCount} = value;
        let currCollection = undefined;
        if (collection !== undefined) {
          currCollection = collections.filter(c => {
            return c.id === collection.id
          })[0];
        }
        return (
          <div className="col-4 border border-top-0">
            <div className="p-3 bg-light border border-1">
              <div className="d-flex justify-content-between">
                Documents
                {
                  currCollection && (
                    <>
                      <AppstoreAddOutlined className="d-flex mt-1 justify-content-end" onClick={showModal}/>
                      <>
                        <Modal title="Add a Document" visible={isModalVisible} onOk={() => handleOk(trigger,setUndoCommandsCount,setRedoCommandsCount,currCollection)} onCancel={handleCancel}>
                          <Form
                            {...layout}
                            name="basic"
                          >
                            <Form.Item
                              label="Document Name"
                              rules={[{required: true, message: 'Please input your document name!'}]}
                            >
                              <Input onChange={(e) => {
                                setInput(e.target.value)
                              }} value={input}/>
                            </Form.Item>
                          </Form>
                        </Modal>
                      </>
                    </>
                  )
                }
              </div>
            </div>
            <div style={{overflow:"auto", height: "540px"}}>
              {
                currCollection && currCollection.documents && currCollection.documents.map(document => {
                  return (
                    <>
                      <Row className="p-1">
                        <Col md={16}>
                          <div key={document.id} onClick={() => setDocument({id: document.id, name: document.name})} className="p-2" style={{cursor: "pointer"}}>
                            {document.name}
                          </div>
                        </Col>
                        <Col md={4} offset={4}>
                          <div onClick={() => remove(trigger,setUndoCommandsCount,setRedoCommandsCount,currCollection,document.id)} className="p-2 d-flex justify-content-end" style={{cursor: "pointer"}}>
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
