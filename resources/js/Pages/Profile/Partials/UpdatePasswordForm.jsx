import { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={"max-w-xl"}>
            <header>
                <h2 className="text-lg font-medium">Update Password</h2>

                <p className="mt-1 text-sm">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div className="form-control mt-2">
                    <label className="label">
                        <span className="label-text">Current password</span>
                    </label>
                    <input
                        type="password"
                        className={`input ${
                            errors.current_password
                                ? "input-error"
                                : "input-bordered"
                        }`}
                        value={data.current_password}
                        autoComplete="current-password"
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                    />
                    {errors.current_password && (
                        <label className="label">
                            <span className="label-text-alt text-error">
                                {errors.current_password}
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

                <div className="flex items-center gap-4">
                    <button className="btn btn-primary" disabled={processing}>
                        Save
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-md text-success">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
