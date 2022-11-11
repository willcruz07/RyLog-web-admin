/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo } from 'react';
import { FaSignOutAlt, FaFileInvoiceDollar, FaUsers, FaSync, FaChartPie, FaFolderPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import ReactToolTip from 'react-tooltip';
import { signOut } from 'firebase/auth';
import { useMenuContext } from '../../hooks/MenuContextProvider';
import Logo from '../../assets/img/Logo.png';
import { useWindowSize } from '../../hooks/useWindowSize';
import { auth } from '../../firebase/config';

import './styles.scss';

export const Nav: React.FC = () => {
    const { menuIsOpen, closeMenu } = useMenuContext();
    const { width } = useWindowSize();

    const handleSignOut = () => {
        signOut(auth);
    };

    const getStateMenu = useMemo(() => {
        if (menuIsOpen) {
            return 'menu-open';
        }

        if (width && (width >= 700) && !menuIsOpen) {
            return 'menu-close';
        }

        return '';
    }, [menuIsOpen, width]);

    const tooltipShow = useMemo(() => getStateMenu === 'menu-close', [getStateMenu]);

    return (
        <>
            <div className={`container-nav ${getStateMenu}`}>
                <div className="container-logo">
                    <img src={Logo} alt="Logo" />
                    <h4>RyLog</h4>
                </div>
                <nav className="container-nav__nav">
                    <ul>
                        <li data-tip={tooltipShow ? 'Dashboard' : ''}>
                            <NavLink
                                to="dashboard"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                <FaChartPie />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>

                        {/* <li data-tip={tooltipShow ? 'Financeiro' : ''}>
                            <NavLink
                                to="financial"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                <FaFileInvoiceDollar />
                                <span>Financeiro</span>
                            </NavLink>
                        </li> */}

                        <li data-tip={tooltipShow ? 'Movimentações' : ''}>
                            <NavLink
                                to="movement"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                <FaSync />
                                <span>Movimentações</span>
                            </NavLink>
                        </li>

                        <li data-tip={tooltipShow ? 'Cadastros' : ''}>
                            <NavLink
                                to="records"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                <FaFolderPlus />
                                <span>Cadastros</span>
                            </NavLink>
                        </li>

                        {/* <li data-tip={tooltipShow ? 'Parceiros' : ''}>
                            <NavLink
                                to="partners"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                <FaUsers />
                                <span>Parceiros</span>
                            </NavLink>
                        </li> */}

                        <li data-tip={tooltipShow ? 'Sair' : ''}>
                            <NavLink
                                to="/"
                                onClick={handleSignOut}
                            >
                                <FaSignOutAlt />
                                <span>Sair</span>
                            </NavLink>
                        </li>

                    </ul>
                </nav>

                {/* <ReactToolTip
                    backgroundColor="#00044C"
                    textColor="#FCFCFE"
                    place="right"
                    type="dark"
                    effect="solid"
                /> */}

            </div>
            <div onClick={closeMenu} className={`backdrop ${getStateMenu}`} />

        </>
    );
};
