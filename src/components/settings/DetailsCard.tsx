"use client";

import { useState } from "react";
import Modal from "../ui/Modal";
import ModalInput from "../ui/ModalInput";

interface DetailsCardProps {
  heading: string;
  dontShowAddButton?: boolean;
  children: React.ReactNode;
  modalContent?: React.ReactNode;
  modalTitle?: string;
  handleAddModel?: (type: string, value: string) => void;
  isUpdating?: boolean;
}

const DetailsCard: React.FC<DetailsCardProps> = ({
  dontShowAddButton,
  heading,
  children,
  modalTitle,
  handleAddModel,
  isUpdating,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='w-full max-w-xs mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-10'>
        <div className='bg-blue-500 px-4 py-2'>
          <h2 className='text-base font-medium text-white truncate flex items-center justify-between'>
            {heading.toUpperCase()}
            {!dontShowAddButton && (
              <button
                onClick={() => setIsModalOpen(true)}
                className='flex items-center justify-center bg-white text-blue-500 hover:bg-blue-50 cursor-pointer text-2xl rounded-full w-7 h-7 p-0 transition-colors'
                aria-label={`Open ${heading} modal`}>
                <span className='-mt-0.5'>+</span>
              </button>
            )}
          </h2>
        </div>
        {children}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modalTitle || heading}>
          <ModalInput
            title={heading}
            onClose={setIsModalOpen}
            handleAddModel={handleAddModel}
            isUpdating={isUpdating}
          />
        </Modal>
      )}
    </>
  );
};

export default DetailsCard;
