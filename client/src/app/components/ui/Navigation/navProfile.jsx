import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser, logOut } from "../../../store/users";
function NavProfile() {
    const dispatch = useDispatch();
    const currentUser = useSelector(getUser());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    const handleLoguot = () => dispatch(logOut());

    return (
        <>
            <div className="dropdown" onClick={toggleMenu}>
                <div className="btn dropdown-toggle d-flex align-items-center">
                    <div className="me-2 text-white">{currentUser.name}</div>
                    <img
                        src={currentUser.image}
                        alt=""
                        height="40"
                        className="img-responsive rounded-circle"
                    />
                </div>
                <div
                    className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}
                >
                    <Link
                        to={`/users/${currentUser._id}`}
                        className="dropdown-item"
                    >
                        Profile
                    </Link>
                    <Link
                        to=""
                        className="dropdown-item"
                        onClick={handleLoguot}
                    >
                        Log Out
                    </Link>
                    {currentUser._id === "rS7NxORHx4XXh59hTVl2IiIgpkQ2" && (
                        <Link to="/admin" className="dropdown-item">
                            Add Product
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}

export default NavProfile;
