import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { cartContext } from "./ThemeProvider";
import CartList from "./cartList";
import callAPI from "./api/axios";
import { ACTION } from "./ACTION";
import { useEffect } from "react";
import './css/style.scss'
import { useLocation,useNavigate } from "react-router-dom";
const Checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [reload, setReLoad] = useState("");
  const location = useLocation();
  const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem("user")))

  const { cartReducer: carts, cartDispatch: dispatch } =
    useContext(cartContext);
  const navigate = useNavigate()
  useEffect(() => {
    setUserLogin(JSON.parse(localStorage.getItem("user")))
  }, [location])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const order = {
      name: name,
      email: email,
      address: address,
      phone: phone,
      note: note,
      idUser: userLogin[0].id
    }
    const url = '/order'
    const responsive = await callAPI(url, 'POST', {
      ...order,
      product: [...carts.items],
      sum: carts.sum,
      createAt: new Date(),
      status: '1'
    })
    if (responsive) {
      alert('Đặt thành công')
      dispatch({
        type: ACTION.REMOVE_ALL
      })
      localStorage.removeItem('carts')
    }
    setReLoad('1')
  };

  return (
    <Container style={{display:'flex'}}>
      <CartList carts={carts} />
      <div style={{
        display: 'block',
        width: "1000px",
        margin: '0 auto',
        marginLeft:'60px'
      }}>
        <div style={{textAlign:"center"}}>

        <h1>Thông tin giao hàng</h1>
        </div>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Họ và tên *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              placeholder="xyz@gmai.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Địa chỉ *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Số điện thoại *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="note">
            <Form.Label>Ghi chú</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              placeholder="Ghi chú"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Form.Group>
          <button className="btnCheckOutAndCancel" style={{ float: 'right' }} variant="primary" type="submit" >
            Đặt hàng
          </button>
          <button className="btnCheckOutAndCancel"
          style={{ float: 'right' }} variant="primary" type="submit"
            onClick={()=> {
              navigate('/cart')
            }}
          >
            Huỷ
          </button>
        </Form>
      </div>
    </Container>
  );
};

export default Checkout;