export default function Logo({ size = 100 }) {
    return (
        <img
            src="/logo.png"
            className={"rounded-full"}
            style={{ width: size, height: size }}
        />
    );
}
