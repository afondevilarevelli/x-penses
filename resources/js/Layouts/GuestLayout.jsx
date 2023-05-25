import Logo from "@/Components/Logo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: `url("/images/welcome-bg.jpg")`,
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 w-[90vw] md:w-[50vw] xl:w-[30vw]">
                    <div>
                        <Link href="/">
                            <Logo size={150} />
                        </Link>
                    </div>

                    <div className="w-full  mt-6 px-6 py-4 bg-base-100 shadow-md overflow-hidden sm:rounded-lg">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
