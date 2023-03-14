import ModarOverlayStyles from './ModalOverlay.module.css'
import { FC, PropsWithChildren } from 'react'
import { IModalOverlayProp } from '../../services/types/types'

const ModalOverlay: FC<PropsWithChildren<IModalOverlayProp>> = ({ children, handleModalClose }) => {

    return (
        <div onClick={handleModalClose} className={ModarOverlayStyles.overlay}>
            {children}
        </div>
    )
}

export default ModalOverlay