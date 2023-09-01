import React from "react";
import { BrowserRouter } from "react-router-dom";

const withRouter =
    (Component) =>
    // eslint-disable-next-line react/display-name
    ({ ...props }) => {
        return (
            <BrowserRouter>
                <Component {...props} />
            </BrowserRouter>
        );
    };

export default withRouter;
