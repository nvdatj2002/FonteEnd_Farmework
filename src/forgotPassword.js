import Form from "react-bootstrap/Form";
import { Button, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import './css/login.scss'
import callAPI from "./api/axios";
const ForgotPassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, control } = useForm();

    const onSubmit = async (data) => {
        const { username, password } = data

        const url = `/profiles?username=${username}&password=${password}`
        const response = await callAPI(url, 'GET')

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
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            type="text"
                            {...register("email", { required: true })}
                            placeholder="xyz@gmail.com"
                        />  
                        {
                            errors?.email?.type === 'required'
                            && (< p className="text-danger" role="alert">email is required</p>)
                        }
                    </Form.Group>
                    <Button style={{ float: 'right' }} variant="primary" type="submit">
                        Gửi
                    </Button>
                    <Button style={{ float: 'right' }} variant="primary" type="submit">
                        Trở về
                    </Button>
                </Form>
            </div>
        </Container>
    );
}
export default ForgotPassword