import Icon from "@/Components/Icon";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import CategoryForm from "./Partials/CategoryForm";

export default function Categories({ categories }) {
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [categoryFormOpened, setCategoryFormOpened] = useState(false);

    function onDeleteCategory(category) {
        router.delete(route("categories.destroy", { id: category.id }));
    }

    function onEditCategory(category) {
        setCategoryToEdit(categories.find((c) => c.id == category.id));
        setCategoryFormOpened(true);
    }

    function closeModal() {
        setCategoryFormOpened(false);
        setCategoryToEdit(null);
    }

    return (
        <AuthenticatedLayout>
            <Head title="Categories" />

            <div className="flex flex-col gap-4">
                <button
                    className="btn btn-primary self-end space-x-2"
                    onClick={() => setCategoryFormOpened(true)}
                >
                    <div>Create</div>
                    <FaPlus />
                </button>

                <Table
                    data={categories.map((c) => ({
                        id: c.id,
                        Name: c.name,
                        Color: (
                            <div
                                className={`rounded-full h-6 w-6`}
                                style={{ backgroundColor: c.color }}
                            />
                        ),
                        Icon: <Icon name={c.icon} />,
                    }))}
                    columns={["Name", "Color", "Icon"]}
                    actions={[
                        {
                            label: "Edit",
                            icon: <FaEdit className="h-6 w-6 text-primary" />,
                            onClick: onEditCategory,
                        },
                        {
                            label: "Delete",
                            icon: <FaTrash className="h-6 w-6 text-error" />,
                            onClick: onDeleteCategory,
                            needConfirmation: true,
                        },
                    ]}
                />
            </div>

            <Modal
                show={categoryFormOpened}
                onClose={closeModal}
                title={categoryToEdit ? "Edit category" : "Create category"}
            >
                <CategoryForm
                    category={categoryToEdit}
                    onSubmittedSuccesfully={() => setCategoryFormOpened(false)}
                    onCancel={() => setCategoryFormOpened(false)}
                />
            </Modal>
        </AuthenticatedLayout>
    );
}
