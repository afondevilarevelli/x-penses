import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function Accounts({ accounts }) {
    return (
        <AuthenticatedLayout>
            <Head title="Accounts" />

            <div>
                {accounts.map((c) => (
                    <p key={c}>{c}</p>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
