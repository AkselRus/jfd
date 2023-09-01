// import { createSlice } from "@reduxjs/toolkit";
// import userService from "../services/user.service";

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         entities: null,
//         isLoading: true,
//         error: null
//     },
//     reducers: {
//         cartRequested: (state) => {
//             state.isLoading = true;
//         },
//         cartReceved: (state, action) => {
//             state.entities = action.payload;
//             state.isLoading = false;
//         },
//         cartRequesFailed: (state, action) => {
//             state.error = action.payload;
//             state.isLoading = false;
//         },
//         addInCart: (state, action) => {
//             if (!Array.isArray(state.entities)) {
//                 state.entities = [];
//             }
//             console.log(action.payload);
//             state.entities.push(action.payload);
//         },
//         removeItemCart: (state, action) => {
//             state.entities = state.entities.filter(
//                 (p) => p.prodId === action.payload
//             );
//             // state.isLoading = false;
//         },
//         incrementCount: (state, action) => {
//             const elIndex = state.entities.findIndex(
//                 (i) => i.prodId === action.payload
//             );
//             state.entities[elIndex].count = state.entities[elIndex].count + 1;
//         },
//         decrementCount: (state, action) => {
//             const elIndex = state.entities.findIndex(
//                 (i) => i.prodId === action.payload
//             );
//             state.entities[elIndex].count = state.entities[elIndex].count - 1;
//         },
//         removeAll: (state) => {
//             state.entities = null;
//         },
//         addError: (state, action) => {
//             state.error = action.payload;
//         }
//     }
// });

// const { reducer: cartReducer, actions } = cartSlice;
// const {
//     addInCart,
//     cartRequested,
//     cartReceved,
//     cartRequesFailed,
//     removeItemCart,
//     removeAll,
//     addError
// } = actions;

// export const loadCartList = () => async (dispatch) => {
//     dispatch(cartRequested());
//     try {
//         const { content } = await userService.getCurrentUser();
//         console.log(content);
//         dispatch(cartReceved(content.purchases));
//     } catch (error) {
//         dispatch(cartRequesFailed(error.message));
//     }
// };
// export const removeProdCart = (payload) => async (dispatch) => {
//     // dispatch(cartRequested());
//     try {
//         dispatch(removeItemCart(payload));
//         await userService.deleteItemPurchases(payload);
//     } catch (error) {
//         dispatch(addError(error.message));
//     }
// };
// export const amountCart = (payload) => (state) => {
//     console.log(payload);
//     const sum = 0;
//     state.cart.entities.map((i) => ({}));
//     return sum;
// };
// export const addInCartBy = (payload) => async (dispatch) => {
//     try {
//         dispatch(addInCart(payload));
//         console.log("addInCartBy", payload);
//         // const newData = {
//         //     ...state.user.entities,
//         //     purchases: state.cart.entities
//         // };
//         // console.log("newData", newData);

//         await userService.update(payload);
//     } catch (error) {
//         dispatch(addError(error.message));
//     }
// };

// export const clearShopingCart = () => async (dispatch) => {
//     window.location.assign("/finish_pay");
//     dispatch(removeAll());
//     try {
//         await userService.deleteAllPurchases();
//     } catch (error) {
//         dispatch(addError(error.message));
//     }
// };
// // export const countIncrement = (payload) => async (dispatch, state) => {
// //     console.log(payload);
// //     dispatch(incrementCount(payload));
// // };
// // export const countDecrement = (payload) => (dispatch) => {
// //     dispatch(decrementCount(payload));
// // };
// export const getShopList = () => (state) => state.cart.entities;

// export const getCartLoadingStatus = () => (state) => state.cart.isLoading;

// export default cartReducer;
