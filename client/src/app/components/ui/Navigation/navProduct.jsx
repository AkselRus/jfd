import React from "react";
import PropTypes from "prop-types";

const NavProduct = ({ items, onItemSelect, selectedItem, onClick }) => {
    function MouseOver(event) {
        event.target.style.background = "silver";
    }
    function MouseOut(event) {
        event.target.style.background = "";
    }
    return (
        <div className="list-group list-group-flush scrollarea">
            {items.map((item) => (
                <a
                    className={
                        "list-group-item list-group-item-action rounded-pill lh-tight" +
                        (item === selectedItem ? " active" : "")
                    }
                    key={item._id}
                    aria-current="page"
                    onMouseOver={MouseOver}
                    onMouseOut={MouseOut}
                    onClick={() => onItemSelect(item)}
                    role="button"
                >
                    {item.name}
                </a>
            ))}
            <a
                className={
                    "list-group-item list-group-item-action rounded-pill lh-tight border-bottom"
                }
                onMouseOver={MouseOver}
                onMouseOut={MouseOut}
                onClick={() => onClick()}
            >
                Сбросить
            </a>
        </div>
    );
};
NavProduct.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func,
    onClick: PropTypes.func,
    selectedItem: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export default NavProduct;
