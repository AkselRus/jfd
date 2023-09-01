import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../../store/users";

const CountCart = ({ data }) => {
    const user = useSelector(getUser());
    const dispatch = useDispatch();
    const [count, setCount] = useState(data.count);
    const span = useRef();

    const maxGuests = 10;
    const minGuests = 1;

    useEffect(() => {
        const newData = { ...data, count: count };
        const newUser = {
            ...user,
            purchases: user.purchases.map((el) =>
                el._id === newData._id ? newData : el
            )
        };
        dispatch(updateUser(newUser));
    }, [count]);

    const decrementCount = () => {
        if (count > minGuests) setCount(count - 1);
    };

    const incrementCount = () => {
        if (count < maxGuests) setCount(count + 1);
        else if (count > maxGuests) setCount(maxGuests);
    };

    return (
        <form>
            <div className="d-flex flex-row align-items-center">
                <div className="m-2">
                    <b>Количество: </b>
                </div>
                <input
                    type="button"
                    onClick={() => decrementCount()}
                    value="-"
                    className="cursor-pointer btn btn-secondary"
                />
                <div className="border py-2 rounded m-1">
                    <span id="hide" ref={span} className="m-2 p-2">
                        {count}
                    </span>
                </div>
                <input
                    type="button"
                    onClick={() => incrementCount()}
                    value="+"
                    className="cursor-pointer btn btn-secondary"
                />
            </div>
        </form>
    );
};

CountCart.propTypes = {
    data: PropTypes.object
};
export default CountCart;
