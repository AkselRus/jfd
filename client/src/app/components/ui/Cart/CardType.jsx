import React from "react";

const CardType = () => {
    return (
        <>
            <p className="small mb-2">Card type</p>
            <a href="#!" type="submit" className="text-white">
                <i className="fab fa-cc-mastercard fa-2x me-2"></i>
            </a>
            <a href="#!" type="submit" className="text-white">
                <i className="fab fa-cc-visa fa-2x me-2"></i>
            </a>
            <a href="#!" type="submit" className="text-white">
                <i className="fab fa-cc-amex fa-2x me-2"></i>
            </a>
            <a href="#!" type="submit" className="text-white">
                <i className="fab fa-cc-paypal fa-2x"></i>
            </a>
        </>
    );
};

export default CardType;
