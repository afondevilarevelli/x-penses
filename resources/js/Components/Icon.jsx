import * as Icons from "react-icons/fa";

export default function Icon({ name, size = 24 }) {
    const FaIcon = Icons[name];
    if (!FaIcon) throw new Error("Icon " + name + " not found");

    return <FaIcon style={{ fontSize: size }} />;
}
