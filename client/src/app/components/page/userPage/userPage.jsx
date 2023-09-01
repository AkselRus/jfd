import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserCard from "./userCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser, logOut } from "../../../store/users";
import SpinerLoader from "../../SpinerLoader";

const UserPage = () => {
    const dispatch = useDispatch();
    // const select = useSelector(deleteUser());
    const user = useSelector(getUser());
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function dataBirthDay(data) {
        const date = new Date(data);
        const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
            date
        );
        const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
            date
        );
        const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
            date
        );
        const newDate = `${day}-${month}-${year}`;
        return newDate;
    }

    const handleUserDelete = async () => {
        await deleteUser();
        setShow((prev) => !prev);
        dispatch(logOut());
    };

    if (user) {
        return (
            <div className="container py-5">
                <div className="row gutters-sm">
                    <div className="col-md-4">
                        <UserCard />
                    </div>
                    <div className="card col-md-8 mb-3">
                        <div className="card-body">
                            <div className="">
                                <div className="d-flex justify-content-between">
                                    <p className="mb-2 fs-4">
                                        <strong>{user.name}</strong>
                                    </p>
                                    <p className="mb-2">
                                        <button
                                            className="btn btn-danger"
                                            onClick={handleShow}
                                        >
                                            delete
                                        </button>
                                    </p>
                                </div>

                                <h6>{`Дата рождения: ${dataBirthDay(
                                    user.birthDay
                                )}`}</h6>
                                <h6>{`Пол: ${user.sex}`}</h6>
                            </div>
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal title</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Вы действительно хотите удалить акаунт?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={handleClose}
                                    >
                                        Нет
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handleUserDelete}
                                    >
                                        Да
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <SpinerLoader />;
    }
};

export default UserPage;
