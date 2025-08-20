"use client";

import { useState } from "react";

const ModalInput: React.FC<{
  title: string;
  onClose: (value: boolean) => void;
  handleAddModel?: (type: string, value: string) => void;
  isUpdating?: boolean;
}> = ({ title, onClose, handleAddModel, isUpdating }) => {
  //
  const [value, setValue] = useState<string>("");
  //
  async function handleClick(value: string) {
    // onSave(title, value);
    onClose(false);
    if (handleAddModel) {
      try {
        await handleAddModel(title, value);
      } catch (error) {
        console.error("Error in addModel:", error);
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
        onClick={() => {
          handleClick(value);
        }}
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer ${
          isUpdating ? "bg-blue-600" : ""
        }`}>
        {isUpdating ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default ModalInput;
