export default function Wave({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V100H0V50Z" fill="currentColor" />
    </svg>
  );
}
