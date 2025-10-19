'use client';

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  fullWidth = false,
}) {
  const baseStyles = 'px-6 py-2.5 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#01411C] text-white hover:bg-[#025a28] focus:ring-[#01411C]',
    secondary: 'bg-white text-[#01411C] border-2 border-[#01411C] hover:bg-gray-50 focus:ring-[#01411C]',
    alert: 'bg-[#DC2626] text-white hover:bg-[#b91c1c] focus:ring-[#DC2626]',
    success: 'bg-[#059669] text-white hover:bg-[#047857] focus:ring-[#059669]',
    info: 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] focus:ring-[#2563EB]',
    outline: 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
}
