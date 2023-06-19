import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaArrowDown, FaArrowUp, FaUniversity } from "react-icons/fa";
import TransactionsByCategoryChart from "./Partials/TransactionsByCategoryChart";
import MonthlyBalance from "./Partials/MonthlyBalance";

export default function Dashboard({
    balance,
    incomesBalance,
    expensesBalance,
    expensesByCategory,
    incomesByCategory,
}) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="stats shadow w-full flex flex-wrap lg:flex-nowrap mb-12">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUniversity className="h-8 w-8" />
                    </div>
                    <div className="stat-title">Current balance</div>
                    <div className="stat-value">{balance.toLocaleString()}</div>
                    <div className="stat-desc">To present</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaArrowUp className="h-8 w-8 text-success" />
                    </div>
                    <div className="stat-title">Incomes</div>
                    <div className="stat-value">
                        {incomesBalance.toLocaleString()}
                    </div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaArrowDown className="h-8 w-8 text-error" />
                    </div>
                    <div className="stat-title">Expenses</div>
                    <div className="stat-value">
                        {expensesBalance.toLocaleString()}
                    </div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-12">
                <div className="flex flex-col gap-4 w-full">
                    <h2 className="font-semibold text-2xl">
                        Expenses by category
                    </h2>
                    <div className="bg-base-200 w-full py-4 rounded-md">
                        <div className="mx-auto w-fit">
                            <TransactionsByCategoryChart
                                groupedByCategory={expensesByCategory}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <h2 className="font-semibold text-2xl">
                        Incomes by category
                    </h2>
                    <div className="bg-base-200 w-full py-4 rounded-md">
                        <div className="mx-auto w-fit">
                            <TransactionsByCategoryChart
                                groupedByCategory={incomesByCategory}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-4">
                    <h2 className="font-semibold text-2xl">Monthly balance</h2>
                    <div className="bg-base-200 w-full py-4 rounded-md">
                        <div className="w-full">
                            <MonthlyBalance />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
