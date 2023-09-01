import React from "react";
import PropTypes from "prop-types";
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

export const MyUploadButton = ({ setFiles }) => (
    <UploadButton
        uploader={uploader}
        options={uploaderOptions}
        onComplete={setFiles}
    >
        {({ onClick }) => (
            <button className="btn btn-primary m-2" onClick={onClick}>
                Загрузить
            </button>
        )}
    </UploadButton>
);
MyUploadButton.propTypes = {
    setFiles: PropTypes.func
};
