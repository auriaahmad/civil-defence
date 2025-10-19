'use client';

import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export default function Alert({
  type = 'info',
  message,
  onClose,
  className = '',
}) {
  const types = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      iconColor: 'text-green-600',
      Icon: CheckCircle,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      iconColor: 'text-red-600',
      Icon: XCircle,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      iconColor: 'text-yellow-600',
      Icon: AlertCircle,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      iconColor: 'text-blue-600',
      Icon: Info,
    },
  };

  const style = types[type] || types.info;
  const IconComponent = style.Icon;

  return (
    <div className={`${style.bg} ${style.border} ${style.text} border rounded-md p-4 mb-4 ${className}`}>
      <div className="flex items-start">
        <IconComponent className={`w-5 h-5 ${style.iconColor} mr-3 flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 hover:opacity-70 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
