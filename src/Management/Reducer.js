const Reducer = (state, action) => {
    const allProductState = state.allProduct
    const actionPayload = action.payload

    if(action.type === "DECREASE_QUANTITY") {
        const allProductUpdate = allProductState.map((item) => {
            if(item.id === actionPayload.id) {
                return {
                    ...item, 
                    quantityInCart: item.quantityInCart > 0 ? item.quantityInCart-1 : item.quantityInCart,
                    quantityInStock: item.quantityInStock+1
                }
            }
            return item
        })
        return {
            ...state,
            allProduct: allProductUpdate,
        }
    }

    if(action.type === "INCREASE_QUANTITY") {
        console.log("Quantity In Cart: ", allProductState[actionPayload.id-1].quantityInCart)
        console.log("Quantity In Stock: ", allProductState[actionPayload.id-1].quantityInStock)
        const allProductUpdate = allProductState.map((item) => {
            if(item.id === actionPayload.id) {
                return {
                    ...item, 
                    quantityInCart: (item.quantityInStock > 0) ? item.quantityInCart+1 : item.quantityInCart,
                    quantityInStock: (item.quantityInStock > 0) ? item.quantityInStock-1 : item.quantityInStock
                }
            }
            return item
        })
        return {
            ...state,
            allProduct: allProductUpdate,
        }
    }

    if(action.type === "REMOVE_ITEM") {
        const allProductUpdate = allProductState.map((item) => {
            if(item.id === actionPayload.id) {
                return {
                    ...item,
                    quantityInCart: 0,
                    quantityInStock: item.quantityInStock+item.quantityInCart
                }
            }
            return item
        })
        return {
            ...state,
            allProduct: allProductUpdate,
        }
    }

    if(action.type === "CALCULATE_TOTAL") {
        const { totalProductListInCart, totalProductQuantityInCart, totalPriceInCart } = allProductState.reduce((allProductTotal, item) => {
            const { price, quantityInCart } = item
            const itemTotalPrice = price*quantityInCart
            if(allProductTotal) {
                allProductTotal.totalProductListInCart += (quantityInCart > 0) && 1
                allProductTotal.totalProductQuantityInCart += quantityInCart
                allProductTotal.totalPriceInCart += itemTotalPrice
            }
            return allProductTotal
        },
        {
            totalProductListInCart: 0,
            totalProductQuantityInCart: 0,
            totalPriceInCart: 0
        })

        return {
            ...state,
            totalProductListInCart,
            totalProductQuantityInCart,
            totalPriceInCart
        }
    }
};

export default Reducer;