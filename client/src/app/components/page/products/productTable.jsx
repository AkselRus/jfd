import React from "react";
import PropTypes from "prop-types";
import Table from "../table";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import Category from "../../ui/category";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../store/products";
// import { Link } from "react-router-dom";

const ProductTable = ({ products, onSort, selectedSort }) => {
    const dispatch = useDispatch();
    const columns = {
        _id: {
            name: "id",
            component: (prod) => (
                <Popup
                    trigger={
                        <button className="btn btn-secondary">
                            {products.indexOf(prod) + 1}
                        </button>
                    }
                    position="right center"
                >
                    <div>{prod._id}</div>
                </Popup>
            )
        },
        name: {
            path: "name",
            name: "Имя",
            component: (prod) => (
                <Link
                    to={`/product/${prod._id}`}
                    className="nav-link text-dark"
                >
                    {prod.name}
                </Link>
            )
        },
        categories: {
            name: "Категория",
            component: (products) => <Category id={products.categories} />
        },

        quantity: {
            path: "quantity",
            name: "Кол-во",
            component: (prod) => (
                <div className="text-center">{prod.quantity}</div>
            )
        },
        price: {
            path: "price",
            name: "Цена",
            component: (prod) => <div className="text-center">{prod.price}</div>
        },
        update: {
            name: "Изменить",
            component: (products) => (
                <Link
                    to={`/admin/${products._id}`}
                    className="btn btn-secondary ms-3"
                >
                    <i className="bi bi-gear"></i>
                </Link>
            )
        },
        action: {
            name: "Действие",
            component: (products) => (
                <button
                    onClick={() => dispatch(deleteProduct(products._id))}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={products}
        />
    );
};

ProductTable.propTypes = {
    products: PropTypes.array.isRequired,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object
};

export default ProductTable;
