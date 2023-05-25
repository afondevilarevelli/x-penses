import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useAppContext, { AppProvider } from "@/contexts/AppContext";
import { useUser } from "@/hooks/useUser";

export default function AuthenticatedLayout({ children }) {
    const user = useUser();
    const { sidebarOpened } = useAppContext();

    return (
        <div className="drawer drawer-mobile">
            <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
                checked={sidebarOpened}
                readOnly
            />
            <div className="drawer-content flex flex-col">
                <Navbar user={user} />

                <main className="p-6">{children}</main>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <Sidebar />
            </div>
        </div>
    );
}
