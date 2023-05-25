import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useScrollLock } from "@/hooks/useScrollLock";
import React, { useContext, useEffect, useState } from "react";

export const AppContext = React.createContext({
    sidebarOpened: false,
    toogleSidebar: () => {},
    theme: "night",
    toogleTheme: () => {},
});

export function AppProvider({ children }) {
    const [sidebarOpened, setSidebarOpened] = useState(false);

    const [theme, setTheme] = useLocalStorage("theme", "night");

    const { lockScroll, unlockScroll } = useScrollLock();

    function toogleSidebar() {
        setSidebarOpened((o) => !o);
    }

    function toogleTheme() {
        setTheme((t) =>
            t == "night" ? "lofi" : t == "lofi" ? "night" : "night"
        );
    }

    useEffect(() => {
        if (sidebarOpened) lockScroll();
        else unlockScroll();
    }, [sidebarOpened]);

    useEffect(() => {
        document
            .getElementsByTagName("html")[0]
            .setAttribute("data-theme", theme);
    }, [theme]);

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
