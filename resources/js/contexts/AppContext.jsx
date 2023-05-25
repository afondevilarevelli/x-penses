import { useScrollLock } from "@/hooks/useScrollLock";
import React, { useContext, useEffect, useState } from "react";

export const AppContext = React.createContext({
    sidebarOpened: false,
    toogleSidebar: () => {},
});

export function AppProvider({ children }) {
    const [sidebarOpened, setSidebarOpened] = useState(false);

    const { lockScroll, unlockScroll } = useScrollLock();

    function toogleSidebar() {
        setSidebarOpened((o) => !o);
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
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default function useAppContext() {
    return useContext(AppContext);
}
