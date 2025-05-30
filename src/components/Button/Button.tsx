// src/components/Button/Button.tsx

import React from 'react';
import type { ButtonProps } from './types';
import { clsx } from 'clsx';

const baseStyles = "rounded font-medium focus:outline-none transition duration-200";

const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const variantStyles: Record<string, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        (disabled || isLoading) && "opacity-50 cursor-not-allowed"
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
