import React, { createContext, useContext, useState } from 'react';

interface IMenu {
    menuIsOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
}

const MenuContext = createContext<IMenu>({} as IMenu);

export const MenuContextProvider: React.FC = ({ children }) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const handleMenuIsOpen = () => {
        setMenuIsOpen(true);
    };

    const handleMenuIsClose = () => {
        setMenuIsOpen(false);
    };

    return (
        <MenuContext.Provider value={{ menuIsOpen, openMenu: handleMenuIsOpen, closeMenu: handleMenuIsClose }}>
            {children}
        </MenuContext.Provider>

    );
};

export const useMenuContext = () => {
    const contextMenu = useContext(MenuContext);
    return contextMenu;
};
