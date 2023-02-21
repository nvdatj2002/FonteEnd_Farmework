
import { Spinner } from 'react-bootstrap';
import './App.css';
import callAPI from './api/axios';
import { Link } from 'react-router-dom';
import { useState } from "react";
import './css/header.scss'
import './css/style.scss'
import { paginate, parseVND } from './helper';
import { searchContext } from "./ThemeProvider"
import {
    Pagination,
} from "react-bootstrap";

import React, { useEffect, useContext } from 'react';

function Product() {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const limit = 8
    
    const { searchReducer: searchs, dispatchSearch: dispatch } = useContext(searchContext);
    const {search} = searchs
    useEffect(() => {
        fectBlog()
    }, [search])
    const fectBlog = async () => {
        let url = `/product?q=${search}`
        const result = await callAPI(url, 'GET')
        setProducts(result)
    }
    if (products.length === 0) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }
    // phân trang
    let items = [];
    for (let number = 1; number <= Math.ceil(products.length / limit); number++) {
        items.push(
            <Pagination.Item
                onClick={() => {
                    setPage(number);
                }}
                key={number}
                active={number === page}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div className="grid" >
                <div className="grid__row">
                    {paginate(products, limit, page).map(product => (
                        <div className="grid__column" key={product.id}>
                            <Link to={`/product/${product.id}`} className="grid-column-content">
                                <div className="grid-column-content-img">
                                    <img src={product.picture} alt="" className="grid-column-item-img" />
                                </div>
                            </Link>
                            <div className="grid-column-content-item">
                                <Link className="grid-column-content-name" to={"/"}>{product.name}</Link>
                                <p className="grid-column-content-price">{parseVND(product.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination style={{ marginTop: '30px', justifyContent: 'center' }}>{items}</Pagination>
        </div>

    );

}


export default Product; 