import { MyProductContext } from "../Management/Context";
import ShopItem from "./ShopItem";

import './shop.css';

const ShopPage = () => {
    const { allProduct } = MyProductContext()

    return (
        <div className="shop-page">
            {allProduct.map((item) => 
                <ShopItem key={item.id} {...item}/>
            )}
        </div>
    );
};

export default ShopPage;