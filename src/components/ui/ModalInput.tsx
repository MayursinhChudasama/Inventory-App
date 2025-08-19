"use client";

import { useState } from "react";

const ModalInput: React.FC<{
  onSave: (key: string, value: string) => void;
  title: string;
  onClose: (value: boolean) => void;
  handleMutate?: () => void;
  isUpdating?: boolean;
}> = ({ onSave, title, onClose, handleMutate, isUpdating }) => {
  const [value, setValue] = useState<string>("");
  async function handleClick() {
    onSave(title, value);
    onClose(false);
    if (handleMutate) {
      try {
        await handleMutate();
      } catch (error) {
        console.error("Error in handleMutate:", error);
      }
    }
  }

  return (
    <div>
      <input
        type='text'
        onChange={(e) => setValue(e.target.value)}
        className='w-full p-2 border rounded mb-2'
        placeholder={`Enter ${title.toLowerCase()} name`}
      />
      <button
        type='button'
        onClick={handleClick}
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer ${
          isUpdating ? "bg-blue-600" : ""
        }`}>
        {isUpdating ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default ModalInput;
