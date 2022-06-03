import React from 'react';
import './AutoUploadImage.css';

const AutoUploadImage = ({ image, uploading }) => {
    return (
        <div style={{ position: 'relative' }}>
            <img className="img-fluid rounded mx-auto d-block mb-2" src={image} alt="post-attachment" />
            <div className="overlay" style={{ opacity: uploading ? 1 : 0 }}>
                <div className="d-flex justify-content-center h-100">
                    <div className="spinner-border text-light m-auto" />
                </div>
            </div>
        </div>
    );
};

export default AutoUploadImage;