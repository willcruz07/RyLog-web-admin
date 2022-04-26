import React, { useCallback, useEffect, useState } from 'react';

import './styles.scss';

interface ILoaderProps {
    title?: string;
    isVisible: boolean;
}

interface ILoader {
    dark?: boolean;
}

export const Loader: React.FC<ILoader> = ({ dark }) => (
    <div className="container-loader ">
        <div className={`loader ${dark ? 'dark' : ''}`} />
    </div>
);

export const LoaderFullScreen: React.FC<ILoaderProps> = ({ title, isVisible }) => {
    const [onShow, setOnShow] = useState(false);
    const [onHidden, setOnHidden] = useState(true);

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
        <div className={`container-fullscreen-loader ${onShow ? 'active' : ''}`}>
            <div className="lds-ripple">
                <div />
                <div />
            </div>
            <span>{title}</span>
        </div>
    );
};
