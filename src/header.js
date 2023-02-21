import { Link } from "react-router-dom"
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import './App.css';
import './css/header.scss'
import { useContext, useState } from "react";
import Canvas from "./canvas";
import { useEffect } from "react";
import callAPI from "./api/axios";
import { cartContext, searchContext } from "./ThemeProvider"
import { ACTION } from "./ACTION";

import {
    Button,
    InputGroup,
    Nav
} from "react-bootstrap";
import { BsCart, BsFillPersonFill, BsList, BsFillCaretDownFill, BsSearch } from "react-icons/bs";




const Header = ({ auth }) => {
    const [showCanvas, setShowCanvas] = useState(false)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const [categorys, setCategory] = useState([])

    const { searchReducer: search, dispatchSearch: dispatch } = useContext(searchContext);
    const { cartReducer: carts } = useContext(cartContext)
    // load danh mục
    useEffect(() => {
        fectBlog()

    }, [])

    const fectBlog = async () => {
        const url = '/category'
        const result = await callAPI(url, 'GET')
        setCategory(result)
    }

    const handleOnChangeInput = (e) => {
        let value = e.target.value
        dispatch({
            type: ACTION.SET_SEARCH,
            payload: value
        })
    }

    const RenderLogout = () => {
        if (auth) {
            return (
                <div className="btn-logout" >
                    <button className="btnLogout"
                        style={{ background: "#fff", border: 'none' }}
                        onClick={() => { setShow(!show) }}>
                        <BsFillPersonFill className="color-icon" style={{ marginRight: '4px' }} />
                        {auth[0].name}
                    </button>
                    {show && <ListProFiles />}
                </div>
            )
        } else {
            return (
                <div>
                    <span>
                        <Link className="login-register" style={{ color: '#000', fontSize: '16px' }} to="/login">Login</Link>
                        /
                        <Link className="login-register" style={{ color: '#000', fontSize: '16px' }} to="/register">Register</Link>
                    </span>

                </div>
            )
        }
    }
    const ListProFiles = () => {
        return (
            <div className="logout">
                <ul >
                    <li>
                        <Link style={{
                            display:'block',
                            color: '#000',
                            fontSize: '14px',
                            fontWeight: '400', 
                            padding: '0',
                            lineHeight: '40px'
                        }} to={'/'}>Thông tin cá nhân</Link>
                    </li>
                    <li >
                        <Link style={{
                            display:'block',
                            color: '#000',
                            fontSize: '14px',
                            fontWeight:'400',
                            padding: 0,
                            lineHeight: '40px'
                        }} to={'/'}>Đơn hàng của tôi</Link>
                    </li>
                    <li onClick={logout}>
                        Đăng xuất
                    </li>
                </ul>
            </div>
        )
    }

    const logout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }
    return (
        <header className="header" >
            <div style={{
                backgroundColor: "#9999",
                height: '40px'
            }}>
            </div >
            <Nav className="header-top"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                activeKey="/" >
                <div style={{ textAlign: 'center', display: 'flex', alignItems: "center" }}>

                    {auth && auth[0]?.role == 'admin' && <Button style={{
                        margin: '0px',
                        padding: '0 8px',
                        height: '100%',
                        backgroundColor: "#fff",
                        border: 'none',

                    }} variant="primary" onClick={() => {
                        setShowCanvas(!showCanvas)
                    }}>
                        <BsList className="color-icon" />
                    </Button>}
                    <Link style={{ width: '160x', color: '#000', padding: '0 8px', fontFamily: 'Roboto, sans-serif ' }} to="/">HOME</Link>
                </div>

                <InputGroup style={{
                    height: '50px',
                    width: "60%",
                    marginRight: '10px',
                    paddingLeft: '0',
                    display: 'flex',
                    alignItems: 'center',
                    flex: '1'
                }}>
                    <Form.Control style={{ height: '40px' }}
                        onChange={handleOnChangeInput}
                        type="text"
                        placeholder="what are you looking for?"
                    />
                    <Button
                        style={{
                            backgroundColor: "#fff",
                            border: '1px solid #999',
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            height: '40px'
                        }}>
                        <BsSearch
                            className="color-icon"
                            style={{
                                padding: '0px 0px'
                            }}
                        />
                    </Button>
                </InputGroup>
                <div style={{ minWidth: '200px', display: 'flex', position: 'relative', alignItems: 'center' }}>
                    <Link style={{ position: 'relative', padding: '0 8px', margin: '0 20px' }} to={'/cart'}>
                        <BsCart className="color-icon" />
                        <span className="totalQuantyliCart" >{carts?.items?.length}</span>
                    </Link>
                    {<RenderLogout />}
                </div>
                <Canvas show={showCanvas} handleClose={() => setShowCanvas(false)} />
            </Nav>

            <Nav className="header-nav-menu" style={{ backgroundColor: '#ffff', marginBottom: '20px' }}>

                <ul className="header-nav-menu-list" >
                    {
                        categorys.map(category => (
                            <li className="header-nav-menu-item" key={category.id}>
                                <Link style={{
                                    padding: "0px",
                                    margin: " 0px",
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                                    to={'/'}>{category.name} <BsFillCaretDownFill style={{ marginLeft: "4px", float: 'right' }} /></Link>

                                <div className="header-nav-submenu">
                                    <ul className="header-nav-submenu-list">
                                        {category.categoryItem.map(item => {

                                            return (
                                                <li className="header-nav-submenu-item" key={item.id}>
                                                    <Link to={'/'}>{item.name}</Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </Nav >
        </header>
    )

}



export default Header