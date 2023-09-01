import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { Router } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app/App";
// import { createSrore } from "./app/store/createStore";
// import history from "./app/utils/hystory";

// const store = createSrore();

ReactDOM.render(
    <React.StrictMode>
        {/* <Provider store={store}> */}
        {/* <Router history={history}> */}
        <App />
        {/* </Router> */}
        {/* </Provider> */}
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
