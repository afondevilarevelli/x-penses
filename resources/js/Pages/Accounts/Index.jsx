import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import AccountsList from "./Partials/AccountsList";
import OverallStats from "./Partials/OverallStats";

export default function Accounts({ accounts }) {
    return (
        <AuthenticatedLayout>
            <Head title="Accounts" />

            <h1 className="text-4xl mb-4">Accounts</h1>

            <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-6">
                <div className="w-fit">
                    <AccountsList accounts={accounts} />
                </div>

                <div className="flex-1 mt-4 w-full">
                    <OverallStats />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
