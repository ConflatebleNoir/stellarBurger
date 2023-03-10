import ModarOverlayStyles from './ModalOverlay.module.css'
import { FC } from 'react'
import { IModalOverlayProp } from '../../services/types'

const ModalOverlay: FC<IModalOverlayProp> = ({ children, handleModalClose }) => {

    return (
        <div onClick={handleModalClose} className={ModarOverlayStyles.overlay}>
            {children}
        </div>
    )
}

export default ModalOverlay