import { useEffect, useMemo, FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import ModalStyles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { IModalProps } from "../../services/types/types";
import { useLocation } from "react-router-dom";

const Modal: FC<PropsWithChildren<IModalProps>> = ({ children, handleModalClose, number, title = '' }) => {
    const modalRoot = document.getElementById("modals") as HTMLElement;
    const element = useMemo(() => document.createElement('div'), []);
    const location = useLocation();

    useEffect(() => {
        modalRoot.appendChild(element);
        const handleEscapeKey = (evt: { key: string }) => {
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
        >
            <div onClick={(evt) => evt.stopPropagation()} className={`${ModalStyles.container} pt-10 pr-10 pl-10 pb-15`}>
                <header className={title ? ModalStyles.header__title : ModalStyles.header__empty}>
                    {title ? <h2 className='text text_type_main-large' style={number ? { fontSize: '24px' } : {}}>{title}</h2> : null}
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

export default Modal;