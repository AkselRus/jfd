import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxField from "../common/form/checkBoxField";
import { Link } from "react-router-dom";
import { getAuthErrors, logIn } from "../../store/users";

const LoginForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const loginError = useSelector(getAuthErrors());

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(logIn({ payload: data }));
    };
    return (
        <>
            <div className="align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col">
                            <h1
                                className="text-center
                            "
                            >
                                Login
                            </h1>
                            <form
                                className="bg-white  rounded-5 shadow-5-strong p-5"
                                onSubmit={handleSubmit}
                            >
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <TextField
                                    label="Пароль"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                />
                                <div className="row mb-4">
                                    <div className="col d-flex justify-content-start">
                                        <CheckBoxField
                                            value={data.stayOn}
                                            onChange={handleChange}
                                            name="stayOn"
                                        >
                                            Оставаться в системе
                                        </CheckBoxField>
                                    </div>
                                </div>

                                {loginError && (
                                    <p className="text-danger">{loginError}</p>
                                )}
                                <button
                                    className="btn btn-primary w-100"
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Enter
                                </button>
                            </form>
                            <div>
                                <Link to="/auth/register">Создать аккаунт</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
