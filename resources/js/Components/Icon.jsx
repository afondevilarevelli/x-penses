import * as Icons from "react-icons/fa";

export default function Icon({ name }) {
    const FaIcon = Icons[name];
    if (!FaIcon) throw new Error("Icon " + name + " not found");

    return <FaIcon />;
}
