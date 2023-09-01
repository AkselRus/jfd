import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearShopingCart } from "../../../store/cart";
import { getUser } from "../../../store/users";

const Total = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser());
    const shopList = user.purchases;

    const [sum, setSum] = useState(0);
    const newList = shopList
        ? shopList.map((el) => el.count * Number(el.price))
        : [];

    const handleFinish = () => {
        dispatch(clearShopingCart());
    };

    useEffect(() => {
        const sum = newList.reduce(add, 0);
        function add(accumulator, a) {
            return accumulator + a;
        }
        setSum(sum);
    }, [shopList]);

    return (
        shopList && (
            <>
                <div className="d-flex justify-content-between">
                    <p className="mb-2">Итоговая стоимость</p>
                    <p className="mb-2">{`${sum.toFixed(2)} ₽`}</p>
                </div>
                <div className="d-flex justify-content-end">
                    <a
                        type="button"
                        className="btn btn-info"
                        onClick={handleFinish}
                    >
                        <span>Оплатить</span>
                    </a>
                </div>
            </>
        )
    );
};

export default Total;
