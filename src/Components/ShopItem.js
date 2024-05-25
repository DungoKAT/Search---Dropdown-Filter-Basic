import { Link } from "react-router-dom";
import { MyProductContext } from "../Management/Context";
import { BsCartCheck, BsCartPlus, BsCartX } from "react-icons/bs"

const ShopItem = ({id, name, image_url, price, quantityInStock, quantityInCart}) => {
    const { increaseProductAmount, formatNumber } = MyProductContext()

    return (
        <div className="product-card">
            <div className="card-img">
                <img src={image_url} alt={name} />
            </div>
            <div className="card-body">
                <h2>{name}</h2>
                <h3>${formatNumber(price.toFixed(2))}</h3>
                <div className="card-footer">
                    <div className="quantity-num">
                        <h4>{formatNumber(quantityInStock)}</h4>
                    </div>
                    {(quantityInCart > 0) ?
                        <Link to="/cart-page"><BsCartCheck className="cart-icon"/> GO TO CART</Link>
                        : 
                        <button 
                            onClick={() => increaseProductAmount(id, "quantityInStock")} 
                            disabled={!(quantityInStock > 0)}
                            className={quantityInStock > 0 ? "add-to-cart-button" : "out-of-stock-button"}
                        >
                            {(quantityInStock > 0) ? 
                            <span><BsCartPlus className="cart-icon"/> ADD TO CART</span>
                            : <span><BsCartX className="cart-icon"/> OUT OF STOCK</span>
                            }
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default ShopItem;