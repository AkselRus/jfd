import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCategoryById } from "../../store/categories";

const Category = ({ id }) => {
    const categori = useSelector(getCategoryById(id));
    return <div>{categori.name}</div>;
};
Category.propTypes = {
    id: PropTypes.string
};

export default Category;
