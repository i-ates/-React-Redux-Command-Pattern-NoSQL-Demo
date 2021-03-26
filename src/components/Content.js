import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { PageHeader } from "antd";

export default function Content() {
  const { collections } = useSelector((state) => state.collectionReducer);
  return (
    <div style={{ marginTop: "16px", marginLeft: "16px" }}>
      <Row style={{ marginBottom: "16px", marginLeft: "0px" }}>
        <PageHeader
          className="site-page-header"
          title="Pretty Formatter"
          subTitle=""
          style={{ width: "calc(100% - 48px)" }}
        />
      </Row>
      <Row
        style={{
          marginBottom: "16px",
          marginLeft: "0px",
          width: "calc(100% - 48px)",
        }}
      >
        <Col lg={3} style={{ paddingLeft: "0px" }}>
          <Row style={{ marginBottom: "16px", marginLeft: "0px" }}>
            <PageHeader
              className="site-page-header"
              title="Inputs"
              subTitle=""
              style={{ width: "100%" }}
            />
          </Row>
        </Col>
        <Col lg={9} style={{ paddingRight: "0px" }}>
          <Row style={{ marginBottom: "16px", marginLeft: "0px" }}>
            <PageHeader
              className="site-page-header"
              title="Data"
              subTitle=""
              style={{ width: "100%" }}
            />
          </Row>
          {collections &&
            collections.map((collection) => {
              return (
                <Row
                  style={{
                    marginBottom: "16px",
                    marginLeft: "0px",
                    border: "1px solid rgb(235, 237, 240)",
                    padding: "16px",
                  }}
                  key={collection.id}
                >
                  {JSON.stringify(collection)}
                </Row>
              );
            })}
        </Col>
      </Row>
    </div>
  );
}
