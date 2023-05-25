import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="text-neutral-content">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="name@domain.com"
                        className={`input ${
                            errors.email ? "input-error" : "input-bordered"
                        }`}
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    {errors.email && (
                        <label className="label">
                            <span className="label-text-alt text-error">
                                {errors.email}
                            </span>
                        </label>
                    )}
                </div>

                <div className="form-control mt-4">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="********"
                        className={`input ${
                            errors.password ? "input-error" : "input-bordered"
                        }`}
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    {errors.password && (
                        <label className="label">
                            <span className="label-text-alt text-error">
                                {errors.password}
                            </span>
                        </label>
                    )}
                </div>

                <div className="block mt-4">
                    <div className="form-control w-fit">
                        <label className="cursor-pointer label">
                            <input
                                type="checkbox"
                                name="remember"
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                checked={data.remember}
                                className="checkbox checkbox-secondary mr-4"
                            />
                            <span className="label-text">Remember me</span>
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-end mt-2 gap-4">
                    {canResetPassword && (
                        <Link href={route("password.request")}>
                            <button className="btn btn-ghost btn-xs underline">
                                Forgot your password?
                            </button>
                        </Link>
                    )}

                    <button className="btn btn-primary" disabled={processing}>
                        Log in
                    </button>
                </div>

                <Link href={route("register")}>
                    <button className="btn btn-xs btn-link underline mt-6">
                        Create a user
                    </button>
                </Link>
            </form>
        </GuestLayout>
    );
}
