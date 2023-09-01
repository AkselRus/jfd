import React, { useState } from "react";
import _ from "lodash";
import { paginate } from "../../../utils/paginate";
import Paginate from "../pagination";
import AddProduct from "./addProduct";
import ProductTable from "../../page/products/productTable";
import { useSelector } from "react-redux";
import { getProductsList } from "../../../store/products";
import SpinerLoader from "../../SpinerLoader";

const AdminPanel = () => {
    const products = useSelector(getProductsList());
    const [searchProd, setSearchProd] = useState("");
    const [selectedCategory, setSelectedCategory] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearchProd = ({ target }) => {
        setSelectedCategory(undefined);
        setSearchProd(target.value);
    };
    if (products) {
        const filteredProducts = searchProd
            ? products.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchProd.toLowerCase()) !== -1
              )
            : selectedCategory
            ? products.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedCategory)
              )
            : products;
        const sortedProd = _.orderBy(
            filteredProducts,
            [sortBy.path],
            [sortBy.order]
        );
        const productCrop = paginate(sortedProd, currentPage, pageSize);

        const count = filteredProducts.length;
        return (
            <div>
                <section>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col">
                                <div className="card">
                                    <div className="card-body p-4">
                                        <div className="row">
                                            <AddProduct />
                                            <div className="col-lg-7">
                                                <div className="card mb-3">
                                                    <div className="card-body">
                                                        <div className="justify-content-between">
                                                            <div className="flex-row align-items-center">
                                                                <div className="">
                                                                    <input
                                                                        type="text"
                                                                        name="searchProd"
                                                                        style={{
                                                                            boxShadow:
                                                                                "none",
                                                                            outline:
                                                                                "none"
                                                                        }}
                                                                        placeholder="Поиск..."
                                                                        className="form-control"
                                                                        onChange={
                                                                            handleSearchProd
                                                                        }
                                                                        value={
                                                                            searchProd
                                                                        }
                                                                    />
                                                                    <div className="p-3">
                                                                        <ProductTable
                                                                            products={
                                                                                productCrop
                                                                            }
                                                                            onSort={
                                                                                handleSort
                                                                            }
                                                                            selectedSort={
                                                                                sortBy
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex justify-content-center">
                                                                        <Paginate
                                                                            itemsCount={
                                                                                count
                                                                            }
                                                                            pageSize={
                                                                                pageSize
                                                                            }
                                                                            currentPage={
                                                                                currentPage
                                                                            }
                                                                            onPageChange={
                                                                                handlePageChange
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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
    }
    return <SpinerLoader />;
};

export default AdminPanel;
