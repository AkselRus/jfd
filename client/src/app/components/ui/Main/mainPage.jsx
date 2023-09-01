import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList } from "../../../store/products";

import ProductList from "../../page/products/productList";
import MainCategory from "./mainCategory";
import SpinerLoader from "../../SpinerLoader";
import Carusel from "../../Carusel";
import { getUser, updateUser } from "../../../store/users";
import Search from "../Search";

const MainPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(getProductsList());
    const user = useSelector(getUser());

    const [searchProd, setSearchProd] = useState("");
    const [selectedCateg, setSelectedCateg] = useState();
    const handleCategorySelect = (item) => {
        if (searchProd !== "") setSearchProd("");
        setSelectedCateg(item);
    };
    const handleSearchProd = ({ target }) => {
        setSearchProd(target.value);
    };
    const clearFilter = () => {
        setSelectedCateg();
    };
    const handleClickPay = (data) => {
        const newUser = {
            ...user,
            purchases: [
                ...user.purchases,
                { prodId: data._id, count: 1, price: data.price }
            ]
        };
        dispatch(updateUser(newUser));
    };

    if (products) {
        const filteredProducts = searchProd
            ? products.filter(
                  (prod) =>
                      prod.name
                          .toLowerCase()
                          .indexOf(searchProd.toLowerCase()) !== -1
              )
            : selectedCateg
            ? products.filter((prod) => prod.categories === selectedCateg._id)
            : products;

        // const newProducts = selectedCateg ? filteredProducts : products;
        const count = filteredProducts?.length;

        return (
            <>
                <main>
                    {/* menu */}
                    <div className="row">
                        <Carusel />
                        <Search
                            handleChange={handleSearchProd}
                            serch={searchProd}
                        />
                        <MainCategory
                            label="Категории"
                            selectedCateg={selectedCateg}
                            onClick={clearFilter}
                            handleCategorySelect={handleCategorySelect}
                        />
                        <ProductList
                            data={filteredProducts}
                            handleClic={handleClickPay}
                            setCateg={setSelectedCateg}
                            count={count}
                            searchProd={searchProd}
                        />
                    </div>
                </main>
            </>
        );
    }
    return <SpinerLoader />;
};

export default MainPage;
