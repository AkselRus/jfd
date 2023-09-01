import React from "react";
import { getUser } from "../../../store/users";

import Total from "./Total";
import { useSelector } from "react-redux";

const CardPay = () => {
    const currentUser = useSelector(getUser());

    return (
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="">Карта покупателя</h5>
                <img
                    src={currentUser?.image}
                    className="img-fluid rounded-3"
                    width="45"
                    alt="Avatar"
                />
            </div>

            <form className="mt-4">
                <div className="form-outline form-white mb-4">
                    <input
                        type="text"
                        id="typeName"
                        className="form-control form-control-lg"
                        siez="17"
                        placeholder="Cardholder's Name"
                    />
                    <label className="form-label" htmlFor="typeName">
                        Имя владельца карты
                    </label>
                </div>

                <div className="form-outline form-white mb-4">
                    <input
                        type="text"
                        id="typeText"
                        className="form-control form-control-lg"
                        siez="17"
                        placeholder="1234 5678 9012 3457"
                        minLength="19"
                        maxLength="19"
                    />
                    <label className="form-label" htmlFor="typeText">
                        Номер карты
                    </label>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="form-outline form-white">
                            <input
                                type="text"
                                id1="typeExp"
                                className="form-control form-control-lg"
                                placeholder="MM/YY"
                                size="7"
                                id="exp"
                                minLength="7"
                                maxLength="7"
                            />
                            <label className="form-label" htmlFor="typeExp">
                                Срок действия
                            </label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-outline form-white">
                            <input
                                type="password"
                                id="typeTextPass"
                                className="form-control form-control-lg"
                                placeholder="&#9679;&#9679;&#9679;"
                                size="1"
                                minLength="3"
                                maxLength="3"
                            />
                            <label
                                className="form-label"
                                htmlFor="typeTextPass"
                            >
                                Код
                            </label>
                        </div>
                    </div>
                </div>
            </form>

            <hr className="my-4" />

            <Total />
        </div>
    );
};

export default CardPay;
