import React from 'react';

import { FaBars } from 'react-icons/fa';
import { useMenuContext } from '../../hooks/MenuContextProvider';
// import { Logo } from '../Logo';

import './styles.scss';

export const Header: React.FC = () => {
    const { openMenu } = useMenuContext();

    return (
        <div className="container-header">
            {/* <Logo /> */}
            <div className="container-header__menu">
                <button type="button" onClick={openMenu}>
                    <FaBars />
                </button>
            </div>
        </div>
    );
};
