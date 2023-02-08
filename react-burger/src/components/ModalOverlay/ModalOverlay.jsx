import React from 'react'
import PropTypes from 'prop-types'
import ModarOverlayStyles from './ModalOverlay.module.css'

const ModalOverlay = ({ children, handleModalClose }) => {

    return (
        <div onClick={handleModalClose} className={ModarOverlayStyles.overlay}>
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func,
}

export default ModalOverlay