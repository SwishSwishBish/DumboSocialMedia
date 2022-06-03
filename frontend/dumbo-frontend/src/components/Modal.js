import React from 'react';
import { useTranslation } from 'react-i18next';

const Modal = (props) => {
    const { visible, onClickCancel, message, onClickOk, pendingApiCall, okButton } = props;
    const { t } = useTranslation();

    let className = 'fade modal top ';
    if (visible) {
        className += ' show d-block';
    }

    return (

        <div className={className} style={{ backgroundColor: '#0000007c' }} aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
            <div className="modal-dialog modal-lg ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-danger">{t('Warning!')}</h5>
                        <label type="button" className="btn-close" onClick={onClickCancel}></label>
                    </div>
                    <div className="modal-body">
                        {message}</div>
                    <div className="deletebutton  align-self-center modal-footer">

                        <button className="btn btn-outline-danger px-2" onClick={onClickOk} disabled={pendingApiCall}>
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                            {okButton}
                            <img src="https://img.icons8.com/stickers/30/000000/delete-forever.png" alt='Delete' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;