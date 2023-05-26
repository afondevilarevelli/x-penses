import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useScrollLock } from "@/hooks/useScrollLock";
import React, { useContext, useEffect, useState } from "react";

export const DARK_THEME = "night";
export const LIGHT_THEME = "cmyk";

export const AppContext = React.createContext({
    sidebarOpened: false,
    toogleSidebar: () => {},
    theme: DARK_THEME,
    toogleTheme: () => {},
});

export function AppProvider({ children }) {
    const [sidebarOpened, setSidebarOpened] = useState(false);

    const [theme, setTheme] = useLocalStorage("theme", DARK_THEME);

    const { lockScroll, unlockScroll } = useScrollLock();

    function toogleSidebar() {
        setSidebarOpened((o) => !o);
    }

    function toogleTheme() {
        setTheme((t) =>
            t == DARK_THEME
                ? LIGHT_THEME
                : t == LIGHT_THEME
                ? DARK_THEME
                : DARK_THEME
        );
    }

    useEffect(() => {
        if (sidebarOpened) lockScroll();
        else unlockScroll();
    }, [sidebarOpened]);

    return (
        <AppContext.Provider
            value={{
                sidebarOpened,
                toogleSidebar,
                theme,
                toogleTheme,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default function useAppContext() {
    return useContext(AppContext);
}
