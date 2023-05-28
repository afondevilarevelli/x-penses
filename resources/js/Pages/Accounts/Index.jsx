import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import AccountsList from "./Partials/AccountsList";

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
                    <div className="stats stats-vertical shadow w-full">
                        <div className="stat">
                            <div className="stat-title">Downloads</div>
                            <div className="stat-value">31K</div>
                            <div className="stat-desc">Jan 1st - Feb 1st</div>
                        </div>

                        <div className="stat">
                            <div className="stat-title">New Users</div>
                            <div className="stat-value">4,200</div>
                            <div className="stat-desc">↗︎ 400 (22%)</div>
                        </div>

                        <div className="stat">
                            <div className="stat-title">New Registers</div>
                            <div className="stat-value">1,200</div>
                            <div className="stat-desc">↘︎ 90 (14%)</div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
