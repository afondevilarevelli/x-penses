import { usePage } from "@inertiajs/react";
import React from "react";

export default function MonthlyBalance() {
    const { monthlyExpenses, monthlyIncomes } = usePage().props;

    const totalBalance = monthlyIncomes - monthlyExpenses;

    console.log(totalBalance);

    const incomesPercentage = Math.round(
        (100 * monthlyIncomes) / (monthlyIncomes + monthlyExpenses)
    );

    return (
        <div className="flex">
            <div className="flex-1">
                <div className="flex flex-col h-48 w-12 mx-auto rounded-full overflow-hidden">
                    <div
                        className="bg-success h-1/3"
                        style={{ height: `${incomesPercentage}%` }}
                    ></div>
                    <div className="bg-error flex-1"></div>
                </div>
            </div>
            <div className="w-3/4">
                <div className="flex flex-col items-center px-6 gap-4">
                    <div className="flex justify-between items-center w-full">
                        <div className="text-xl">Incomes</div>
                        <div className="stat-value text-success">
                            $ {monthlyIncomes.toLocaleString()}
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <div className="text-xl">Expenses</div>
                        <div className="stat-value text-error">
                            $ {monthlyExpenses.toLocaleString()}
                        </div>
                    </div>
                    <div className="divider my-0"></div>
                    <div className="flex justify-between items-center w-full">
                        <div className="text-xl">Balance</div>
                        <div className="stat-value">
                            $ {totalBalance.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
