import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmationPopover from "./ConfirmationPopover";

/**
 * @param {Object} props
 * @param {Object[]} props.data
 * @param {string} props.data[].id
 * @param {string[]} props.columns
 *
 * @param {Object[]} props.actions
 * @param {string} props.actions[].name
 * @param {string} props.actions[].icon
 * @param {boolean} props.actions[].needConfirmation
 * @param {Function} props.actions[].onClick
 *
 * @returns {JSX.Element}
 */

export default function Table({ data, columns, actions }) {
    return (
        <div className="overflow-x-auto overflow-y-hidden">
            <table className="table w-full table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        {columns.map((column, idx) => (
                            <th
                                key={idx}
                                className="bg-secondary text-secondary-content"
                            >
                                {column}
                            </th>
                        ))}

                        <th className="bg-secondary text-secondary-content">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            {columns.map((column, idx) => (
                                <td key={idx}>{item[column]}</td>
                            ))}

                            <td>
                                <div className="flex gap-4">
                                    {actions.map((action, idx) => (
                                        <div
                                            key={idx}
                                            className="tooltip cursor-pointer"
                                            data-tip={action.label}
                                        >
                                            {action.needConfirmation ? (
                                                <ConfirmationPopover
                                                    onConfirm={() =>
                                                        action.onClick(item)
                                                    }
                                                >
                                                    {action.icon}
                                                </ConfirmationPopover>
                                            ) : (
                                                <div
                                                    onClick={() =>
                                                        action.onClick(item)
                                                    }
                                                >
                                                    {action.icon}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
