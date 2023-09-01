import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../../store/users";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

const uploader = Uploader({ apiKey: "free" });
const uploaderOptions = {
    multi: false,
    styles: {
        colors: {
            primary: "#377dff"
        }
    }
};

const UserCard = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getUser());
    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        if (selectedImage) {
            const newUser = {
                ...currentUser,
                image: selectedImage[0]?.fileUrl
            };
            dispatch(updateUser(newUser));
        }
    }, [selectedImage]);

    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser && (
                    <UploadButton
                        uploader={uploader}
                        options={uploaderOptions}
                        onComplete={setSelectedImage}
                    >
                        {({ onClick }) => (
                            <button
                                className="position-absolute top-0 end-0 btn btn-light btn-sm"
                                onClick={onClick}
                            >
                                <i className="bi bi-gear"></i>
                            </button>
                        )}
                    </UploadButton>
                )}

                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={currentUser.image}
                        className="rounded-circle"
                        width="250"
                    />
                </div>
            </div>
        </div>
    );
};

export default UserCard;
