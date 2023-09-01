import React from "react";
import { createStore } from "../store/createStore";
import { Provider } from "react-redux";
const store = createStore();

const withRedux =
    (Component) =>
    // eslint-disable-next-line react/display-name
    ({ ...props }) => {
        return (
            <Provider store={store}>
                <Component {...props} />
            </Provider>
        );
    };

export default withRedux;
