import React from "react";

interface FormActionsProps {
  isEditing: boolean;
  handleReset: () => void;
  handleCreate: () => void;
  handleUpdate: () => void;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormActions = ({
  isEditing,
  handleReset,
  handleCreate,
  handleUpdate,
  handleCancel,
}: FormActionsProps) => (
  <div className="pt-2 flex items-center space-x-4">
    <button
      type="button"
      onClick={handleReset}
      className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none cursor-pointer"
    >
      Reset
    </button>
    {isEditing ? (
      <>
        <button
          type="button"
          onClick={handleUpdate}
          className="bg-purple-600 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none cursor-pointer"
        >
          Update
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none cursor-pointer"
        >
          Cancel
        </button>
      </>
    ) : (
      <button
        type="button"
        onClick={handleCreate}
        className="bg-purple-600 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none cursor-pointer"
      >
        Create
      </button>
    )}
  </div>
);

export default FormActions;
