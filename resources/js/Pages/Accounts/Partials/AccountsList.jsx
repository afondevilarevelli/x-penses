import Modal from "@/Components/Modal";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AccountForm from "./AccountForm";

const AccountListItem = ({ account }) => {
    return (
        <div key={account.id} className="card w-96 h-56 bg-neutral shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-secondary">{account.name}</h2>
                <p>{account.color}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
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
            <h1 className="text-4xl mb-4">Accounts</h1>

            <div className="grid grid-cols-1 mx-auto lg:mx-0 w-fit lg:grid-cols-2 xl:grid-cols-3 space-x-4 space-y-4">
                <div
                    className="card w-96 h-56 bg-neutral shadow-xl mt-4 ml-4 cursor-pointer"
                    onClick={() => setAccountFormOpened(true)}
                >
                    <div className="card-body">
                        <FaPlus className="mx-auto my-auto h-24 w-24" />
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
