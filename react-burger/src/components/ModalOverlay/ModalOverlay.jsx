import React from 'react'
import ModarOverlayStyles from './ModalOverlay.module.css'

const ModalOverlay = () => {

    return (
        <div className={ModarOverlayStyles.overlay} onClick={handlePopupClose}></div>
    )
}

export default ModalOverlay