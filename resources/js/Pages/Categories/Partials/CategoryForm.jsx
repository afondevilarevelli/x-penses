import ColorPicker from "@/Components/ColorPicker";
import IconPicker from "@/Components/IconPicker";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function CategoryForm({
    category,
    onSubmittedSuccesfully = () => {},
    onCancel = () => {},
}) {
    const { data, setData, put, post, errors, processing, recentlySuccessful } =
        useForm({
            name: category ? category.name : "",
            color: category ? category.color : "#00B9FF",
            icon: category ? category.icon : "FaSmile",
        });

    const submit = (e) => {
        e.preventDefault();

        if (category) put(route("categories.update", { id: category.id }));
        else post(route("categories.store"));
    };

    useEffect(() => {
        if (recentlySuccessful) onSubmittedSuccesfully();
    }, [recentlySuccessful]);

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div>
                    <label className="label">
                        <span className="label-text">Color</span>
                    </label>
                    <ColorPicker
                        color={data.color}
                        onChange={(c) => setData("color", c)}
                    />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Icon</span>
                    </label>
                    <IconPicker
                        icon={data.icon}
                        onChange={(i) => setData("icon", i)}
                    />
                </div>
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
                    {category ? "Save" : "Create"}
                </button>
            </div>
        </form>
    );
}
