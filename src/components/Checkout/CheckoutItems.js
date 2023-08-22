export default function CheckoutItems ({product}) {
    return (
        <>
        <div key={product.product_id} className="cart-contents">
            <img className="crt-img" src={product.image} alt=''/>
            {product.name}
            <div>£ {product.price}</div>
            <div className="cart-qty">{product.quantity}</div>
        </div>
        </>
    )
}