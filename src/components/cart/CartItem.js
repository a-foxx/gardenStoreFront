import { useState } from "react"

export default function CartItem ({product}) {
    const [qty, setQty] = useState(product.qty?? 1)

    // post to cart-contents
    const cartPost = async (req, res) => {
        const contentsData = {
            product_id: product.product_id, 
            quantity: qty
            };
            fetch('http://localhost:3000/addCartContents', {
            method: 'POST',
            body: JSON.stringify(contentsData),
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            credentials: 'include'
            })
            .then(response => response.json())
            .catch(error => console.log(error))
    }

    console.log('product_id:', product.product_id, 'item.qty:', qty);
    return (
    <div key={product.product_id}className='cart-contents'>
        <img className='cart-img' src={product.img_url} alt=''/>
        {product.name}
        <div>£{product.price}</div>
        <div className='cart-qty'>{qty}</div>
        <div className='qty-buttons'>
            <button id="qty-up" 
            onClick={() => setQty(qty + 1)}
            >+</button>
            <button id="qty-down" onClick={() => setQty(qty - 1)}>-</button>
        </div>
    </div>
    )
}
