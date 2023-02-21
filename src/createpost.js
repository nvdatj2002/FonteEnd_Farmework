import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import callAPI from './api/axios';
import { useForm } from "react-hook-form";


const Createproduct = ({ show, handleClose, onReload, type, productEdit}) => {
    const [product, setProduct] = useState({})
    const [picture, setPicture] = useState()
    const [productNew, setProductNew] = useState(productEdit)
    const [img, setImg] = useState('')
    const [category, setCategory] = useState([])
    const [id, setId] = useState()
    const [itemCategory, setItemCategory] = useState(productNew.Category)
    const [categoryItem, setCategoryItem] = useState()




    const { register, handleSubmit, formState: { errors }, control } = useForm();


    const onChangeInput = (event) => {
        setProductNew({ ...productNew, [event.target.name]: event.target.value })
    }
    // useEffect(() => {
    //     return () => {
    //         picture && URL.revokeObjectURL(picture.preview)
    //     }
    // }, [picture])

    useEffect(() => {
        fecthCategory()

    }, [])

    useEffect(() => {
        setProductNew(productEdit)
        setPicture(productEdit.picture)
    }, [productEdit])

    const handleImg = (e) => {
        setImg(e.target.value)
        const file = e.target.files[0]
        console.log(file)
        file.preview = URL.createObjectURL(file)
        setPicture(file.preview)
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    const onSubmit = async (data) => {
        const url = '/product'
        const create = await callAPI(url, 'POST', {
            ...data,
            Category: categoryItem,
            picture: picture,
            createAt: new Date()
        })
        if (create) {
            onReload({ item: create, type: 'create' })
            handleClose()
            alert('Thêm thành công')

        }
    }

    const fecthCategory = async () => {
        const url = '/category'
        const responsive = await callAPI(url, 'GET')
        const result = responsive.filter(item => item.categoryItem.length > 0)
        setCategory(result)
        setItemCategory(result[0].categoryItem)
    }

    const onChangeOption = (e) => {
        const value = e.target.value
        const arr = category.find(item => item.id == value)
        setId(value)
        if (value) {
            setItemCategory(arr.categoryItem)
        } else {
            setItemCategory([])
        }
    }

    const onChangeOptionEdit = () => {
        const arr = category.find(item => item.id == productNew.Category)
        console.log(arr)
    }

    const handleUpdate = async (data) => {
        const url = `/product/${data.id}`
        const create = await callAPI(url, 'PUT', {
            ...data
        })
        if (create) {
            onReload({ item: create, type: 'update' })
            handleClose()
            alert('Sửa thành công')

        }
    }
    if (type == 'create') {
        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={onChangeInput}
                                type=""
                                placeholder="Name"
                                name="nam"
                                {...register("name", { required: true })}
                            />
                            {
                                errors?.name?.type === 'required'
                                && (< p className="text-danger" role="alert">Username is required</p>)
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label></Form.Label>
                            {
                                picture &&
                                <img src={picture} height="250px"></img>
                            }
                            <Form.Control
                                onChange={handleImg}
                                type="file"
                                placeholder=""
                                name="picture"
                            />


                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                onChange={onChangeInput}
                                type="price"
                                placeholder="price"
                                name="price"
                                {...register("price", { required: true })}
                            />
                            {
                                errors?.price?.type === 'required'
                                && (< p className="text-danger" role="alert">Quantity is required</p>)
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control onChange={onChangeInput}
                                type="quantity"
                                placeholder="quantity"
                                name="quantity"
                                {...register("quantity", { required: true })}
                            />
                            {
                                errors?.quantity?.type === 'required'
                                && (< p className="text-danger" role="alert">Quantity is required</p>)
                            }
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select onChange={
                                onChangeOption
                            }>
                                {
                                    category.map(item => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select onChange={e => {
                                setCategoryItem(e.target.value)
                            }}>
                                {itemCategory?.length > 0 &&
                                    itemCategory.map(item => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >{item.name}</option>
                                    ))}

                            </Form.Select>
                        </Form.Group>

                    </Form></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    // edit

    
    return (
        
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Product</Modal.Title>
                </Modal.Header>
                <Modal.Body><Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={onChangeInput}
                            type=""
                            placeholder="Name"
                            name="name"
                            value={productNew.name}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label></Form.Label>
                       
                        <Form.Control
                            onChange={handleImg}
                            type="file"
                            placeholder=""
                            name="picture"
                            // value={productNew.picture}
                        />


                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            onChange={onChangeInput}
                            type="price"
                            placeholder="price"
                            name="price"
                            value={productNew.price}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control onChange={onChangeInput}
                            type="quantity"
                            placeholder="quantity"
                            name="quantity"
                            value={productNew.quantity}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select onChange={
                            onChangeOptionEdit
                        }>
                            {
                                category.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select onChange={e => {
                            setCategoryItem(e.target.value)
                        }}>
                            {itemCategory?.length > 0 &&
                                itemCategory.map(item => (
                                    <option
                                        key={item.id}
                                        value={productNew.Category}
                                    >{item.name}</option>
                                ))}

                        </Form.Select>
                    </Form.Group>

                </Form></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {handleUpdate(productNew)}}>
                        UPDATE
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default Createproduct