import { createSlice } from '@reduxjs/toolkit';

let initialCartItems = [];
try {
    const storedItems = localStorage.getItem("carts");
    if (storedItems) {
        initialCartItems = JSON.parse(storedItems);
    }
} catch (error) {
    console.error("Error parsing localStorage carts:", error);
    initialCartItems = [];
}

const initialState = {
    items: initialCartItems,
    statusTab: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { productId, quantity } = action.payload;
            const indexProductId = state.items.findIndex(item => item.productId === productId);
            if (indexProductId >= 0) {
                state.items[indexProductId].quantity += quantity;
            } else {
                state.items.push({ productId, quantity });
            }
            localStorage.setItem("carts", JSON.stringify(state.items));
        },
        
        changeQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const indexProductId = state.items.findIndex(item => item.productId === productId);
            if (quantity > 0) {
                state.items[indexProductId].quantity = quantity;
            } else {
                state.items = state.items.filter(item => item.productId !== productId);
            }
            localStorage.setItem("carts", JSON.stringify(state.items));
        },

        toggleStatusTab(state) {
            state.statusTab = !state.statusTab;
        }
    }
});

export const { addToCart, changeQuantity, toggleStatusTab } = cartSlice.actions;
export default cartSlice.reducer;
