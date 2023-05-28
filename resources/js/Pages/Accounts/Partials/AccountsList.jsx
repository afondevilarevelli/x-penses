import Modal from "@/Components/Modal";
import React, { useState } from "react";
import { FaEllipsisH, FaEllipsisV, FaPlus } from "react-icons/fa";
import AccountForm from "./AccountForm";
import { usePage } from "@inertiajs/react";

const AccountListItem = ({ account }) => {
    const { banks } = usePage().props;

    const bank = banks.find((b) => b.id == account.bank_id);

    return (
        <div
            key={account.id}
            className="card w-80 h-56 bg-base-200 shadow-xl"
            style={{ backgroundColor: account.color + "33" }}
        >
            <div className="card-body p-6">
                <div className="flex justify-between">
                    <h2 className="card-title text-base-content">
                        {account.name}
                    </h2>

                    <div className="dropdown dropdown-bottom dropdown-end">
                        <FaEllipsisV tabIndex={0} className="cursor-pointer" />
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a>Edit</a>
                            </li>
                            <li>
                                <a>Remove</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <p>
                    <div className="flex items-center self-start gap-2 text-base-content">
                        <img
                            src={bank.image}
                            alt={bank.name}
                            className="w-8 h-8"
                        />
                        {bank.name}
                    </div>
                </p>

                <div className="divider mb-0 opacity-30 before:bg-base-content after:bg-base-content"></div>

                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Add expense</button>
                </div>
            </div>
        </div>
    );
};
export default function AccountsList({ accounts }) {
    const [accountToEdit, setAccountToEdit] = useState(null);
    const [accountFormOpened, setAccountFormOpened] = useState(false);

    function closeModal() {
        setAccountFormOpened(false);
        setAccountToEdit(null);
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 space-x-4 space-y-4 w-fit">
                <div
                    className="card w-80 h-56 bg-base-200 shadow-xl mt-4 ml-4 cursor-pointer"
                    onClick={() => setAccountFormOpened(true)}
                >
                    <div className="card-body text-secondary">
                        <FaPlus className="mx-auto my-auto h-24 w-24 p-2 rounded-full border-4 border-secondary" />
                        <div className="mx-auto text-xl">New Account</div>
                    </div>
                </div>

                {accounts.map((account) => (
                    <AccountListItem key={account.id} account={account} />
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
