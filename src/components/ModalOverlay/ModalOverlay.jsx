import React from 'react'
import ModarOverlayStyles from './ModalOverlay.module.css'
import { elementType, funcType } from '../../utils/types'

const ModalOverlay = ({ children, handleModalClose }) => {

    return (
        <div onClick={handleModalClose} className={ModarOverlayStyles.overlay}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: elementType.isRequired,
    onClick: funcType,
}

export default ModalOverlay