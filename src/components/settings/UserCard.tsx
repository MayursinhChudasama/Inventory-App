import { useState } from "react";
import { User, UpdateUser } from "@/models/models";
import Modal from "../ui/Modal";
import UserForm from "./UserForm";

interface UserCardProps {
  user: User;
  onUpdate: (id: string, data: UpdateUser) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isDeleteUserLoading: boolean;
  isUpdateUserLoading: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onUpdate,
  onDelete,
  isDeleteUserLoading,
  isUpdateUserLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
    formData: { name?: string; username?: string; password?: string }
  ) => {
    e.preventDefault();
    const updatedUserData: UpdateUser = {
      name: formData.name,
      username: formData.username,
    };

    if (formData.password) {
      updatedUserData.passwordHash = formData.password;
    }
    try {
      await onUpdate(user._id!, updatedUserData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    if (showDeleteConfirm) {
      try {
        await onDelete(user._id!);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow p-4 mb-4'>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-lg font-medium'>{user.name}</h3>
          <p className='text-gray-600'>@{user.username}</p>
          <span
            className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
              user.role === "admin"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}>
            {user.role}
          </span>
        </div>
        <div className='flex space-x-2'>
          <button
            onClick={() => setIsEditing(true)}
            className='text-blue-500 hover:text-blue-700'>
            Edit
          </button>
          {user.role !== "admin" && (
            <button
              onClick={handleDelete}
              disabled={isDeleteUserLoading}
              className={`px-3 py-1 text-sm rounded-md ${
                isDeleteUserLoading
                  ? "bg-gray-200 text-gray-500"
                  : "text-red-600 bg-red-100 hover:bg-red-200"
              }`}>
              {isDeleteUserLoading ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>

      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title='Edit User'>
        <UserForm
          initialData={{
            name: user.name,
            username: user.username,
            password: "",
          }}
          onSubmit={handleSubmit}
          isLoading={isUpdateUserLoading}
          submitButtonText='Save Changes'
          onCancel={() => setIsEditing(false)}
          isEdit={true}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title='Confirm Deletion'>
        <div className='space-y-4'>
          <p>Are you sure you want to delete user {user.name}?</p>
          <div className='flex justify-end space-x-2 mt-4'>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
              Cancel
            </button>
            <button
              onClick={() => handleDelete()}
              disabled={isDeleteUserLoading}
              className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
              {isDeleteUserLoading ? "Deleting..." : "Confirm Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserCard;
