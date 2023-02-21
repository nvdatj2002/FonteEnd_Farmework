import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import callAPI from './api/axios';
import { useEffect } from 'react';


const EditPost = ({ show, handleClose, post, onReload }) => {
    const [postNew, setPostNew] = useState(post)
    const [picture, setPicture] = useState()

    useEffect(()=> {
        setPostNew(post)
        setPicture(post.picture)
    },[post])
    const onChangeInput = (event) => {
        setPostNew({ ...postNew, [event.target.name]: event.target.value})
    }
    // useEffect ( () => {
    //     return () => {
    //         picture &&  URL.revokeObjectURL(picture.preview)
    //     }
    // },[picture])
    const handelImg = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setPicture(file.preview)
        setPostNew({...postNew, picture : file.preview})
    }
   

    // const createImg = (url) => {
    //     file.preview = url
        
    // }

    const handleChange = async () => {
        const url = `/posts/${post.id}`
        const response = await callAPI(url, 'PUT', {
            ...postNew
        })
        if (response) {
            onReload({ item: response, type: 'update' })
            alert('Sửa thành công')
            handleClose()
        }
    }
    
    return (
        <>

            < Modal show={show} onHide={handleClose} key={post.id}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body><Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={onChangeInput} type="" placeholder="Name" name='name' value={postNew.name} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label></Form.Label>
                            <img src={picture} width="80%"></img>
                        <Form.Control onChange={handelImg} type="file" placeholder="Url" name="picture" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={onChangeInput} type="description" placeholder="" name="description" value={postNew.description} />
                    </Form.Group>
                </Form></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleChange}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    );

}
export default EditPost