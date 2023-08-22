import React from "react"
import Header from "../../util/header"
import NavBar from "../navigation/NavBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


export default function ProductPage () {
    const {productId} = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL + `/getProduct/${productId}`)
        .then(response => response.json())
        .then(response => {setProduct(response)})
        .catch(error => console.error(error))
    }, [productId])
        // console.log(product);

    const mapProducts = product.map((element) => (
        <div key={element.product_id}>
            <h2>{element.name}</h2>
            <h3>{element.description}</h3>
            <h3>£{element.price}</h3>
            <img src={element.image} alt=""/>
        </div>
        ))

       
    return (
        <>
            <Header />
            <NavBar />
            {/* <h2>{product.price}</h2> */}
            <div className="product-page">
            {mapProducts}   
            </div>
        </>
  
    )
}