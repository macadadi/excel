import * as React from 'react'
import CloseIcon from '../icons/closeIcon';
import { ModalProps } from '../types';

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    type = "default",
    title,
  }) => {
    if (!isOpen) return null;
    const getTypeStyles = () => {
      switch (type) {
        case "success":
          return "bg-green-100 border-green-500 text-green-700";
        case "warn":
          return "bg-yellow-100 border-yellow-500 text-yellow-700";
        case "error":
          return "bg-red-100 border-red-500 text-red-700";
        default:
          return "bg-white border-gray-300 text-gray-700";
      }
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className={`rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3  border ${getTypeStyles()}`}
        >
              <div className="flex items-center justify-end p-4">
          {title && (
            <h2 className="text-xl font-bold absolute left-6">{title}</h2>
          )}
            <button
              title="Close modal"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <CloseIcon />
            </button>
          </div>
          <hr/>
          <div className="mt-2 p-2">{children}</div>
        </div>
      </div>
    );
  };
  
  export default Modal;