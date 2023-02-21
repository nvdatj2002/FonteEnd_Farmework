import React from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { parseVND } from "./helper";


const DetailOrder = ({ order }) => {
    
    return (
        <Container 
        style={{
            position:'absolute',
            background: '#fff',
            width: '400px',
            right: '500px',
            bottom : '0',
            border: '1px solid #9999'
            }}>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>Mã đơn</th>
                                <th>Tên người đặt</th>
                                <th>Địa chỉ</th>
                                <th>Tổng tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <div><td>{order.id}</td></div>
                                <td>{order.name}</td>
                                <td>{order.address}</td>
                                <td>{parseVND(order.sum)}</td>
                                <td>
                                </td>
                            </tr>

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
export default DetailOrder