import useAppContext, { DARK_THEME } from "@/contexts/AppContext";

export default function Logo({ size = 100 }) {
    const { theme } = useAppContext();

    return (
        <img
            src="/logo.png"
            className={
                "rounded-full " +
                (theme == DARK_THEME ? "border-2 border-primary" : "")
            }
            style={{ width: size, height: size }}
        />
    );
}
