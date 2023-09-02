import React from "react";
import {
    Container,
    Navbar,
    Nav,
    ListGroup,
    ListGroupItem
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn, getUser, logOut } from "../../../store/users";
import { Offcanvas } from "bootstrap";
import { getListBookMark, updateProduct } from "../../../store/products";

const navBar = () => {
    const dispatch = useDispatch();
    const handleLoguot = () => dispatch(logOut());
    const user = useSelector(getUser());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const shopList = user?.purchases;

    const listBookmark = useSelector(getListBookMark());

    const handleClickDelete = (id) => {
        if (isLoggedIn && listBookmark && id) {
            const arr = listBookmark || [];
            const prod = arr.filter((p) => p._id === id);
            const newProd = { ...prod[0], bookmark: false };
            dispatch(updateProduct(newProd));
        } else console.log("error bookmark");
    };

    const offcanvasElementList = Array.prototype.slice.call(
        document.querySelectorAll(".offcanvas")
    );
    offcanvasElementList.map(function (offcanvasEl) {
        return new Offcanvas(offcanvasEl);
    });

    const countShopList = shopList?.length;

    return (
        <>
            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
            >
                {
                    <>
                        <div className="offcanvas-header">
                            <div className="d-flex justify-content-between align-items-end">
                                <img
                                    src={user?.image}
                                    className="img-fluid border rounded-circle"
                                    width="45"
                                    alt="Avatar"
                                />
                                <h4 id="offcanvasRightLabel">{user?.name}</h4>
                            </div>
                            <button
                                type="button"
                                className="btn-close text-reset"
                                data-bs-dismiss="offcanvas"
                                data-bs-theme="secondary"
                                aria-label="Закрыть"
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                            <h4>Отложенные товары</h4>
                            {listBookmark && (
                                <ListGroup>
                                    {listBookmark.map((el) => (
                                        <ListGroupItem
                                            key={el._id}
                                            className="d-flex justify-content-between align-items-center mb-2"
                                        >
                                            {el.name}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleClickDelete(el._id)
                                                }
                                                className="btn-close text-reset ms-auto"
                                                aria-label="Закрыть"
                                            ></button>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </div>
                    </>
                }
            </div>

            <Navbar
                collapseOnSelect
                expand="lg"
                bg="dark"
                variant="dark"
                sticky="top"
            >
                <Container>
                    <Navbar.Brand>Logo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/" className="nav-link text-white">
                                Главная страница
                            </Link>
                        </Nav>
                        <Nav>
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        className="me-2"
                                        type="button"
                                        to="/admin"
                                    >
                                        <h3>
                                            <i className="bi bi-gear"></i>
                                        </h3>
                                    </Link>
                                    <Link
                                        className="position-relative me-2"
                                        to="/cart"
                                    >
                                        <h3>
                                            <i className="bi bi-cart"></i>
                                            {countShopList > 0 && (
                                                <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger fs-6">
                                                    {countShopList}
                                                </span>
                                            )}
                                        </h3>
                                    </Link>

                                    <Link
                                        className="me-2"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasRight"
                                        aria-controls="offcanvasRight"
                                    >
                                        <h3>
                                            <i className="bi bi-heart"></i>
                                        </h3>
                                    </Link>
                                    <Link
                                        className="me-2"
                                        to={`/user/${user?._id}`}
                                    >
                                        <h3>
                                            <i className="bi bi-person-circle"></i>
                                        </h3>
                                    </Link>
                                    <Link
                                        className="me-2"
                                        onClick={handleLoguot}
                                    >
                                        <h3>
                                            <i className="bi bi-box-arrow-right"></i>
                                        </h3>
                                    </Link>
                                </>
                            ) : (
                                <Link to="/auth/login">
                                    <h3>
                                        <i className="bi bi-person"></i>
                                    </h3>
                                </Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default navBar;
