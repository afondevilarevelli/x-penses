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
        color: category ? category.color : "",
        icon: category ? category.icon : "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (category) patch(route("categories.update"));
        else post(route("categories.create"));
    };

    return <form onSubmit={submit} className="mt-6 space-y-6"></form>;
}
