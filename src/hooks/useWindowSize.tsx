import { useEffect, useState } from 'react';

interface ISize {
    width: number | undefined;
    height: number | undefined;
}

export const useWindowSize = (): ISize => {
    const [windowSize, setWindowSize] = useState<ISize>({
        height: undefined,
        width: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            const vh = window.innerHeight;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};
