import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequesFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestedSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoading = true;
        },
        authRequestedFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = null;
        },
        userUpdate: (state, action) => {
            state.entities = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceved,
    usersRequesFailed,
    authRequestedSuccess,
    authRequestedFailed,
    userLoggedOut,
    userUpdate
} = actions;

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.getCurrentUser();

        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequesFailed(error.message));
    }
};

const authRequested = createAction("users/authRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    window.location.assign("/");
};
export const logIn =
    ({ payload }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.logIn({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestedSuccess({ userId: data.userId }));
            window.location.assign("/");
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestedFailed(errorMessage));
            } else {
                dispatch(authRequestedFailed(error.message));
            }
        }
    };

export const signUp = (payload) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestedSuccess({ userId: data.userId }));
        window.location.assign("/");
    } catch (error) {
        dispatch(authRequestedFailed(error.message));
    }
};

export const updateUser = (payload) => async (dispatch) => {
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdate(content));
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};

export const deleteUser = async () => {
    try {
        await userService.delete();
    } catch (error) {
        console.log(error);
    }
};
export const getUser = () => (state) => state.user.entities;

export const getUsersLoadingStatus = () => (state) => state.user.isLoading;
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getDataStatus = () => (state) => state.user.dataLoaded;
export const getCurrentUserId = () => (state) => state.user.auth.userId;
export const getAuthErrors = () => (state) => state.user.error;

export default usersReducer;
