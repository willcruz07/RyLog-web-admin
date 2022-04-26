/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo } from 'react';
import { FaSignOutAlt, FaUserFriends, FaAddressCard, FaFileAlt, FaChartPie } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
import { useMenuContext } from '../../hooks/MenuContextProvider';
// import { auth } from '../../firebase/config';

import './styles.scss';
import { useAppContext } from '../../hooks/AppContext';

export const Nav: React.FC = () => {
    const { state } = useAppContext();
    const { menuIsOpen, closeMenu } = useMenuContext();

    const handleSignOut = () => {
        // signOut(auth);
        console.log('SAIR');
    };

    const getMenuStatus = useMemo(() => (menuIsOpen ? 'openMenu' : ''), [menuIsOpen]);

    return (
        <>
            <div className={`container-nav ${getMenuStatus}`}>
                <nav className="container-nav__nav">
                    <ul>
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                <FaChartPie />
                                Dashboard
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/exams"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                <FaFileAlt />
                                Exames
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/access-request"
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                <FaAddressCard />
                                Solicitações de acesso
                            </NavLink>
                        </li>

                        {state.user.data.isAdmin && (
                            <li>
                                <NavLink
                                    to="/users"
                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                >
                                    <FaUserFriends />
                                    Usuários
                                </NavLink>
                            </li>
                        )}

                        <li>
                            <NavLink
                                to="/"
                                onClick={handleSignOut}
                            >
                                <FaSignOutAlt />
                                Sair
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </div>
            <div onClick={closeMenu} className={`backdrop ${getMenuStatus}`} />

        </>
    );
};
