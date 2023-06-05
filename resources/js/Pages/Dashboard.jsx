import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaArrowDown, FaArrowUp, FaUniversity } from "react-icons/fa";

export default function Dashboard({
    balance,
    incomesBalance,
    expensesBalance,
}) {
    console.log(balance);
    console.log(incomesBalance);
    console.log(expensesBalance);
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUniversity className="h-8 w-8" />
                    </div>
                    <div className="stat-title">Current balance</div>
                    <div className="stat-value">{balance}</div>
                    <div className="stat-desc">To present</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaArrowUp className="h-8 w-8 text-success" />
                    </div>
                    <div className="stat-title">Incomes</div>
                    <div className="stat-value">{incomesBalance}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaArrowDown className="h-8 w-8 text-error" />
                    </div>
                    <div className="stat-title">Expenses</div>
                    <div className="stat-value">{expensesBalance}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
