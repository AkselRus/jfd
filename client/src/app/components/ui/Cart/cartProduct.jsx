import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProductById } from "../../../store/products";
import { getCategoryById } from "../../../store/categories";
import CountCart from "./countCart";

const CartProduct = ({ item, onClick }) => {
    const prod = useSelector(getProductById(item.prodId));
    const category = useSelector(getCategoryById(prod?.categories));

    if (prod) {
        return (
            <div>
                <div className="card mb-3 ">
                    <div className="card-body position-relative">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div>
                                    <img
                                        src={prod.image}
                                        className="img-fluid rounded"
                                        style={{ maxWidth: 100 }}
                                        alt="Image product"
                                    />
                                </div>
                                <div>
                                    <div className="py-2 px-2">
                                        <h5>
                                            <b>{prod.name}</b>
                                        </h5>
                                    </div>
                                    <div className="d-flex">
                                        <div className="py-2 px-2">
                                            <b>Категория : </b>
                                            {category && `${category.name}`}
                                        </div>
                                        <div className="">
                                            <CountCart data={item} />
                                        </div>
                                        <div className="py-2 px-2">
                                            <b>Цена : </b>
                                            {`${prod.price * item.count} `}
                                            <b>₽</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="position-absolute top-0 end-0">
                                <a
                                    type="button"
                                    className="p-3 mb-0"
                                    onClick={() => onClick(item._id)}
                                >
                                    <i
                                        className="btn btn-danger btn-sm bi bi-trash text-white"
                                        role="button"
                                    ></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else return "Корзина пуста";
};
CartProduct.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func
};
export default CartProduct;
