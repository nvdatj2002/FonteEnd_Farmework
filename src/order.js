import React, { useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useEffect } from "react";
import callAPI from "./api/axios";
import { parseVND } from "./helper";
import DetailOrder from "./detailOrder";
import './css/style.scss'
import { Spinner } from 'react-bootstrap';
const Order = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('')
    const [isOpenDetail, setOpenDetail] = useState(false)
    const [productOrder, setProducOrder] = useState(null);
    const [statusOrder, setStatusOrder] = useState('1')

    useEffect(() => {
        fectBlog()
    }, [statusOrder])

    const fectBlog = async () => {
        let url = `/order?status=1`
        if (statusOrder === '2') {
            url = `/order?status=2`
        }if (statusOrder === '0') {
            url = `/order?status=0`
        }
        const result = await callAPI(url, 'GET')
        setProducts(result)
    }

    const removeFromCart = (id) => {
        setProducts(products.filter((item) => item.id !== id));
    };
    const handleReload = ({ item, type }) => {
        switch (type) {
            case 'create':
                const newData = [...products]
                setProducts([item, ...newData])
                break;
            case "update":
                const index = products.findIndex(element => element.id === item.id)
                products.splice(index, 1, item)
                const dataUpdate = [...products]
                setProducts(dataUpdate)
                break;
            case "delete":
                console.log('detele')
                const updateProduct = products.filter((product) => product.id !== item.id);
                setProducts(updateProduct);
                break;
            default:
                new Error("not found type");
        }
    }
    const handleDelete = async (id, product) => {
        const url = `/order/${id}`
        const responsive = await callAPI(url, 'DELETE')
        if (responsive) {
            handleReload({
                item: product,
                type: 'delete'
            })
        }
    }
    const handleUpdate = async (id, product) => {
        const url = `/order/${id}`
        const responsive = await callAPI(url, 'PUT', {
            ...product
        })
        if (responsive) {
            console.log('update')
            handleReload({
                item: product,
                type: 'delete'
            })
        }
    }
    const handleSort = async () => {
        const url = `/product?_sort=price&_order=asc`
        const responsive = await callAPI(url, 'GET')
        if (responsive) {
            setProducts(responsive)
        }
    }



    const getName = (items) => {
        let name
        items.forEach((item) => {
            name = item.name
        })
        return name
    }
    if (products.length === 0) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }
    return (
        <Container style={{marginTop: "20px"}}>
            <Row>
            <div
                    style={{
                        marginBottom: '20px',
                        backgroundColor: '#eeeeee',
                        padding: '0'
                    }}>

                    <Button className={statusOrder == '1' ? "btnStatus" : ""}
                        onClick={() => {
                            setStatusOrder('1')
                        }} style={{
                            minWidth: '240px',
                            backgroundColor: '#eeeeee',
                            border: 'none',
                            color: '#000',
                            border: '1px solid #9999',
                            position: 'relative'
                        }} >
                        <span className="quantity">{}</span>
                        Ch??a x??c nh???n</Button>

                    <Button className={statusOrder == '2' ? "btnStatus" : ""}
                        onClick={() => {
                            setStatusOrder('2')
                        }}
                        style={{
                            minWidth: '240px',
                            backgroundColor: '#eeeeee',
                            border: '1px solid #9999',
                            color: '#000',
                            position: 'relative',

                        }} >
                        <span className="quantity">{}</span>

                        ????n ???? x??c nh???n</Button>
                    <Button className={statusOrder == '0' ? "btnStatus" : ""}
                        onClick={() => {
                            setStatusOrder('0')
                        }}
                        style={{
                            minWidth: '240px',
                            backgroundColor: '#eeeeee',
                            border: '1px solid #9999',
                            position: 'relative',
                            color: '#000'
                        }} >
                        <span className="quantity">{}</span>
                        ????n ???? hu???</Button>
                </div >
                <Col>
                    <Table>
                        <thead>
                            <tr>

                                <th>M?? ????n</th>
                                <th>T??n ng?????i ?????t</th>
                                <th>?????a ch???</th>
                                <th>Ghi ch??</th>
                                <th>T???ng ti???n</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {products.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.note}</td>
                                    <td>{parseVND(item.sum)}</td>
                                    <td style={{ width: '200px' }}>
                                        <Button style={{
                                            marginRight: '10px'
                                        }}
                                            color="danger"
                                            onClick={() => {
                                                console.log('clik')
                                                setOpenDetail(!isOpenDetail)
                                                setProducOrder(item)
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ticket-detailed" viewBox="0 0 16 16">
                                                <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5ZM5 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" />
                                                <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6V4.5ZM1.5 4a.5.5 0 0 0-.5.5v1.05a2.5 2.5 0 0 1 0 4.9v1.05a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1.05a2.5 2.5 0 0 1 0-4.9V4.5a.5.5 0 0 0-.5-.5h-13Z" />
                                            </svg>
                                        </Button>
                                        {statusOrder === '1' && <Button
                                            color="danger"
                                            onClick={
                                                () => {
                                                    item.status = 2
                                                    handleUpdate(item.id, item)
                                                }
                                            }
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                            </svg>
                                        </Button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                {setOpenDetail && <DetailOrder order={productOrder} show={isOpenDetail} handleClose={() => { setOpenDetail(false) }} />}
            </Row>
        </Container >
    );
};
export default Order;