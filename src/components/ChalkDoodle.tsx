type ChalkDoodleProps = {
  className?: string;
  variant: "arrow-down" | "arrow-right" | "spark" | "star" | "swirl";
};

const doodles = {
  "arrow-down": <path d="M10 4 C12 14 12 24 12 34 M5 28 L12 35 L19 28" />,
  "arrow-right": <path d="M4 18 C13 18 23 18 34 18 M27 11 L34 18 L27 25" />,
  spark: (
    <>
      <path d="M18 5 L18 13" />
      <path d="M18 23 L18 31" />
      <path d="M5 18 L13 18" />
      <path d="M23 18 L31 18" />
      <path d="M9 9 L13 13" />
      <path d="M23 23 L27 27" />
      <path d="M23 13 L27 9" />
      <path d="M9 27 L13 23" />
    </>
  ),
  star: (
    <path d="M18 4 L21.8 13.3 L32 14.1 L24.2 20.8 L26.8 30.8 L18 25.4 L9.2 30.8 L11.8 20.8 L4 14.1 L14.2 13.3 Z" />
  ),
  swirl: (
    <path d="M31 14 C27 8 19 6 12 9 C6 12 4 19 8 24 C12 29 20 30 26 26 C31 23 32 17 29 14 C26 11 20 11 17 14 C14 17 14 21 17 23 C20 25 24 24 26 21" />
  ),
} as const;

export function ChalkDoodle({ className = "", variant }: ChalkDoodleProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 36 36"
      className={`pointer-events-none absolute text-white/55 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.8"
    >
      {doodles[variant]}
    </svg>
  );
}
