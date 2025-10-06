export function Button({
  onClick,
  className,
  children,
}: React.PropsWithChildren<{ onClick?: () => void; className?: string }>) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded ${className}`}>
      {children}
    </button>
  );
}
