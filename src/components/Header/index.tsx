import React, { useCallback } from 'react';

import { FaBars, FaIndent, FaOutdent } from 'react-icons/fa';
import { useMenuContext } from '../../hooks/MenuContextProvider';
import { useWindowSize } from '../../hooks/useWindowSize';
// import { Logo } from '../Logo';

import './styles.scss';

export const Header: React.FC = () => {
    const { openMenu, closeMenu, menuIsOpen } = useMenuContext();
    const { width } = useWindowSize();

    const handleActionMenu = useCallback(() => (menuIsOpen ? closeMenu() : openMenu()), [menuIsOpen]);

    return (
        <div className="container-header">
            <div className="container-header__menu">
                {width && width <= 700 ? (
                    <button type="button" onClick={openMenu}>
                        <FaBars />
                    </button>
                ) : (
                    <button type="button" onClick={handleActionMenu}>
                        {!menuIsOpen ? <FaIndent /> : <FaOutdent /> }
                    </button>
                )}
            </div>
        </div>
    );
};
