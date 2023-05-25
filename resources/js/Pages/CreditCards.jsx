import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function CreditCards({ creditCards }) {
    return (
        <AuthenticatedLayout>
            <Head title="Credit cards" />

            <div>
                {creditCards.map((c) => (
                    <p key={c}>{c}</p>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
