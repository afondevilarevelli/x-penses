import { useRef, useState } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export default function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 max-w-xl`}>
            <header>
                <h2 className="text-lg font-medium">Delete Account</h2>

                <p className="mt-1 text-sm">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <button className="btn btn-error" onClick={confirmUserDeletion}>
                Delete Account
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>

                    <div className="form-control mt-4 w-3/4">
                        <input
                            type="password"
                            placeholder="Password"
                            className={`input ${
                                errors.password
                                    ? "input-error"
                                    : "input-bordered"
                            }`}
                            value={data.password}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <label className="label">
                                <span className="label-text-alt text-error">
                                    {errors.password}
                                </span>
                            </label>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button className="btn btn-active" onClick={closeModal}>
                            Cancel
                        </button>

                        <button
                            className="btn btn-error ml-3"
                            disabled={processing}
                        >
                            Delete Account
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
