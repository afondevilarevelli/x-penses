export default function Logo({ size = 100 }) {
    return (
        <img
            src="/logo.png"
            className={
                "rounded-full hover:scale-105 transition-all cursor-pointer"
            }
            style={{ width: size, height: size }}
        />
    );
}
