import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useAppContext, { AppProvider } from "@/contexts/AppContext";

export default function AuthenticatedLayout({ children }) {
    const { sidebarOpened, theme } = useAppContext();

    return (
        <div className="drawer drawer-mobile" data-theme={theme}>
            <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
                checked={sidebarOpened}
                readOnly
            />
            <div className="drawer-content flex flex-col min-h-screen">
                <Navbar />

                <main className="p-6 flex-1">{children}</main>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <Sidebar />
            </div>
        </div>
    );
}
