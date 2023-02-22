import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Table } from 'react-bootstrap';
import { parseVND } from './helper';
import './css/style.scss'
import { useEffect, useState } from 'react';
const DetailOrder = ({ show, handleClose, order }) => {
    let nameProducts = ''
    if (order) {
        order.product.forEach(element => {
            nameProducts = nameProducts + ', ' + element.name
            console.log(order)
        });
    }
    if (order) {
        return (
            <>
                < Modal show={show} onHide={handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Thông tin Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body ><Form>
                        <Table>
                            <thead>
                                <tr>

                                    <th>Mã đơn</th>
                                    <th>Tên người đặt</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Ghi chú</th>
                                    <th>Sản phẩm</th>
                                    <th>Tổng tiền</th>
                                    <th></th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ height: '60px' }}>
                                    <td>{order.id}</td>
                                    <td>{order.name}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.address}</td>
                                    <td style={{ width: '200px' }}>{order.note}</td>
                                    <td style={{ maxWidth: '200px' }}>{nameProducts.substring(1)}</td>
                                    <td>{parseVND(order.sum)}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div>
                            <h2>Thông tin sản phẩm </h2>
                            <Table>
                                <thead>
                                    <tr>

                                        <th>Tên sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Size</th>
                                        <th>Thành tiền</th>

                                    </tr>
                                </thead>
                                {order?.product?.length &&
                                    order.product.map(item => (
                                        <tbody>
                                            <tr style={{ height: '60px' }}>
                                                <td>{item.name}</td>
                                                <td>{parseVND(item.price)}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.size}</td>
                                                <td>{parseVND(item.price * item.quantity)}</td>
                                            </tr>
                                        </tbody>
                                    ))
                                }
                            </Table>
                        </div>
                    </Form></Modal.Body>

                </Modal>


            </>
        );
    }
}
export default DetailOrder