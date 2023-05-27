import ColorPicker from "@/Components/ColorPicker";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function CategoryForm({ category }) {
    const {
        data,
        setData,
        patch,
        post,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        name: category ? category.name : "",
        color: category ? category.color : "#00B9FF",
        icon: category ? category.icon : "FaSmile",
    });

    const submit = (e) => {
        e.preventDefault();

        if (category) patch(route("categories.update"));
        else post(route("categories.create"));
    };

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div className="form-control mt-4">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    placeholder="Password"
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

            <ColorPicker
                color={data.color}
                onChange={(c) => setData("color", c)}
            />
        </form>
    );
}
