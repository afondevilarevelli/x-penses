import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaArrowLeft } from "react-icons/fa";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <Link
                href={route("login")}
                className="flex items-center justify-start mb-2"
            >
                <button className="btn btn-ghost gap-2 text-base-content">
                    <FaArrowLeft />
                    Back
                </button>
            </Link>

            <div className="mb-4 text-md">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="form-control">
                    <input
                        type="email"
                        placeholder="Email"
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

                <div className="flex items-center justify-end mt-4">
                    <button className="btn btn-primary" disabled={processing}>
                        Email Password Reset Link
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
