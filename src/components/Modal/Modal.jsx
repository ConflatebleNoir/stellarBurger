import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import ModalStyles from './Modal.module.css';
import { CloseIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { elementType, funcType, stringType } from "../../utils/types";


const modalRoot = document.getElementById("modals");

const Modal = ({ children, handleModalClose, title = '' }) => {
    const element = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        modalRoot.appendChild(element);
        const handleEscapeKey = (evt) => {
            if (evt.key === 'Escape') {
                handleModalClose();
            };
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            modalRoot.removeChild(element);
        };
    }, [handleModalClose]);

    return createPortal(
        <ModalOverlay
            handleModalClose={handleModalClose}
            handleEscapeKey={handleModalClose}
        >
            <div onClick={(evt) => evt.stopPropagation()} className={`${ModalStyles.container} pt-10 pr-10 pl-10 pb-15`}>
                <header className={title ? ModalStyles.header__title : ModalStyles.header__empty}>
                    {title ? <h2 className='text text_type_main-large'>{title}</h2> : null}
                    <button onClick={handleModalClose} className={ModalStyles.button}>
                        <CloseIcon type="primary" onClick={handleModalClose} />
                    </button>
                </header>
                {children}
            </div>
        </ModalOverlay>
        , element
    );
}

Modal.propTypes = {
    children: elementType.isRequired,
    handleModalClose: funcType.isRequired,
    title: stringType,
}

export default Modal;