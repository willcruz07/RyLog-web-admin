import React, { useCallback, useEffect, useRef, useState } from 'react';

import './styles.scss';

interface IModalProps {
    isVisible: boolean;
    onClose: (value: false) => void;
    title?: string;
    disableBackdropClose?: boolean;
    hideCloseButton?: boolean;
    fullScreenMobile?: boolean;
}

export const Modal: React.FC<IModalProps> = ({ title, children, isVisible, onClose, disableBackdropClose, hideCloseButton, fullScreenMobile }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const [onShow, setOnShow] = useState(false);
    const [onHidden, setOnHidden] = useState(true);

    const clickBackDrop = (e: MouseEvent) => {
        if (e.target === modalRef.current && !disableBackdropClose) {
            onClose(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', clickBackDrop);
        return () => {
            window.removeEventListener('click', clickBackDrop);
        };
    }, []);

    const mountAndUnMount = useCallback(() => {
        setTimeout(() => {
            setOnShow(isVisible);
            if (isVisible) {
                setOnHidden(!isVisible);
            }
        }, 50);

        setTimeout(() => {
            if (!isVisible) {
                setOnHidden(!isVisible);
            }
        }, 500);
    }, [isVisible, onShow, onHidden]);

    useEffect(() => {
        mountAndUnMount();
    }, [isVisible]);

    if (!isVisible && !onShow && onHidden) {
        return null;
    }

    return (
        <div ref={modalRef} className={`modal ${onShow ? 'active' : ''}`}>
            <div className={`modal__content ${fullScreenMobile ? 'full-screen-mobile' : ''}`}>
                {!hideCloseButton && (
                    <div className="modal__action-page">
                        <span>{title}</span>
                        <button type="button" onClick={() => onClose(false)}>×</button>
                    </div>
                )}

                <div className={`modal${!hideCloseButton ? '__content-page-close-button-visible' : '__content-page-close-button'}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};
