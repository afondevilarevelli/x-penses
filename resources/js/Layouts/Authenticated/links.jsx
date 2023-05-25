import { FaHome, FaUserAlt } from "react-icons/fa";

const iconStyle = {
    className: "h-6 w-6",
};

const links = [
    {
        label: "Home",
        route: "dashboard",
        icon: <FaHome {...iconStyle} />,
    },
    {
        label: "Profile",
        route: "profile.edit",
        icon: <FaUserAlt {...iconStyle} />,
    },
    {
        label: "Expenses",
        route: "login",
        icon: <FaHome {...iconStyle} />,
    },
];

export default links;
