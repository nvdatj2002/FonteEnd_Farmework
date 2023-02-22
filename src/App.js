

import callAPI from './api/axios';
import React, { useEffect, useContext } from 'react';
import './App.css';
import { useState } from 'react';
import { paginate } from './helper';
import {
  Container,
  Pagination,
} from "react-bootstrap";
import Product from './product';
import { searchContext } from './ThemeProvider';


function App() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const limit = 8
  const [products, setProducts] = useState([])

  const searchs = useContext(searchContext);
  useEffect(() => {
    fectBlog()
  }, [search])

  const fectBlog = async () => {
    let url = `/product?q=${search}`
    const result = await callAPI(url, 'GET')
    setProducts(result)
  }

  const handleOnChangeInput = (event) => {
    setTimeout(() => {
      setSearch(event.target.value);
    }, [3000]);
  };

  const handleReload = ({ item, type }) => {
    switch (type) {
      case 'create':
        const newData = [...products]
        setProducts([item, ...newData])
        break;
      case "update":
        const index = products.findIndex(element => element.id === item.id)
        products.splice(index, 1, item)
        const dataUpdate = [...products]
        setProducts(dataUpdate)
        break;
      case "delete":
        const updatePost = products.filter((post) => post.id !== item.id);
        setProducts(updatePost);
        break;
      default:
        new Error("not found type");
    }
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
    <Container style={{ padding: 0, margin: '0 auto' }}>
      <Product
      />
    </Container>

  );

}


export default App; 
