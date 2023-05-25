import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Reports({ data }) {
    return (
        <AuthenticatedLayout>
            <Head title="Reports" />

            <div>
                {data.map((c) => (
                    <p key={c}>{c}</p>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
