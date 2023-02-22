import React, { useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useEffect } from "react";
import callAPI from "./api/axios";
import CreatePost from "./createpost";
import { parseVND } from "./helper";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
const Admin = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('')
    const [isOpen, setOpen] = useState(false)
    const [type, setType] = useState('')
    const [isOpenEdit, setOpenEdit] = useState(false)
    const [productEdit, setProductEdit] = useState({});
    const [sort, setSort] = useState('up')
    useEffect(() => {
        fectBlog()
    }, [])

    const fectBlog = async () => {
        let url = `/product?q=${search}`
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
        const url = `/product/${id}`
        const responsive = await callAPI(url, 'DELETE')
        if (responsive) {
            handleReload({
                item: product,
                type: 'delete'
            })
        }
    }
    const handleSort = async () => {
        let url = '/product?_sort=price&_order=asc'
        sort == 'down' ? setSort('up') : setSort('down')
        if (sort === 'down') {
            url = '/product?_sort=price&_order=desc'
        }
        const responsive = await callAPI(url, "GET")
        if (responsive) {
            setProducts(responsive)
        }
    }

    return (
        <Container>
            <Row>
                <div>
                    <h2>Products </h2>
                    <Button style={{ width: '100px'  , height: '40px', marginLeft:'20px'}}
                        color="danger"
                        onClick={() => {
                            setOpen(true)
                            setType('create')

                        }}
                    >
                        Create
                    </Button>
                </div>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Name</th>

                                <th>Price <button
                                    style={{ background: '#fff', border: 'none' }}
                                    onClick={handleSort}>
                                    {sort == 'down' && <BsFillCaretDownFill />}
                                    {sort == 'up' && <BsFillCaretUpFill />}
                                </button></th>
                                <th>Quantity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr key={item.id}>
                                    <td><img style={{ width: "60px" }} src={item.picture}></img></td>
                                    <td>{item.name}</td>

                                    <td>{parseVND(item.price)}</td>
                                    <td>{item.quantity}</td>
                                    <td style={{ width:'200px'}}>
                                        <Button style={{
                                            marginRight: '10px'
                                        }}
                                            color="danger"
                                            onClick={() => {
                                                setOpen(!isOpen)
                                                setProductEdit(item)
                                                setType('edit')
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            color="danger"
                                            onClick={
                                                () => {
                                                    handleDelete(item.id, item)
                                                }
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <CreatePost show={isOpen} handleClose={() => setOpen(false)} onReload={handleReload} type={type} productEdit={productEdit} />
        </Container>
    );
};
export default Admin;