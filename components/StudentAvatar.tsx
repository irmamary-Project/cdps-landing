export default function StudentAvatar({
  name,
  size = "sm",
  className = "",
}: {
  name: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}) {
  const initial = name.charAt(0).toUpperCase();
  const dim = size === "xs" ? "w-9 h-9 text-xs" : size === "sm" ? "w-8 h-8 text-xs" : size === "md" ? "w-10 h-10 text-sm" : "w-12 h-12 text-base";
  return (
    <div className={`${dim} rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}>
      {initial}
    </div>
  );
}
