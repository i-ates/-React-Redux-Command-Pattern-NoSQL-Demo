import React from "react";
import {Button,Row, Col} from 'react-bootstrap';
import { PageHeader } from 'antd';
import '../css/site.css';
import { FileAddOutlined,SyncOutlined,DeleteTwoTone,RedoOutlined,UndoOutlined,SaveOutlined } from '@ant-design/icons';
class LeftMenu extends React.Component {
    render() {
        return (
            <div style={{marginTop: "16px", marginLeft: "16px"}}>
                <Row style={{marginBottom: "16px", marginLeft: "0px"}}>
                    <PageHeader
                        className="site-page-header responsiveHeader"
                        title="Operations"
                    />
                </Row>
                <Row style={{marginBottom: "16px", marginLeft: "0px"}}>
                    <Col lg={2} style={{marginBottom: "16px"}}>
                        <Button type="primary" style={{paddingBottom: "10px"}}><FileAddOutlined /></Button>
                    </Col>
                    <Col lg={2} style={{marginBottom: "16px"}}>
                        <Button type="primary" style={{paddingBottom: "10px"}}><SyncOutlined /></Button>
                    </Col>
                    <Col lg={2} style={{marginBottom: "16px"}}>
                        <Button type="primary" style={{paddingBottom: "10px"}}><DeleteTwoTone twoToneColor="#fff" /></Button>
                    </Col>
                    <Col lg={2} style={{marginBottom: "16px"}}>
                        <Button type="primary" style={{paddingBottom: "10px"}}><UndoOutlined /></Button>
                    </Col>
                    <Col lg={2} style={{marginBottom: "16px"}}>
                        <Button type="primary" style={{paddingBottom: "10px"}}><RedoOutlined /></Button>
                    </Col>
                    <Col lg={2} style={{marginBottom: "16px"}}>
                        <Button type="primary" style={{paddingBottom: "10px"}}><SaveOutlined /></Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default LeftMenu;