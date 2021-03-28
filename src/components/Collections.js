import { AppstoreAddOutlined } from "@ant-design/icons";
import ContextConsumer from "../contextapi/Context";
import {useSelector} from "react-redux";

export default function Collections() {
  const { collections } = useSelector((state) => state.collectionReducer);
  return (
      <ContextConsumer>
        {(value) => {
          const { setCollection } = value;
          return (
              <div className="col-4 border border-top-0">
                <div className="p-3 bg-light border border-1">
                  <div className="d-flex justify-content-between">
                    Collections
                    <AppstoreAddOutlined className="d-flex mt-1 justify-content-end" />
                  </div>
                </div>
                <div>
                  {
                    collections && collections.map(collection => {
                      return(
                          <div key={collection.id} onClick={() => setCollection({id: collection.id, name: collection.name})} className="p-2">
                            {collection.name}
                          </div>
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
