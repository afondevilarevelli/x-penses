import { usePage } from "@inertiajs/react";

export const useUser = () => {
    const { auth } = usePage().props;

    return auth.user;
};
