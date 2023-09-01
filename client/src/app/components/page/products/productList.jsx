import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Product from "./product";
import SpinerLoader from "../../SpinerLoader";
import SortBy from "../../ui/SortBy";

const ProductList = ({ data, handleClic }) => {
    const [sort, setSort] = useState(data);
    useEffect(() => {
        setSort(data);
    }, [data]);

    const handleSort = (params) => {
        if (params === "max") {
            const sortData = data.toSorted(
                (a, b) => parseFloat(b.price) - parseFloat(a.price)
            );
            return setSort(sortData);
        }
        if (params === "min") {
            const sortData = data.toSorted(
                (a, b) => parseFloat(a.price) - parseFloat(b.price)
            );

            return setSort(sortData);
        }
        if (params === "bookmark") {
            const trueFirst = data.toSorted(
                (a, b) => Number(b.bookmark) - Number(a.bookmark)
            );

            return setSort(trueFirst);
        } else return setSort(data);
    };

    return (
        <main className="col-md-8 ms-sm-auto col-lg-10 px-md-4 ">
            <div className="align-items-center pt-3 pb-2 mb-3">
                <div className="table-responsive">
                    <SortBy onSort={handleSort} label="Меню" />

                    {data ? (
                        <div className="row w-100 ">
                            {sort?.map((p) => (
                                <Product
                                    key={p._id}
                                    data={p}
                                    onClick={handleClic}
                                />
                            ))}
                        </div>
                    ) : (
                        <SpinerLoader />
                    )}
                </div>
            </div>
        </main>
    );
};
ProductList.propTypes = {
    data: PropTypes.array,
    handleClic: PropTypes.func
};
export default ProductList;
