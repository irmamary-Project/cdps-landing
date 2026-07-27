export default function Logo({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const h = size === "sm" ? 28 : size === "lg" ? 56 : 40;

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src="/logo.png"
        alt="CDPS - Child Development Portal System"
        style={{ height: h, width: "auto" }}
        className="object-contain"
      />
    </div>
  );
}
