import {
    FaChartPie,
    FaHome,
    FaRegCreditCard,
    FaRegObjectGroup,
    FaSlidersH,
    FaUniversity,
    FaUserAlt,
} from "react-icons/fa";

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
        label: "Accounts",
        route: "accounts.index",
        icon: <FaUniversity {...iconStyle} />,
    },
    {
        label: "Transactions",
        route: "transactions.index",
        icon: <FaSlidersH {...iconStyle} />,
    },
    {
        label: "Credit cards",
        route: "credit-cards.index",
        icon: <FaRegCreditCard {...iconStyle} />,
    },
    {
        label: "Reports",
        route: "reports.index",
        icon: <FaChartPie {...iconStyle} />,
    },
    {
        label: "Categories",
        route: "categories.index",
        icon: <FaRegObjectGroup {...iconStyle} />,
    },
    {
        label: "Profile",
        route: "profile.edit",
        icon: <FaUserAlt {...iconStyle} />,
    },
];

export default links;
