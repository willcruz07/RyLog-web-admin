import React, { useRef } from 'react';
import { TAlert } from '../../models/types';
import { ButtonPrimary } from '../ButtonPrimary';
import { Modal } from '../Modal';

import './styles.scss';

interface IMessage {
    isVisible: boolean;
    onClose: (value: false) => void;
    onAccept?: (value: false) => void;
    title?: string;
    message: string;
    type: TAlert;
}

interface IDialog {
    isVisible: boolean;
    onDismiss: (value: false) => void;
    onAccept: (value: false) => void;
    title?: string;
    message: string;
}

export const Message: React.FC<IMessage> = ({ isVisible, message, onClose, title, type }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <Modal
            isVisible={isVisible}
            onClose={onClose}
            disableBackdropClose
            hideCloseButton
        >
            <div className={`container-message button-${type}`}>
                <div className="container-message__message">
                    <h1>{title}</h1>
                    <p>{message}</p>
                </div>

                <ButtonPrimary
                    ref={buttonRef}
                    onClick={() => onClose(false)}
                    title="Ok"
                />

            </div>
        </Modal>
    );
};

export const Dialog: React.FC<IDialog> = ({ isVisible, message, onDismiss, title, onAccept }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <Modal
            isVisible={isVisible}
            onClose={onDismiss}
            disableBackdropClose
            hideCloseButton
        >
            <div className="container-message">
                <div className="container-message__message">
                    <h1>{title}</h1>
                    <p>{message}</p>
                </div>

                <div className="container-message__action">
                    <div className="dismiss">
                        <ButtonPrimary
                            ref={buttonRef}
                            onClick={() => onDismiss(false)}
                            title="Não"
                        />
                    </div>
                    <div className="accept">
                        <ButtonPrimary
                            ref={buttonRef}
                            onClick={() => onAccept(false)}
                            title="Sim"
                        />
                    </div>
                </div>

            </div>
        </Modal>
    );
};
