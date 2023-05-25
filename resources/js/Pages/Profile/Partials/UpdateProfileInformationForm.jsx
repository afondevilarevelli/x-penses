import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={"max-w-xl"}>
            <header>
                <h2 className="text-lg font-medium">Profile Information</h2>

                <p className="mt-1 text-sm">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        className={`input ${
                            errors.name ? "input-error" : "input-bordered"
                        }`}
                        value={data.name}
                        autoFocus
                        autoComplete="name"
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors.name && (
                        <label className="label">
                            <span className="label-text-alt text-error">
                                {errors.name}
                            </span>
                        </label>
                    )}
                </div>

                <div className="form-control mt-2">
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

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                            >
                                <button className="btn btn-link pl-0 md:pl-2 text-left">
                                    Click here to re-send the verification
                                    email.
                                </button>
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-success">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

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
