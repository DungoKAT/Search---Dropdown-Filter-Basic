import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { BsArrowLeft } from "react-icons/bs"
import { MyProductContext } from "../Management/Context";

import './cart.css';

const CartPage = () => {
    const { allProduct, totalProductQuantityInCart, totalPriceInCart, formatNumber } = MyProductContext()

    return (
        <div className='shopping-cart'>
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <h1>Total Quantity {totalProductQuantityInCart} Items</h1>
            </div>
            <div className="cart-list-text">
                <p>PRODUCT DETAILS</p>
                <p className="cart-list-center">QUANTITY</p>
                <p className="cart-list-center">PRICE</p>
                <p className="cart-list-center">TOTAL PRICE</p>
            </div>
            <div className={totalProductQuantityInCart > 0 ? "cart-products" : "empty-cart"}>
                {totalProductQuantityInCart > 0 ?
                allProduct.map((item, index) => 
                    (item.quantityInCart > 0) && <CartItem key={index} {...item}/>
                )
                :
                <h1>THERE ARE NO PRODUCTS IN YOUR CART...</h1>
                }
                
            </div>
            <footer>
                <Link to="/shop-page"><BsArrowLeft/><h3>Continue Shopping</h3></Link>
                <h1>Total Cost ${formatNumber(totalPriceInCart.toFixed(2))}</h1>
            </footer>
        </div>
    );
};

export default CartPage;