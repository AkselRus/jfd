import React from "react";

const SpinerLoader = () => {
    return (
        <div className="position-absolute top-50 start-50">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default SpinerLoader;
