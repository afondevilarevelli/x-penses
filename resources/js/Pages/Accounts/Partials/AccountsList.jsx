import Modal from "@/Components/Modal";
import React, { useState } from "react";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import AccountForm from "./AccountForm";
import { router, usePage } from "@inertiajs/react";
import TransactionForm from "@/Pages/Transactions/Partials/TransactionForm";

const AccountListItem = ({ account, onEdit, onRemove }) => {
    const { banks } = usePage().props;

    const [confirmationModalOpened, setConfirmationModalOpened] =
        useState(false);

    const [transactionFormOpened, setTransactionFormOpened] = useState(false);

    const bank = banks.find((b) => b.id == account.bank_id);

    return (
        <div
            key={account.id}
            className="card h-64 bg-base-200 shadow-xl"
            style={{ backgroundColor: account.color + "33" }}
        >
            <div className="card-body p-6">
                <div className="flex justify-between">
                    <h2 className="card-title text-base-content">
                        {account.name}
                    </h2>

                    <div className="dropdown dropdown-bottom dropdown-end">
                        <FaEllipsisV tabIndex={1} className="cursor-pointer" />
                        <ul
                            tabIndex={1}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a onClick={onEdit}>Edit</a>
                            </li>
                            <li
                                onClick={() => setConfirmationModalOpened(true)}
                            >
                                <a className="bg-error bg-opacity-20">Remove</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="flex items-center self-start gap-2 text-base-content">
                    <img src={bank.image} alt={bank.name} className="w-8 h-8" />
                    {bank.name}
                </p>

                <div className="flex justify-between items-center mt-2">
                    <div>Current balance</div>
                    <div
                        className={
                            "text-lg " +
                            (account.amount > 0
                                ? "text-success"
                                : account.amount < 0
                                ? "text-error"
                                : "")
                        }
                    >
                        $ {account.amount.toLocaleString()}
                    </div>
                </div>

                <div className="divider mb-0 opacity-30 before:bg-base-content after:bg-base-content"></div>

                <div className="card-actions justify-end">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setTransactionFormOpened(true)}
                    >
                        Add expense
                    </button>
                </div>
            </div>

            <Modal
                show={confirmationModalOpened}
                onClose={() => setConfirmationModalOpened(false)}
                title={"Are you sure?"}
                maxWidth="sm"
            >
                <p className="mt-4">This action is irreversible</p>
                <div className="flex gap-4 mt-6 w-fit mx-auto">
                    <button
                        className="btn btn-warning btn-outline"
                        onClick={() => setConfirmationModalOpened(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-error"
                        onClick={() => {
                            onRemove();
                            setConfirmationModalOpened(false);
                        }}
                    >
                        Remove
                    </button>
                </div>
            </Modal>

            <Modal
                show={transactionFormOpened}
                onClose={() => setTransactionFormOpened(false)}
                title={"New expense"}
            >
                <TransactionForm
                    account={account}
                    transactionType={"EXPENSE"}
                    onSubmittedSuccesfully={() =>
                        setTransactionFormOpened(false)
                    }
                    onCancel={() => setTransactionFormOpened(false)}
                />
            </Modal>
        </div>
    );
};
export default function AccountsList({ accounts }) {
    const [accountToEdit, setAccountToEdit] = useState(null);
    const [accountFormOpened, setAccountFormOpened] = useState(false);

    function closeModal() {
        setAccountFormOpened(false);
        setTimeout(() => setAccountToEdit(null), 500);
    }

    function removeAccount(account) {
        router.delete(route("accounts.destroy", { id: account.id }));
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 space-x-4 space-y-4">
                <div
                    className="card h-64 bg-base-200 shadow-xl mt-4 ml-4 cursor-pointer"
                    onClick={() => {
                        setAccountToEdit(null);
                        setAccountFormOpened(true);
                    }}
                >
                    <div className="card-body text-secondary">
                        <FaPlus className="mx-auto my-auto h-24 w-24 p-2 rounded-full border-4 border-secondary" />
                        <div className="mx-auto text-xl">New Account</div>
                    </div>
                </div>

                {accounts.map((account) => (
                    <AccountListItem
                        key={account.id}
                        account={account}
                        onEdit={() => {
                            setAccountToEdit(account);
                            setAccountFormOpened(true);
                        }}
                        onRemove={() => removeAccount(account)}
                    />
                ))}
            </div>

            <Modal
                show={accountFormOpened}
                onClose={closeModal}
                title={accountToEdit ? "Edit account" : "Create account"}
            >
                <AccountForm
                    account={accountToEdit}
                    onSubmittedSuccesfully={() => setAccountFormOpened(false)}
                    onCancel={() => setAccountFormOpened(false)}
                />
            </Modal>
        </div>
    );
}
