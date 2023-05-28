import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function ToastsWatcher() {
    const { flash } = usePage().props;

    const [show, setShow] = useState(true);

    useEffect(() => {
        if (
            flash &&
            (flash.info || flash.success || flash.warning || flash.error)
        ) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 5000);
        }
    }, [flash]);

    if (!flash || !show) return <></>;

    const CloseIcon = () => (
        <FaTimes className="cursor-pointer" onClick={() => setShow(false)} />
    );

    return (
        <div className="toast toast-end z-50 mr-4">
            {flash.info ? (
                <div className="alert alert-info">
                    <div>
                        <span>{flash.info}</span>
                        <CloseIcon />
                    </div>
                </div>
            ) : flash.success ? (
                <div className="alert alert-success">
                    <div>
                        <span>{flash.success}</span>
                        <CloseIcon />
                    </div>
                </div>
            ) : flash.warning ? (
                <div className="alert alert-warning">
                    <div>
                        <span>{flash.warning}</span>
                        <CloseIcon />
                    </div>
                </div>
            ) : flash.error ? (
                <div className="alert alert-error">
                    <div>
                        <span>{flash.error}</span>
                        <CloseIcon />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
