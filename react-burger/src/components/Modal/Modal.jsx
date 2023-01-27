import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import ModalStyles from './Modal.module.css';
import { CloseIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay'


const modalRoot = document.getElementById("modals");

const Modal = ({ children, open, onClose, title = '' }) => {
    const element = useMemo(() => document.createElement('div'), []);

    useEffect(() => {
        if (open) {
            modalRoot.appendChild(element);
            const handleEscapeKey = (evt) => {
                if (evt.key === 'Escape') {
                    onClose(false);
                }
            };

            document.addEventListener('keydown', handleEscapeKey);
            return () => {
                document.removeEventListener('keydown', handleEscapeKey);
                modalRoot.removeChild(element);
            };
        };
    });

    if (open) {
        return createPortal(
            <>
                <ModalOverlay
                    onClick={onClose}
                    handleEscapeKey={onClose} >
                    <div onClick={(evt) => evt.stopPropagation()} className={`${ModalStyles.container} pt-10 pr-10 pl-10 pb-15`}>

                        {title ? (
                            <header className={ModalStyles.header__ingredient}>
                                <h2 className='text text_type_main-large'>{title}</h2>
                                <button className={ModalStyles.button}>
                                    <CloseIcon type="primary" onClick={onClose} />
                                </button>
                            </header>)
                            : (
                                <header className={ModalStyles.header__order}>
                                    <button className={ModalStyles.button}>
                                        <CloseIcon type="primary" onClick={onClose} />
                                    </button>
                                </header>
                            )}

                        {children}
                    </div>
                </ModalOverlay>
            </>
            , element
        );
    }

    return null;
}

export default Modal;