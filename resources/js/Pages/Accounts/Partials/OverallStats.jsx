import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

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

    return (
        <div className="stats stats-vertical shadow w-full">
            <div className="stat">
                <div className="stat-title">Downloads</div>
                <div className="stat-value">
                    {overallBalance.toLocaleString()}
                </div>
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
    );
}
