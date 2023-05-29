import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Projection({ account }) {
    return (
        <AuthenticatedLayout>
            <Head title="Projection" />
            <div>Projection for {account.name}</div>
        </AuthenticatedLayout>
    );
}
