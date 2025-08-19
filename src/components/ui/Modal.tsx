"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Close on Escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Blur overlay */}
      <div
        className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40'
        onClick={onClose}
      />

      {/* Modal container */}
      <div className='fixed inset-0 flex items-center justify-center z-50 p-4 pt-20'>
        <div
          ref={modalRef}
          className='w-full max-w-md bg-white rounded-xl shadow-2xl flex flex-col'>
          {/* Header */}
          <div className='flex items-end justify-between p-4 border-b border-gray-200'>
            <h3 className='text-lg font-medium text-gray-900'>{title}</h3>
            <button
              onClick={onClose}
              className='flex items-center justify-center text-lg rounded-full w-7 h-7 text-gray-500 bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors'
              aria-label='Close modal'>
              ×
            </button>
          </div>

          {/* Scrollable content */}
          <div className='flex-1 overflow-y-auto p-4'>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
