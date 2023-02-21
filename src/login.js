import Form from "react-bootstrap/Form";
import { Button, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import './css/login.scss'
import callAPI from "./api/axios";
const Login = ({ navigation }) => {


  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  const onSubmit = async (data) => {
    const { username, password } = data
    
    const url = `/profiles?username=${username}&password=${password}`
    const response = await callAPI(url,'GET')

    if (response) {
      const user = JSON.stringify(response)
      localStorage.setItem('user', user)
      alert('đăng nhập thành công')
      navigate("/");
    } else {
      alert('tài khoản hoặc mật khẩu không đúng')
    }

  };



  return (
    <Container className="login">
      <div className="login-item">
        <h3>LOGIN</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("password", { required: true, maxLength: 40 })}
            />
            {
              errors?.password?.type === 'required'
              && (<p className="text-danger" role="alert">password is required</p>)
            }
          </Form.Group>
          <Link to={'/register'}>Bạn chưa có tài khoản?</Link>
          <Button style={{float:'right'}} variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}
export default Login