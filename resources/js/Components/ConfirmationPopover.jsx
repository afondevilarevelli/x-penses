import React from "react";

export default function ConfirmationPopover({ children, onConfirm }) {
    return (
        <div className="dropdown">
            <div tabIndex={0}>{children}</div>

            <div
                tabIndex={0}
                className="dropdown-content menu p-4 shadow bg-base-300 rounded-box space-y-4"
            >
                <div className="text-lg">Are you sure?</div>

                <div className="space-x-6">
                    <button
                        className="btn btn-outline btn-warning"
                        onClick={() => {}}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-error"
                        onClick={() => onConfirm()}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}
