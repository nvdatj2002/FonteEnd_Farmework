import Form from "react-bootstrap/Form";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import callAPI from "./api/axios";
import './css/login.scss'

const Register = () => {

  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    const {username , mail} = data
    const res = await axios.get(process.env.REACT_APP_API +
      `/profiles?username=${username}`)
    if(res.status === 200 && res.data.length > 0) {
      alert('Tài khoản đã tồn tại')
      return;
    }
    const resEmail = await axios.get(process.env.REACT_APP_API +
      `/profiles?mail=${mail}`) 
    if(resEmail.status === 200 && resEmail.data.length > 0) {
      alert('Email đã tồn tại')
      return;
    }
    const url = '/profiles'
    const response = await callAPI(url, 'POST', {
      ...data,
      createdAt: new Date(),
      role: 'user'
    })
    
    if (response) {
      const user = JSON.stringify(response)
      localStorage.setItem('user','['+user+']')
      alert('Đăng ký thành công')
      navigate("/");
    } else {
      alert('Đăng ký thất bại')
    }
  };

  return (
    <Container className="login register">
      <div className="register-item login-item">
        <h3>Register</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter name"
            />
            {
              errors?.name?.type === 'required'
              && (< p className="text-danger" role="alert">Name is required</p>)
            }
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              {...register("username", { required: true })}
              placeholder="Enter name"
            />
            {
              errors?.username?.type === 'required'
              && (< p className="text-danger" role="alert">Username is required</p>)
            }
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              control={control}
              // onChange={OnchangeInput}
              placeholder="password"
              rows={3}
              {...register("password", {
                required: 'password is required',
                message: 'kksoo'
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {
              errors.password
              && (<p className="text-danger" role="alert">{errors.password?.message}</p>)
            }
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="text"
              {...register("mail", {
                required: "Email Address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              })}
              aria-invalid={errors.mail ? "true" : "false"}
            />
            {
              errors.mail && <p className="text-danger" role="alert">{errors.mail?.message}</p>
            }
          </Form.Group>
          <Link to={'/login'}>Bạn đã có tài khoản?</Link>
          <Button style={{ float: 'right' }} variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}
export default Register