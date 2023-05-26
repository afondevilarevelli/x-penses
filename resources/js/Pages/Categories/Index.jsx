import Icon from "@/Components/Icon";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import CategoryForm from "./Partials/CategoryForm";

export default function Categories({ categories }) {
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [categoryFormOpened, setCategoryFormOpened] = useState(false);

    function onDeleteCategory(category) {
        console.log("DELETE", category);
    }

    function onEditCategory(category) {
        console.log("EDIT", category);
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

            <Modal
                show={categoryFormOpened}
                onClose={closeModal}
                title={categoryToEdit ? "Edit category" : "Create category"}
            >
                <CategoryForm />
            </Modal>
        </AuthenticatedLayout>
    );
}
