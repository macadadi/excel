import React from "react";
import LoadingIcon from "../icons/LoadingIcon";

interface LoadingButtonProps {
  isLoading: boolean;
  onClick: () => void;
  disabled?: boolean;
  loadingText?: string;
  defaultText?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  onClick,
  disabled = false,
  loadingText = "Loading...",
  defaultText = "Submit",
}) => (
  <button
    onClick={onClick}
    disabled={isLoading || disabled}
    className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed"
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

export default LoadingButton;