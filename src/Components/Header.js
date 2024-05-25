import { MyProductContext } from "../Management/Context";
import { Link } from 'react-router-dom'
import { BsCart3 } from "react-icons/bs"

const Header = () => {
    const { totalProductListInCart } = MyProductContext()
    return (
        <header className='header'>
            <h1>Shopping Cart Workshop</h1>
            <div className='navigation-button'>
                <Link to="/shop-page">DungoKAT Shop</Link>
                <Link to="/cart-page" className='cart-button'><BsCart3 className='cart-icon'/><span>{totalProductListInCart}</span></Link>
            </div>
        </header>
    );
};

export default Header;