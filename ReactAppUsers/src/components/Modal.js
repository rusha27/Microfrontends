import React from 'react';
import "./modal.css"

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <span className='form'>{children}</span>
                
            </div>
        </div>
    );
};

export default Modal;
