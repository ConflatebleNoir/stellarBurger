import React from 'react'
import ModarOverlayStyles from './ModalOverlay.module.css'

const ModalOverlay = ({ children, onClick }) => {

    return (
        <div onClick={onClick} className={ModarOverlayStyles.overlay}>
            {children}
        </div>
    )
}

export default ModalOverlay