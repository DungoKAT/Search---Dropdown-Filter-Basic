import { MyProductContext } from "../Management/Context";
import { BsTrash } from "react-icons/bs"
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"

const CartItem = ({id, name, image_url, price, quantityInStock, quantityInCart}) => {
    const { decreaseProductAmount, increaseProductAmount, removeItem, formatNumber } = MyProductContext()

    return (
        <div className='cart-item'>
            <div className="product-detail grid-item">
                <img src={image_url} alt={name} />
                <div className="product-detail-text">
                    <h2 className="product-name">{name}</h2>
                    <p className="product-name">Stock {formatNumber(quantityInStock.toFixed(2))}</p>
                    <button onClick={() => removeItem(id, "quantityInCart")}>Remove<BsTrash/></button>
                </div>
            </div>
            <div className="product-quantity grid-item">
                <div className="quantity-manage-box">
                    <button onClick={() => decreaseProductAmount(id)}><AiOutlineMinus/></button>
                    <div className="product-quantity-text">
                        <h3>{quantityInCart}</h3>
                    </div>
                    <button onClick={() => increaseProductAmount(id)}><AiOutlinePlus/></button>
                </div>
            </div>
            <h3 className="product-price grid-item">${price.toFixed(2)}</h3>
            <h3 className="product-total-price grid-item">${formatNumber((price*quantityInCart).toFixed(2))}</h3>
        </div>
    );
};

export default CartItem;