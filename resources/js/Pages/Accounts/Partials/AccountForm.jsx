import ColorPicker from "@/Components/ColorPicker";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function AccountForm({
    account,
    onSubmittedSuccesfully = () => {},
    onCancel = () => {},
}) {
    const { banks } = usePage().props;

    const { data, setData, put, post, errors, processing, recentlySuccessful } =
        useForm({
            amount: "",
            name: account ? account.name : "",
            color: account ? account.color : "#00B9FF",
            bank_id: account ? account.bank_id : "",
        });

    const submit = (e) => {
        e.preventDefault();

        if (account) put(route("accounts.update", { id: account.id }));
        else post(route("accounts.store"));
    };

    useEffect(() => {
        if (recentlySuccessful) onSubmittedSuccesfully();
    }, [recentlySuccessful]);

    return (
        <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Amount</span>
                </label>
                <label className="input-group">
                    <span>$</span>
                    <input
                        className={`input w-full ${
                            errors.amount ? "input-error" : "input-bordered"
                        }`}
                        pattern="[0-9]*"
                        placeholder="0"
                        onKeyDown={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        autoFocus
                        value={data.amount}
                        autoComplete="new-password"
                        onChange={(e) => setData("amount", e.target.value)}
                    />
                </label>

                {errors.amount && (
                    <label className="label">
                        <span className="label-text-alt text-error">
                            {errors.amount}
                        </span>
                    </label>
                )}
            </div>

            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    className={`input ${
                        errors.name ? "input-error" : "input-bordered"
                    }`}
                    value={data.name}
                    autoComplete="new-password"
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

            <div>
                <label className="label">
                    <span className="label-text">Color</span>
                </label>
                <ColorPicker
                    color={data.color}
                    onChange={(c) => setData("color", c)}
                />
            </div>

            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Bank</span>
                </label>
                <select
                    className={`select ${
                        errors.bank_id ? "select-error" : "select-bordered"
                    }`}
                    placeholder="Select"
                    onChange={(e) => setData("bank_id", e.target.value)}
                    value={data.bank_id}
                >
                    <option disabled value={""}>
                        Select
                    </option>
                    {banks.map((bank) => (
                        <option
                            key={bank.id}
                            value={bank.id}
                            className="flex flex-row gap-4"
                        >
                            <img
                                src={bank.image}
                                alt={bank.name}
                                className="w-24 h-24"
                            />
                            {bank.name}
                        </option>
                    ))}
                </select>

                {errors.bank_id && (
                    <label className="label">
                        <span className="label-text-alt text-error">
                            {errors.bank_id}
                        </span>
                    </label>
                )}
            </div>

            <div className="flex items-center justify-end mt-6 gap-4">
                <button
                    className="btn btn-ghost"
                    disabled={processing}
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button
                    className="btn btn-primary"
                    disabled={processing}
                    type="submit"
                >
                    {account ? "Save" : "Create"}
                </button>
            </div>
        </form>
    );
}
