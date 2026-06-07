// ProductGrid.jsx

import React from 'react'
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';


const ProductGrid = () => {

    const [productData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    async function getData() {
        let skip = (currentPage - 1) * 20;
        let data = await fetch(`https://dummyjson.com/products?limit=20&skip=${skip}`);
        let jasonData = await data.json();
        setProductData(jasonData.products);
    }

    useEffect(() => {
        getData();
    }, [currentPage]);

    function handlePageChange(page){
        setCurrentPage(page);
    
    }

    const activePageClass = "active";
    const pageClass = "";

    if(productData.length === 0){
        return <h1 className='loading'>Loading...</h1>
    }

    return (
        <div>
            <div className="product-grid">
                {productData.map((pData) => (
                        <ProductCard key={pData.id} data={pData} />
                ))}
            </div>
            <div className="pagination-container">
                <button onClick = {() => {handlePageChange(1)}} className={currentPage == 1? activePageClass : pageClass}>1</button>
                <button onClick = {() => {handlePageChange(2)}} className={currentPage == 2? activePageClass : pageClass}>2</button>
                <button onClick = {() => {handlePageChange(3)}} className={currentPage == 3? activePageClass : pageClass}>3</button>
                <button onClick = {() => {handlePageChange(4)}} className={currentPage == 4? activePageClass : pageClass}>4</button>
            </div>
        </div>
    )
}

export default ProductGrid