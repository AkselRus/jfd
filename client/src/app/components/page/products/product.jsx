import React from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { getCategoryById } from "../../../store/categories";
import { updateProduct } from "../../../store/products";
import BookMark from "../../common/bookmark";
import SpinerLoader from "../../SpinerLoader";
import { getIsLoggedIn } from "../../../store/users";
// import { getUserId } from "../../../services/localStorage.service";

const Product = ({ data, onClick }) => {
    const dispatch = useDispatch();
    // const userId = getUserId();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const categori = useSelector(getCategoryById(data?.categories));

    const toogleBookmark = async () => {
        const newObject = await {
            ...data,
            bookmark: !data.bookmark
        };
        dispatch(updateProduct(newObject));
    };

    if (categori && data) {
        return (
            <>
                <div className="col-md-4 p-2">
                    <div
                        className="card m-2 shadow bg-body-tertiary"
                        style={{ minWidth: "100%", maxHeight: "385px" }}
                    >
                        {isLoggedIn && (
                            <BookMark
                                status={data.bookmark}
                                onClick={toogleBookmark}
                            />
                        )}

                        <img
                            src={data.image}
                            className="card-img-top"
                            height="250px"
                            alt="icon"
                        />

                        <div className="card-body">
                            <h5>
                                <a
                                    className="nav-link text-dark"
                                    href={`/product/${data._id}`}
                                >
                                    {data.name}
                                </a>
                            </h5>
                        </div>
                        <div className="d-flex align-items-end m-2 p-2">
                            <h5>{`${Number(data.price).toFixed(2)} ₽`}</h5>
                            {isLoggedIn && (
                                <a
                                    onClick={() => onClick(data)}
                                    className="btn btn-outline-success ms-auto"
                                >
                                    <i className="bi bi-cart"></i>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    } else return <SpinerLoader />;
};
Product.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func
};
export default Product;
