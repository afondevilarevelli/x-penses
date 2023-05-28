import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import AccountsList from "./Partials/AccountsList";

export default function Accounts({ accounts }) {
    return (
        <AuthenticatedLayout>
            <Head title="Accounts" />

            <AccountsList accounts={accounts} />
        </AuthenticatedLayout>
    );
}
