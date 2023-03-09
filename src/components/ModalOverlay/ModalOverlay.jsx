import React from 'react'
import ModarOverlayStyles from './ModalOverlay.module.css'

const ModalOverlay = ({ children, handleModalClose }) => {

    return (
        <div onClick={handleModalClose} className={ModarOverlayStyles.overlay}>
            {children}
        </div>
    )
}

export default ModalOverlay