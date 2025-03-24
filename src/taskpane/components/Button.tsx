import React from "react";
import LoadingIcon from "../icons/LoadingIcon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  defaultText?: string;
}

const Button: React.FC<ButtonProps> = ({
  isLoading,
  onClick,
  disabled = false,
  loadingText = "Loading...",
  defaultText = "Submit",
  className = "",
  ...rest 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`px-2 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <LoadingIcon />
          <span>{loadingText}</span>
        </div>
      ) : (
        defaultText
      )}
    </button>
  );
};

export default Button;