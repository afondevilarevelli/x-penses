import AuthenticatedLayout from "@/Layouts/Authenticated/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({}) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div>
                <div className="max-w-7xl mx-auto ">
                    <div className="bg-base-300 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">Dashboard!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
