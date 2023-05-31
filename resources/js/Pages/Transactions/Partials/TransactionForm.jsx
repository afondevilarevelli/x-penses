import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import CurrencyInputField from "@/Components/CurrencyInputField";
import Icon from "@/Components/Icon";
import { FaCalendar, FaQuestion } from "react-icons/fa";
import DateInput from "@/Components/DateInput";

export default function TransactionForm({
    transaction,
    transactionType = null,
    onSubmittedSuccesfully = () => {},
    onCancel = () => {},
}) {
    const { categories } = usePage().props;
    const { data, setData, put, post, errors, processing, recentlySuccessful } =
        useForm({
            amount: transaction ? transaction.amount : "",
            description: transaction ? transaction.description : "",
            date: transaction ? new Date(transaction.date) : "",
            type: transaction
                ? transaction.type
                : transactionType
                ? transactionType
                : "",
            category_id: transaction ? transaction.category_id : "",
            notes: transaction ? transaction.notes : "",
        });

    const submit = (e) => {
        e.preventDefault();

        if (transaction)
            put(route("transactions.update", { id: transaction.id }));
        else post(route("transactions.store"));
    };

    useEffect(() => {
        if (recentlySuccessful) onSubmittedSuccesfully();
    }, [recentlySuccessful]);

    function getCategory(id) {
        return categories.find((c) => c.id == id);
    }

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <CurrencyInputField
                label={"Amount"}
                value={data.amount}
                placeholder="0"
                error={errors.amount}
                leftIcon={"$"}
                inputClass={
                    data.type == "INCOME"
                        ? "text-success placeholder-success"
                        : "text-error placeholder-error"
                }
                onChange={(val) => {
                    setData("amount", val);
                }}
            />

            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <input
                    className={`input ${
                        errors.description ? "input-error" : "input-bordered"
                    }`}
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                />
                {errors.description && (
                    <label className="label">
                        <span className="label-text-alt text-error">
                            {errors.description}
                        </span>
                    </label>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <label className="input-group pr-12">
                        <span>
                            {getCategory(data.category_id) ? (
                                <Icon
                                    name={getCategory(data.category_id).icon}
                                    size={15}
                                />
                            ) : (
                                <Icon name={"FaQuestion"} size={15} />
                            )}
                        </span>
                        <select
                            className={`select w-full ${
                                errors.category_id
                                    ? "select-error"
                                    : "select-bordered"
                            }`}
                            placeholder="Select"
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            value={data.category_id}
                        >
                            <option disabled value={""}>
                                Select
                            </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    {errors.category_id && (
                        <label className="label">
                            <span className="label-text-alt text-error">
                                {errors.category_id}
                            </span>
                        </label>
                    )}
                </div>

                <div className="form-control">
                    <DateInput
                        label={"Date"}
                        value={data.date}
                        error={errors.date}
                        onChange={(val) => setData("date", val)}
                        leftIcon={<FaCalendar />}
                    />
                </div>
            </div>

            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Additional notes</span>
                </label>
                <input
                    className={`input ${
                        errors.notes ? "input-error" : "input-bordered"
                    }`}
                    value={data.notes}
                    onChange={(e) => setData("notes", e.target.value)}
                />
                {errors.notes && (
                    <label className="label">
                        <span className="label-text-alt text-error">
                            {errors.notes}
                        </span>
                    </label>
                )}
            </div>

            <div className="flex items-center justify-end mt-4 gap-4">
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
                    {transaction ? "Save" : "Create"}
                </button>
            </div>
        </form>
    );
}
