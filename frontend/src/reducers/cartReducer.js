import { ADD_TO_CART , REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/cartConstants";

export const cartReducer = (state = {cartItems: [] , shippingInfo: {}}, action) => { //cartItems hold empty array, shippingInfo holds empty obj
    switch (action.type) {   //switch case statement to handle three types of cases
        case ADD_TO_CART:
            const item=action.payload;  //payload of the action contains the item to be added to the cart.

            //For each item (i) in the cartItems array, the callback function compares the product property of the item (i.product) with the product property of the new item being added (item.product).
            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );

            if(isItemExist) {
                return {
                    ...state,  //spreads the current state (...state) to keep all other properties unchanged.
                    //If the products match, it replaces the existing item with the new item (item). This updates the quantity or any other relevant properties of the existing item.
                    //If the products do not match, it keeps the item unchanged (i).
                    cartItems: state.cartItems.map((i) => 
                       i.product === isItemExist.product ? item : i
                    ),
                };
            } else {
                //It spreads the current state (...state) to keep all other properties unchanged.
                //It adds the new item to the cartItems array by spreading the existing items and appending the new item at the end ([...state.cartItems, item]).
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case REMOVE_CART_ITEM :
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            };
        case SAVE_SHIPPING_INFO:
            return {
                ...state,  //Within the new state object, the shippingInfo property is updated with the value of the payload from the action (action.payload).
                shippingInfo: action.payload,
                //payload here contains the shipping information provided by the user, such as address, contact details, etc.
            }
        default:
            return state;
    }
};