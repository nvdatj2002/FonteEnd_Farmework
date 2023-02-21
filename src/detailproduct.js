import './css/detailproduct.scss'
import { Link } from "react-router-dom"
import callAPI from './api/axios';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { cartContext } from './ThemeProvider';
import { ACTION } from './ACTION';
import { parseVND } from './helper';
const DetailProduct = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [categorys, setCategory] = useState(null)
    const [size, setSize] = useState('S')
    let sizes = ['S', 'M', 'L', 'XL']
    let [soLuong, setSoLuong] = useState(1)
    useEffect(() => {
        fectBlog()
    }, [])

    const fectBlog = async () => {
        const result = await callAPI(`/product/${id}`, 'GET')
        const result2 = await callAPI(`/category`, 'GET')
        setProduct(result)
        setCategory(result2)

    }
    const handleAddCart = () => {
    }
    const { cartReducer: carts, cartDispatch: dispatch } =
        useContext(cartContext);
        
    const getCategory = (id) => {
        let category
        categorys.forEach((item, index) => {
            if(item.categoryItem.length > 0) {
                item.categoryItem.find(item =>{
                    if(item.id == id) {
                        category = item.name
                    }
                })
            }
        })
        return category
       
    }
    const onChangeInput = () => {

    }
    if (product) {
        return (
            <div className="container">
                <div className="container-content">
                    <div className="container-path">
                        <div className="container-path-iteam">
                            <Link to={'/'}>{getCategory(product.Category)}</Link>
                            <Link to={'/'}>{product.name}</Link>
                        </div>
                    </div>
                </div>
                <div className="container-product">
                    <div className="container-product-left">
                        <div className="container-product-left-active">
                            <img className="img" src={product.picture} alt=""></img>
                            <img className="img" src={product.picture} alt=""></img>
                            <img className="img" src={product.picture} alt=""></img>
                        </div>
                        <div className="container-product-left-img">
                            <img src={product.picture} alt="" className="img" ></img>
                        </div>
                    </div>
                    <div className="container-product-right">
                        <div className="product-right-title">
                            <h1>{product.name}</h1>
                        </div>
                        <div className="product-right-start">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <div className="product-right-reviews">
                                <span><span>(19</span> lượt đánh giá / <span>49</span> lượt thích)</span>
                            </div>
                        </div>
                        <div className="product-right-price">
                            <span>Giá bán : <span >{parseVND(product.price)}</span></span>
                        </div>
                        <div className="product-right-color">
                            <p>MÀU KHÁC*</p>
                            <img src="/img/a6.jpg" alt=""></img>
                        </div>

                        <div className="product-right-size" >
                            <p>Chọn size:</p>
                            {sizes.map((item, index) =>
                                <button onClick={() => { setSize(item) }} key={index} value={'S'} className={item === size ? "btnSize btn-active-size" : "btnSize"}>{item}</button>
                            )}
                        </div>



                        <div className="product-right-quantity">
                            <span>Số lượng</span>
                            <button onClick={() => { setSoLuong(soLuong - 1) }}>-</button>
                            <input type="text" value={soLuong} onChange={onChangeInput} className="product-right-quantity-input" ></input>
                            <button onClick={() => { setSoLuong(soLuong + 1) }}>+</button>
                        </div>
                        <div className="product-right-buy">
                            <button onClick={() => {
                                dispatch({
                                    type: ACTION.ADD_ITEM,
                                    payload: {
                                        item: {
                                            ...product,
                                            quantity: soLuong,
                                            size: size
                                        },
                                    },
                                });
                            }}>Thêm vào giỏ hàng</button>
                            <button onClick={() => { setSoLuong(2) }}>Mua Ngay</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default DetailProduct