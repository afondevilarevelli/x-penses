import React, { useState } from "react";

export default function ConfirmationPopover({ children, onConfirm }) {
    const [clicked, setClicked] = useState(false);

    return (
        <div className="dropdown dropdown-left xl:dropdown-right">
            <div tabIndex={0} onClick={() => setClicked(false)}>
                {children}
            </div>

            {!clicked && (
                <div
                    tabIndex={0}
                    className="dropdown-content menu p-4 w-fit shadow bg-base-100 rounded-box space-y-4"
                >
                    <div className="text-lg">Are you sure?</div>

                    <div className="space-x-6">
                        <button
                            className="btn btn-outline btn-warning"
                            onClick={() => {
                                setClicked(true);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-error"
                            onClick={() => {
                                onConfirm();
                                setClicked(true);
                            }}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
