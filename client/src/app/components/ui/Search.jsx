import React from "react";
import PropTypes from "prop-types";

const Search = ({ handleChange, serch }) => {
    return (
        <div className="d-flex align-items-center p-3 my-3 text-white bg-dark rounded shadow-sm">
            <input
                className="form-control form-control-dark bg-dark text-white border-0"
                type="text"
                name="searchQuery"
                placeholder="Поиск"
                value={serch}
                onChange={handleChange}
                aria-label="Поиск"
            />
        </div>
    );
};
Search.propTypes = {
    handleChange: PropTypes.func,
    serch: PropTypes.string
};

export default Search;
