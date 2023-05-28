import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";

export default function OverallStats() {
    const { accounts } = usePage().props;

    const [overallBalance, setOverallBalance] = useState();

    useEffect(() => {
        if (!accounts) return;

        setOverallBalance(
            accounts.reduce((acc, actual) => (acc += actual.amount), 0)
        );
    }, [accounts]);

    if (!overallBalance) return <></>;

    function getClassNameColor(amount) {
        return amount > 0 ? "text-success" : amount < 0 ? "text-error" : "";
    }

    return (
        <div className="stats stats-vertical shadow w-full">
            <div className="flex items-center">
                <div className="stat">
                    <div className="stat-title">Overall current balance</div>
                    <div
                        className={
                            "stat-value " + getClassNameColor(overallBalance)
                        }
                    >
                        $ {overallBalance.toLocaleString()}
                    </div>
                    <div className="stat-desc">To present</div>
                </div>

                <FaDollarSign className={"h-8 w-8 text-secondary ml-4"} />
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
    );
}
