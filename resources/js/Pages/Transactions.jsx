import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Transactions({ transactions }) {
    return (
        <AuthenticatedLayout>
            <Head title="Transactions" />

            <div>
                {transactions.map((c) => (
                    <p key={c}>{c}</p>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
