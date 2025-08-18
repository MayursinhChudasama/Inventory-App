import { useState } from "react";
import { UpdateUser, CreateUser } from "@/models/models";
import UserCard from "./UserCard";
import Modal from "../ui/Modal";
import UserForm from "./UserForm";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/app/store/users";

const Users: React.FC = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  console.log("users", users);

  const [createUser, { isLoading: isCreateUserLoading }] =
    useCreateUserMutation();
  const [deleteUser, { isLoading: isDeleteUserLoading }] =
    useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation();
  const [newUser, setNewUser] = useState<CreateUser>({
    name: "",
    username: "",
    password: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleCreateUser = async (e: React.FormEvent, formData: CreateUser | UpdateUser) => {
    e.preventDefault();
    try {
      // Ensure we're passing a valid CreateUser object
      const createData: CreateUser = {
        name: formData.name || '',
        username: formData.username || '',
        password: 'password' in formData ? formData.password : ''
      };
      await createUser(createData);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const handleUpdateUser = async (id: string, data: UpdateUser) => {
    try {
      await updateUser({ id, body: data });
    } catch (error) {
      console.error("Error updating user:", error);
      throw error; // Re-throw to handle in UserCard
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error; // Re-throw to handle in UserCard
    }
  };

  if (isLoading) {
    return <div className='flex justify-center p-8'>Loading users...</div>;
  }

  return (
    <div className='p-0'>
      <div className='flex items-center justify-center pb-5'>
        <h2 className='text-lg font-bold text-gray-800'>User Management</h2>
      </div>
      <div className='flex items-center justify-center pb-3'>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className='text-sm p-2 text-white rounded-md bg-blue-500 hover:bg-blue-600 transition-colors'>
          Add New User
        </button>
      </div>

      <div className='space-y-4'>
        {users &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onUpdate={handleUpdateUser}
              onDelete={handleDeleteUser}
              isDeleteUserLoading={isDeleteUserLoading}
              isUpdateUserLoading={isUpdateUserLoading}
            />
          ))}
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title='Add New User'>
        <UserForm
          initialData={{
            name: "",
            username: "",
            password: "",
          }}
          onSubmit={handleCreateUser}
          isLoading={isCreateUserLoading}
          submitButtonText='Create User'
          onCancel={() => setIsAddModalOpen(false)}
          isEdit={false}
        />
      </Modal>
    </div>
  );
};

export default Users;
