import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SortBy = ({ label, onSort }) => {
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    return (
        <div className="d-flex justify-content-between align-items-center mb-0">
            <div>
                <span className="fs-4">{label}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="dropdown" onClick={toggleMenu}>
                    <div className="btn btn-secondary btn-sm dropdown-toggle d-flex align-items-center">
                        Сортировка по стоимости
                    </div>
                    <div
                        className={
                            "w-100 dropdown-menu" + (isOpen ? " show" : "")
                        }
                    >
                        <Link
                            onClick={() => onSort("min")}
                            className="dropdown-item"
                        >
                            Сначало недорогие
                        </Link>
                        <Link
                            onClick={() => onSort("max")}
                            className="dropdown-item"
                        >
                            Сначало дорогие
                        </Link>
                        <Link
                            className="dropdown-item"
                            onClick={() => onSort("bookmark")}
                        >
                            По популярности
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

SortBy.propTypes = {
    label: PropTypes.string,
    onSort: PropTypes.func
};

export default SortBy;
