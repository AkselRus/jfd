import React from "react";
// Librares
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// Components

// Store
import { getIsLoggedIn } from "../store/users";

const AuthLayout = () => {
    // let { path } = useRouteMatch();
    const isLoggedIn = useSelector(getIsLoggedIn());

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <div className="flex grow flex-col justify-center items-center  dark:text-slate-200 ">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
