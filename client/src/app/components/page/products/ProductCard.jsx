import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../../store/products";
import SpinerLoader from "../../SpinerLoader";
import BookMark from "../../common/bookmark";
import { getIsLoggedIn, getUser, updateUser } from "../../../store/users";
// import PropTypes from 'prop-types'

const ProductCard = () => {
    const { prodId } = useParams();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(getIsLoggedIn());
    console.log(isLoggedIn);
    const dispatch = useDispatch();
    const product = useSelector(getProductById(prodId));
    const user = useSelector(getUser());

    const [bookmark, setBookmark] = useState(product?.bookmark);

    const toogleBookmark = async () => {
        setBookmark((prev) => !prev);
        const newProduct = { ...product, bookmark: bookmark };
        dispatch(updateProduct(newProduct));
    };

    const handleClickPay = (data) => {
        if (!isLoggedIn) {
            navigate("/auth/login");
        }
        if (user) {
            const newUser = {
                ...user,
                purchases: [
                    ...user.purchases,
                    { prodId: data._id, count: 1, price: data.price }
                ]
            };
            dispatch(updateUser(newUser));
        } else return null;
    };
    if (product) {
        return (
            <section className="py-5">
                <div className="container shadow p-3 mb-5 bg-white rounded">
                    <div className="mx-auto">
                        <div className="row g-0 ">
                            <div className="col-md-4">
                                <div>
                                    <img
                                        src={product.image}
                                        className="img-fluid rounded-start"
                                        alt="Product image"
                                    />
                                </div>
                            </div>
                            <div className="col-md-8 position-relative">
                                <div className="card-body p-2">
                                    <h3 className="card-title">
                                        {product.name}
                                        {isLoggedIn && (
                                            <BookMark
                                                status={bookmark}
                                                onClick={toogleBookmark}
                                            />
                                        )}
                                    </h3>
                                    <p className="card-text">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="p-2">
                                    <p className="small mb-0">
                                        Количество: {product.quantity}
                                    </p>
                                    <p className="small mb-0">
                                        Цена: {product.price}
                                    </p>
                                </div>
                                <div className="d-flex align-items-end p-2">
                                    <button
                                        className="btn btn-primary ms-auto position-absolute bottom-0 end-0"
                                        onClick={() => handleClickPay(product)}
                                    >
                                        Добавить в корзину
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    } else return <SpinerLoader />;
};

// ProductCard.propTypes = {}

export default ProductCard;
