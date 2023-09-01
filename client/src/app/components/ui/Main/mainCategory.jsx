import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCategories } from "../../../store/categories";
import NavProduct from "../Navigation/navProduct";

const MainCategory = ({
    onClick,
    handleCategorySelect,
    selectedCateg,
    label
}) => {
    const categories = useSelector(getCategories());

    return (
        categories && (
            <>
                <nav
                    id="sidebarMenu"
                    className="navbar navbar-expand-lg col-lg-2 d-block sidebar border-end"
                >
                    {/* <div className="sticky-top"> */}
                    <div className="">
                        <div className="py-3">
                            <span className="fs-4">{label}</span>
                        </div>
                        {categories && (
                            <NavProduct
                                items={categories}
                                onItemSelect={handleCategorySelect}
                                selectedItem={selectedCateg}
                                onClick={onClick}
                            />
                        )}
                    </div>
                </nav>
            </>
        )
    );
};
MainCategory.propTypes = {
    onClick: PropTypes.func,
    selectedCateg: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    handleCategorySelect: PropTypes.func,
    label: PropTypes.string
};
export default MainCategory;
