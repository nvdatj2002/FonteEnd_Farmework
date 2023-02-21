import React, { useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useEffect } from "react";
import callAPI from "./api/axios";
import { parseVND } from "./helper";
import DetailOrder from "./detailOrder";
import './css/style.scss'
const Order = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('')
    const [isOpenDetail, setOpenDetail] = useState(false)
    const [productOrder, setProducOrder] = useState({});


    useEffect(() => {
        fectBlog()
    }, [])

    const fectBlog = async () => {
        let url = `/order?q=${search}`
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

    return (
        <Container>
            <div className="title">
                <ul>
                    <li>
                        MÃ đơn hàng
                    </li>
                    <li>
                        Tên người đặt
                    </li>
                    <li>
                        Địa chỉ
                    </li>
                    <li>
                        Tổng tiền
                    </li>
                </ul>
            </div>
            <div className="order">
                {products.map((item) => (
                <ul key={item.id}>
                    <li>
                        {item.id}
                    </li>
                    <li>
                        {item.name}
                    </li>
                    <li>
                        {item.address}
                    </li>
                    <li>
                        {item.sum}
                    </li>
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
                        Chi tiết
                    </Button>
                    <Button
                        color="danger"
                        onClick={
                            () => {
                            }
                        }
                    >
                        Xác Nhận
                    </Button>
                    <br />
                </ul>
                ))}
            </div>
            {/* <Row>
                <Col>
                    <h2 style={{ marginRight: "50px" }}>Products </h2>


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
                            
                                {products.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>{parseVND(item.sum)}</td>
                                        <td>
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
                                                Chi tiết
                                            </Button>
                                            <Button
                                                color="danger"
                                                onClick={
                                                    () => {
                                                    }
                                                }
                                            >
                                                Xác Nhận
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                    {isOpenDetail && <DetailOrder order={productOrder} />}
                </Col>
            </Row> */}
        </Container >
    );
};
export default Order;