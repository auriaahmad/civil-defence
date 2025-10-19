export default function Card({
  children,
  className = '',
  padding = true,
  shadow = true,
}) {
  const paddingClass = padding ? 'p-6' : '';
  const shadowClass = shadow ? 'shadow-md' : '';

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${shadowClass} ${paddingClass} ${className}`}>
      {children}
    </div>
  );
}
