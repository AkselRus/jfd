import React from "react";
import PropTypes from "prop-types";
const BookMark = ({ status, onClick }) => {
    return (
        <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            onClick={() => onClick()}
        >
            <i className={"bi bi-heart" + (status ? "-fill" : " ")}></i>
        </button>
    );
};
BookMark.propTypes = {
    status: PropTypes.bool,
    onClick: PropTypes.func
};

export default BookMark;
