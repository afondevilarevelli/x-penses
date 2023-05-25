import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Categories({ categories }) {
    return (
        <AuthenticatedLayout>
            <Head title="Categories" />

            <div>
                {categories.map((c) => (
                    <p key={c}>{c}</p>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
