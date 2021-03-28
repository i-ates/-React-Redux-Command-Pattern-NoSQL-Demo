import { HomeOutlined } from "@ant-design/icons";
import ContextConsumer from "../contextapi/Context";
import {redoChange, undoChange} from "../reduxState/actions";
import {useDispatch} from "react-redux";
import {
  RedoOutlined,
  UndoOutlined,
  SaveOutlined,
  ArrowUpOutlined
} from "@ant-design/icons";
import {Radio} from "antd";
export default function ContentHeader() {

  const dispatch = useDispatch();
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

  const save = (trigger, isJson) => {
    trigger.save(isJson ? "json" : "xml");
  };
  return (
    <ContextConsumer>
      {(value) => {
        const {document,collection,trigger,isJSON, setIsJSON} = value;
        return (
          <div className="row justify-content-start p-3 bg-light no-gutters border rounded border-1">
            <div className="col-md-9 d-flex">
              <HomeOutlined className="mr-3 mt-2" /><div className="mt-1">{collection && collection.name !== undefined ? collection.name : ""}{document && document.name !== undefined ? ` > ${document.name}` : ""}</div>
            </div>
            <div className="col-md-3 d-flex mt-1 justify-content-end">
              <Radio.Group
                  className="mr-4"
                  options={[{label: "JSON",value: true},{label: "XML",value: false}]}
                  onChange={(e) => setIsJSON(e.target.value)}
                  value={isJSON}
                  optionType="button"
                  buttonStyle="solid"
              />
              <UndoOutlined className="mr-2 mt-2" onClick={() => undo(trigger)} />
              <RedoOutlined className="mr-2 mt-2" onClick={() => redo(trigger)}/>
              <ArrowUpOutlined className="mr-2 mt-2" onClick={() => commit(trigger)}/>
              <SaveOutlined className="mr-2 mt-2" onClick={() => save(trigger,isJSON)}/>
            </div>
          </div>
        );
      }}
    </ContextConsumer>
  );
}
