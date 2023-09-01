import React from "react";
import { useNavigate } from "react-router-dom";

const FinishPay = () => {
    const navigate = useNavigate();

    function sayHi() {
        navigate("/");
    }

    setTimeout(sayHi, 5000);
    return (
        <div className="position-absolute justify-content-center">
            <h1>Спасибо за покупки!</h1>
        </div>
    );
};

export default FinishPay;
