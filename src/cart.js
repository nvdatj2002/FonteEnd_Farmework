import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { cartContext } from "./ThemeProvider";
import { ACTION } from "./ACTION";
import { parseVND } from "./helper";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cartReducer: carts, cartDispatch: dispatch } =
    useContext(cartContext);
  if (!carts?.items?.length) {
    return (
      <Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <h5>data not found</h5>
            <Button style={{ display: "block" }} onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </Row>
    );
  }
  return (
    <Container style={{ minHeight: "400px" }}>

      <Row>
        <Col>
          <h2>Shopping Cart</h2>
          <Table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Size</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carts?.items?.length &&
                carts.items.map((item) => (
                  <tr key={item.id}>
                    <td><img style={{ width: '50px' }} src={item.picture}></img></td>
                    <td>{item.name}</td>
                    <td>{parseVND(item.price)}</td>
                    <td>{item.size}</td>

                    <td >
                      <button style={{
                        width: '40px',
                        height: '30px',
                        justifyContent: 'center',
                        background: '#fff',
                        color: '#000',
                        border: '1px solid #9999',
                        marginRight: '6px',
                        borderRadius: '3px'
                      }}
                        color="danger"
                        onClick={() => {
                          if (item.quantity == 1) {
                            return
                          }
                          dispatch({
                            type: ACTION.UPDATE_ITEM,
                            payload: {
                              id: item.id,
                              typePayload: 'minus'
                            },
                          });
                        }}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        style={{
                          width: '40px',
                          height: '30px',
                          justifyContent: 'center',
                          background: '#fff',
                          color: '#000',
                          border: '1px solid #9999',
                          marginLeft: '6px',
                          borderRadius: '3px'

                        }}
                        color="danger"
                        onClick={() => {
                          dispatch({
                            type: ACTION.UPDATE_ITEM,
                            payload: {
                              id: item.id,
                              typePayload: 'plus'
                            },
                          });
                        }}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <Button
                        color="danger"
                        onClick={() => {
                          dispatch({
                            type: ACTION.REMOVE_ITEM,
                            payload: {
                              id: item.id,
                            },
                          });
                        }}
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
      <div style={{ float: 'right', display: 'flex', flexDirection: 'column' }}>
        <span>Tổng tiền: <span>${parseVND(carts.sum)}</span></span>
        <Button
          onClick={() => {
            const isLogin = localStorage.getItem("user");
            if (!isLogin) {
              //user chua login
              navigate("/login");
              return;
            }
            navigate("/checkout");
          }}
          style={{
            height: '40px',
            width: '200px '
          }}
        >
          Mua hàng
        </Button>
      </div>
    </Container>
  );
};
export default Cart;