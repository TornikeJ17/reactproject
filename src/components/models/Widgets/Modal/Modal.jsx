import React from "react";
import cssStyles from './Modal.module.scss';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={cssStyles.modalOverlay}>
            <div className={cssStyles.modalContent}>
                <button className={cssStyles.modalCloseButton} onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;