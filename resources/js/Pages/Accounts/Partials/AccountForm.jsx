import ColorPicker from "@/Components/ColorPicker";
import CurrencyInputField from "@/Components/CurrencyInputField";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { FaExclamationCircle } from "react-icons/fa";

export default function AccountForm({
    account,
    onSubmittedSuccesfully = () => {},
    onCancel = () => {},
}) {
    const { banks } = usePage().props;

    const { data, setData, put, post, errors, processing, recentlySuccessful } =
        useForm({
            amount: account ? account.amount : "",
            name: account ? account.name : "",
            color: account ? account.color : "#00B9FF",
            bank_id: account ? account.bank_id : "",
        });

    const submit = (e) => {
        e.preventDefault();

        setData("amount", Number.parseFloat(data.amount));

        if (account) put(route("accounts.update", { id: account.id }));
        else post(route("accounts.store"));
    };

    useEffect(() => {
        if (recentlySuccessful) onSubmittedSuccesfully();
    }, [recentlySuccessful]);

    return (
        <form onSubmit={submit} className="mt-6 space-y-4">
            {account && (
                <div className="alert alert-info shadow-lg">
                    <div>
                        <FaExclamationCircle />
                        <span>
                            Editing the amount will create a new Transaction
                        </span>
                    </div>
                </div>
            )}

            <CurrencyInputField
                label={"Amount"}
                value={data.amount}
                placeholder="0"
                error={errors.amount}
                leftIcon={"$"}
                onChange={(val) => {
                    setData("amount", val);
                }}
            />

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
                        <option key={bank.id} value={bank.id}>
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
                    type="button"
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
