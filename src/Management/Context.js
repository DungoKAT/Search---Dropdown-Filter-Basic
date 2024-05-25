import { createContext, useContext, useEffect, useReducer } from "react"
import ProductInfo from "../data/ProductInfo"
import Reducer from "./Reducer"

const initialState = {
    allProduct: ProductInfo,
    totalProductListInCart: 0,
    totalProductQuantityInCart: 0,
    totalPriceInCart: 0
}

const ProductContext = createContext()

export const MyProductContext = () => {
    return useContext(ProductContext)
}

const ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState)

    useEffect(() => {
        dispatch({type: "CALCULATE_TOTAL"})
    }, [state.allProduct])

    const decreaseProductAmount = (id) => {
        dispatch({type: "DECREASE_QUANTITY", payload: {id}})
    }

    const increaseProductAmount = (id) => {
        dispatch({type: "INCREASE_QUANTITY", payload: {id}})
    }

    const removeItem = (id) => {
        dispatch({type: "REMOVE_ITEM", payload: {id}})
    }

    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <ProductContext.Provider value={{...state, decreaseProductAmount, increaseProductAmount, removeItem, formatNumber}}>
            {children}
        </ProductContext.Provider>
    )
}

export {ProductContext, ProductProvider}