import Logo from "@/Components/Logo";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: `url("/images/welcome-bg.jpg")`,
                }}
            >
                <div className="hero-overlay bg-opacity-60">
                    <div className="flex justify-between px-6 pt-4 items-center">
                        <Logo />
                        <div>
                            <Link href={route("login")}>
                                <button className="btn btn-active btn-link">
                                    Log in
                                </button>
                            </Link>

                            <Link href={route("register")}>
                                <button className="btn btn-primary">
                                    Register
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-2xl">
                        <h1 className="mb-5 text-6xl font-bold decoration-wavy">
                            Manage your expenses as effective as never before
                        </h1>
                        <p className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>

                        <Link href={route("register")}>
                            <button className="btn btn-primary btn-lg">
                                Get Started!
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
