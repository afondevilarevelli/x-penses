import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.store"));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
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

                <div className="form-control mt-2">
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
                        autoComplete="new-password"
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

                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text">Confirm password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="********"
                        className={`input ${
                            errors.password_confirmation
                                ? "input-error"
                                : "input-bordered"
                        }`}
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                    {errors.password_confirmation && (
                        <label className="label">
                            <span className="label-text-alt text-error">
                                {errors.password_confirmation}
                            </span>
                        </label>
                    )}
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button className="btn btn-primary" disabled={processing}>
                        Reset Password
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
