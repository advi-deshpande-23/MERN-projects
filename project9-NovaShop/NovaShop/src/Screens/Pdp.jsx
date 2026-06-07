// Pdp.jsx

import React from 'react'
import NavBar from '../Components/NavBar'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Pdp = () => {

    let { id } = useParams();

    let [pdpData, setPdpData] = useState(null);

    async function getData() {
        let data = await fetch(`https://dummyjson.com/products/${id}`);
        let jasonData = await data.json();
        setPdpData(jasonData);
    }

    useEffect(() => {
        getData();
    }, [id]);

    if (!pdpData) {
        return (
            <div>
                <NavBar />
                <h1 className="pdp-loading">Loading...</h1>
            </div>
        )
    }

    return (
        <div className="pdp-page">

            <NavBar />

            <div className="pdp-container">

                {/* LEFT IMAGE SECTION */}

                <div className="pdp-image-section">

                    <div className="main-image">
                        <img src={pdpData.thumbnail} alt={pdpData.title} />
                    </div>

                    <div className="image-gallery">
                        {
                            pdpData.images.map((img, index) => (
                                <img key={index} src={img} alt="product" />
                            ))
                        }
                    </div>

                </div>

                {/* RIGHT DETAILS SECTION */}

                <div className="pdp-details">

                    <p className="pdp-category">
                        {pdpData.category}
                    </p>

                    <h1 className="pdp-title">
                        {pdpData.title}
                    </h1>

                    <p className="pdp-brand">
                        Brand :
                        <span> {pdpData.brand}</span>
                    </p>

                    <div className="pdp-rating-stock">

                        <p>⭐ {pdpData.rating}</p>

                        <p className={pdpData.stock < 20 ? "low-stock" : "in-stock"}>
                            {pdpData.stock} items available
                        </p>

                    </div>

                    <div className="pdp-price-section">

                        <h2>$ {pdpData.price}</h2>

                        <span>
                            {pdpData.discountPercentage}% OFF
                        </span>

                    </div>

                    <p className="pdp-description">
                        {pdpData.description}
                    </p>

                    <div className="pdp-tags">
                        {
                            pdpData.tags.map((tag, index) => (
                                <span key={index}>{tag}</span>
                            ))
                        }
                    </div>

                    <div className="pdp-buttons">

                        <button className="add-cart-btn">
                            Add To Cart
                        </button>

                        <button className="buy-btn">
                            Buy Now
                        </button>

                    </div>

                    {/* EXTRA INFO */}

                    <div className="extra-info">

                        <div className="info-card">
                            <h4>Warranty</h4>
                            <p>{pdpData.warrantyInformation}</p>
                        </div>

                        <div className="info-card">
                            <h4>Shipping</h4>
                            <p>{pdpData.shippingInformation}</p>
                        </div>

                        <div className="info-card">
                            <h4>Return Policy</h4>
                            <p>{pdpData.returnPolicy}</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Pdp