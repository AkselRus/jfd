import React from "react";
import { Navigate, useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage userId={userId} /> : <Navigate to="" />}</>;
};

export default Users;
