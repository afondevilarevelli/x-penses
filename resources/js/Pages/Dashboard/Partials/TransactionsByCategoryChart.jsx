import { usePage } from "@inertiajs/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    plugins: {
        legend: {
            display: false,
        },
    },
};

export default function TransactionsByCategoryChart({ groupedByCategory }) {
    const { categories } = usePage().props;

    const [categoriesMap, setCategoriesMap] = useState();

    useEffect(() => {
        setCategoriesMap(
            categories
                .filter((c) =>
                    groupedByCategory.some((ex) => ex.category_id == c.id)
                )
                .map((c) => ({
                    ...c,
                    amount: groupedByCategory.find(
                        (ex) => ex.category_id == c.id
                    ).amount,
                }))
        );
    }, [categories, groupedByCategory]);

    if (!categoriesMap) return <></>;

    const data = {
        labels: categoriesMap.map((c) => c.name),
        datasets: [
            {
                data: categoriesMap.map((c) => c.amount),
                backgroundColor: categoriesMap.map((c) => c.color),
            },
        ],
    };

    return <Pie data={data} options={options} />;
}
