import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import TransactionForm from "./Partials/TransactionForm";
import Modal from "@/Components/Modal";

export default function Transactions({ transactions }) {
    const [transactionToEdit, setTransactionToEdit] = useState(null);
    const [transactionFormOpened, setTransactionFormOpened] = useState(false);

    function onDeleteTransaction(transaction) {
        router.delete(route("transactions.destroy", { id: transaction.Id }));
    }

    function onEditTransaction(transaction) {
        setTransactionToEdit(transactions.find((t) => t.id == transaction.Id));
        setTransactionFormOpened(true);
    }

    function closeModal() {
        setTransactionFormOpened(false);
        setTimeout(() => setTransactionToEdit(null), 500);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Transactions" />

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
                        Id: trans.id,
                        Date: new Date(trans.datetime).toLocaleString(),
                        Description: trans.description,
                    }))}
                    columns={["Id", "Date", "Description"]}
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
