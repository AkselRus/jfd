import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import usersReducer from "./users";
import cartReducer from "./cart";

const rootReducer = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    user: usersReducer,
    cart: cartReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
