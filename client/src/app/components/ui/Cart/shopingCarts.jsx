import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginate } from "../../../utils/paginate";
import CartProduct from "./cartProduct";
import SortBy from "../SortBy";
import Pagination from "../pagination";
import CardPay from "./CardPay";
import { getUser, updateUser } from "../../../store/users";
import SpinerLoader from "../../SpinerLoader";

const ShopingCarts = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser());
    const shopList = user?.purchases;
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;

    const [sort, setSort] = useState(shopList);
    useEffect(() => {
        setSort(shopList);
    }, [shopList]);

    const handleSort = (params) => {
        if (params === "max") {
            const sortData = shopList.toSorted(
                (a, b) => parseFloat(b.price) - parseFloat(a.price)
            );
            return setSort(sortData);
        }
        if (params === "min") {
            const sortData = shopList.toSorted(
                (a, b) => parseFloat(a.price) - parseFloat(b.price)
            );

            return setSort(sortData);
        }
        if (params === "bookmark") {
            const trueFirst = shopList.toSorted(
                (a, b) => Number(b.bookmark) - Number(a.bookmark)
            );

            return setSort(trueFirst);
        } else return setSort(shopList);
    };

    useEffect(() => {
        if (!shopList) {
            dispatch(getUser());
        }
    }, [shopList?.length]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleDelete = (id) => {
        const newShopList = shopList.filter((el) => el._id !== id);
        const newUser = { ...user, purchases: newShopList };
        dispatch(updateUser(newUser));
    };

    const productCrop = paginate(sort, currentPage, pageSize);
    const count = shopList?.length;
    if (productCrop) {
        return (
            <div>
                <section className="py-5 h-custom">
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col">
                                <div className="card">
                                    <div className="card-body p-4">
                                        <div className="row">
                                            <div className="col-lg-7">
                                                <h5>
                                                    <a
                                                        href="/"
                                                        className="text-body"
                                                    >
                                                        <i className="fas fa-long-arrow-alt-left me-2"></i>
                                                        Назад в меню
                                                    </a>
                                                </h5>
                                                <hr />

                                                <SortBy
                                                    onSort={handleSort}
                                                    label="Корзина"
                                                />

                                                {shopList?.length !== 0 ? (
                                                    productCrop.map((prod) => (
                                                        <CartProduct
                                                            key={prod._id}
                                                            item={prod}
                                                            onClick={
                                                                handleDelete
                                                            }
                                                        />
                                                    ))
                                                ) : (
                                                    <p className="text-center">
                                                        Корзина пуста
                                                    </p>
                                                )}
                                                <div className="d-flex justify-content-center">
                                                    <Pagination
                                                        itemsCount={
                                                            count || currentPage
                                                        }
                                                        pageSize={pageSize}
                                                        currentPage={
                                                            currentPage
                                                        }
                                                        onPageChange={
                                                            handlePageChange
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-5">
                                                <div className="card bg-primary text-white rounded-3">
                                                    <CardPay />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    } else return <SpinerLoader />;
};

export default ShopingCarts;
