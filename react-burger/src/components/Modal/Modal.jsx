import React from 'react'
import ModalStyles from './Modal.module.css';
import { CloseIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay'


const Modal = ({ handlePopupClose, children, title = '' }) => {

    const modalRoot = document.getElementById("react-modals");

    useEffect(() => {
        const handleEscapeClose = (evt) => {
            if (evt.key === 'Escape') {
                handlePopupClose()
            }
        };

        document.addEventListener('keydown', handleEscapeClose);
        return () => {
            document.removeEventListener('keydown', handleEscapeClose);
        };
    }, [handlePopupClose])

    return createPortal(
        <>
            <div className={`${ModalStyles.container} pt-10 pr-10 pl-10 pb-15`}>
                <header className={ModalStyles.header}>
                    {title && (<h2 className='text text_type_main-large'>{title}</h2>)}
                    <button onClick={handlePopupClose}>
                        <CloseIcon type="primary" />
                    </button>
                </header>
                {children}
            </div>
            <ModalOverlay handlePopupClose={handlePopupClose} />
        </>
        , modalRoot
    );
}

export default Modal;