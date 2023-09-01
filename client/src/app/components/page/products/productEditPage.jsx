import React from "react";
import AddProduct from "../../ui/Admin/addProduct";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductById } from "../../../store/products";
// import PropTypes from "prop-types";

const ProductEditPage = () => {
    const { prodId } = useParams();
    const product = useSelector(getProductById(prodId));
    if (product) {
        return (
            <>
                <div className="d-flex justify-content-center mb-4">
                    <h1>{product.name}</h1>
                </div>
                <div className="d-flex justify-content-center">
                    <AddProduct />
                </div>
            </>
        );
    } else return "Продукт не найден.";
};

// ProductEditPage.propTypes = {
//     users: PropTypes.array.isRequired,
//     onSort: PropTypes.func.isRequired,
//     selectedSort: PropTypes.object.isRequired,
//     onToggleBookMark: PropTypes.func.isRequired
// };

export default ProductEditPage;
