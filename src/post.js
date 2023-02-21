import { BsArchive, BsFillPencilFill } from "react-icons/bs";
import { Spinner } from 'react-bootstrap';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import callAPI from './api/axios';
import { Link } from 'react-router-dom';
import { useState } from "react";
import EditPost from "./editpost";
import './css/header.scss'
function Post({ data, keyword, onReload }) {
  const [isOpen, setOpen] = useState(false)
  const [post, setPost] = useState({})
  
  if (data.length === 0) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  
  return (
    <Container >
      <Row display="flex">
        {data.map(post => (

          <Col xs={5} md={3} key={post.id} style={{ display: 'block' }}>
            <Link to={`/posts/${post.id}`} >
              <img className='img' src={post.picture}></img>
              < h2 style={{ color: '#495057' }} className="name" >{post.name}</h2>
              <p style={{ color: '#495057' }} className="description">{post.description}</p>
            </Link>
            <BsFillPencilFill
              style={{ cursor: "pointer", marginRight: '20px' }}
              color={"blue"}
              onClick={() => {
                setPost(post)
                setOpen(!isOpen)
              }}
            />
            <BsArchive
              onClick={async () => {
                const response = await callAPI(
                  `/posts/${post.id}`,
                  "DELETE"
                );
                if (response) {
                  alert("delete successfully");
                  onReload({ item: post, type: 'delete' });
                }
              }}
              style={{ cursor: "pointer", fontSize: "20px" }}
              color={"red"}
            />
          </Col>
        ))}
      </Row>
      <EditPost show={isOpen} handleClose={() => setOpen(false)} post={post} onReload={onReload} />
    </Container>

  );

}


export default Post; 