import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import {
    FaArrowDown,
    FaEdit,
    FaLevelDownAlt,
    FaLevelUpAlt,
    FaPlus,
    FaTrash,
} from "react-icons/fa";
import TransactionForm from "./Partials/TransactionForm";
import Modal from "@/Components/Modal";
import Icon from "@/Components/Icon";

const filterLinks = [
    { label: "Transactions", route: "transactions.index", color: "secondary" },
    { label: "Incomes", route: "transactions.incomes.index", color: "success" },
    { label: "Expenses", route: "transactions.expenses.index", color: "error" },
];

export default function Transactions({
    transactions,
    categories,
    creditCards,
}) {
    const [transactionToEdit, setTransactionToEdit] = useState(null);
    const [transactionFormOpened, setTransactionFormOpened] = useState(false);

    function onDeleteTransaction(transaction) {
        router.delete(route("transactions.destroy", { id: transaction.id }));
    }

    function onEditTransaction(transaction) {
        setTransactionToEdit(transactions.find((t) => t.id == transaction.id));
        setTransactionFormOpened(true);
    }

    function closeModal() {
        setTransactionFormOpened(false);
        setTimeout(() => setTransactionToEdit(null), 500);
    }

    function getCategory(trans) {
        return categories.find((c) => c.id == trans.category_id);
    }

    function getCreditCard(trans) {
        return creditCards.find((c) => c.id == trans.credit_card_id);
    }

    function getActiveFilterLink() {
        return filterLinks.find((l) => route().current(l.route));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Transactions" />

            <h1 className="text-4xl mb-6">Transactions</h1>

            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                    <div className={`dropdown`}>
                        <label
                            tabIndex={0}
                            className={`btn m-1 btn-${
                                getActiveFilterLink().color
                            }`}
                        >
                            <FaArrowDown className="mr-2" />
                            {getActiveFilterLink().label}
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {filterLinks.map((link, idx) => (
                                <li className="flex flex-row items-center">
                                    <Link
                                        href={route(link.route)}
                                        className="w-full"
                                    >
                                        <div
                                            className={`h-6 w-6 rounded-full bg-${link.color}`}
                                        ></div>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        className="btn btn-primary self-end space-x-2"
                        onClick={() => {
                            setTransactionToEdit(null);
                            setTransactionFormOpened(true);
                        }}
                    >
                        <div>Create</div>
                        <FaPlus />
                    </button>
                </div>

                <Table
                    data={transactions.map((trans) => ({
                        id: trans.id,
                        date: new Date(trans.datetime).toLocaleString(),
                        description: trans.description,
                        amount: trans.amount.toLocaleString(),
                        type: (
                            <div>
                                {trans.type == "INCOME" ? (
                                    <FaLevelUpAlt className="text-success" />
                                ) : (
                                    <FaLevelDownAlt className="text-error" />
                                )}
                            </div>
                        ),
                        description: trans.description,
                        category: (
                            <div>
                                {getCategory(trans) ? (
                                    <Icon
                                        name={getCategory(trans).icon}
                                        size={40}
                                    />
                                ) : (
                                    "-"
                                )}
                            </div>
                        ),
                    }))}
                    columns={[
                        "id",
                        "date",
                        "category",
                        "description",
                        "type",
                        "amount",
                    ]}
                    actions={[
                        {
                            label: "Edit",
                            icon: <FaEdit className="h-6 w-6 text-primary" />,
                            onClick: onEditTransaction,
                        },
                        {
                            label: "Delete",
                            icon: <FaTrash className="h-6 w-6 text-error" />,
                            onClick: onDeleteTransaction,
                            needConfirmation: true,
                        },
                    ]}
                />
            </div>

            <Modal
                show={transactionFormOpened}
                onClose={closeModal}
                title={
                    transactionToEdit
                        ? "Edit transaction"
                        : "Create transaction"
                }
            >
                <TransactionForm
                    transaction={transactionToEdit}
                    onSubmittedSuccesfully={() =>
                        setTransactionFormOpened(false)
                    }
                    onCancel={() => setTransactionFormOpened(false)}
                />
            </Modal>
        </AuthenticatedLayout>
    );
}
