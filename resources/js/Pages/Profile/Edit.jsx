import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <div>
                <div className="mx-auto sm:px-6 lg:px-8 space-y-8">
                    <div className="p-4 sm:p-8 bg-base-300 shadow rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-base-300 shadow rounded-lg">
                        <UpdatePasswordForm />
                    </div>

                    <div className="p-4 sm:p-8 bg-base-300 shadow rounded-lg">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
