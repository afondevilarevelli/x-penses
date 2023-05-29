import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import {
    FaEdit,
    FaLevelDownAlt,
    FaLevelUpAlt,
    FaPlus,
    FaTrash,
} from "react-icons/fa";
import TransactionForm from "./Partials/TransactionForm";
import Modal from "@/Components/Modal";
import Icon from "@/Components/Icon";

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

    return (
        <AuthenticatedLayout>
            <Head title="Transactions" />

            <h1 className="text-4xl mb-4">Transactions</h1>

            <div className="flex flex-col gap-4">
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

                <Table
                    data={transactions.map((trans) => ({
                        id: trans.id,
                        date: new Date(trans.datetime).toLocaleString(),
                        description: trans.description,
                        amount: trans.amount.toLocaleString(),
                        type: (
                            <div>
                                {trans.type == "INGRESS" ? (
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
