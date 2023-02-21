import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import callAPI from './api/axios';
import { useParams } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';

import EditPost from './editpost';
const Detail = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [isOpen, setOpen] = useState(false)
    useEffect(() => {
        fectBlog()
    }, [])

    const fectBlog = async () => {
        const result = await callAPI(`/posts/${id}`, 'GET')
        setPost(result)
    }

    if (post) {

        return (
            <Container style={ {marginTop:'10px'} }>
                <Row >
                        <Col xs={5} md={3} key={post.id} style={ { display:'block', width:'80%'} } >
                            <img className='img' src={post.picture}></img>
                            <h2>{post.name}</h2>
                            <p>{post.description}</p>
                        </Col>
                </Row>
            </Container>
        );
    }

}
export default Detail
