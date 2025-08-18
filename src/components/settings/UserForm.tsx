import React, { FC } from "react";
import { CreateUser, UpdateUser } from "@/models/models";

export interface UserFormProps {
  initialData: Partial<CreateUser>;
  onSubmit: (e: React.FormEvent, formData: CreateUser | UpdateUser) => void;
  isLoading: boolean;
  submitButtonText: string;
  onCancel: () => void;
  isEdit?: boolean;
}

const UserForm: FC<UserFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  submitButtonText,
  onCancel,
  isEdit = false,
}) => {
  const [formData, setFormData] = React.useState<CreateUser>({
    name: initialData.name || '',
    username: initialData.username || '',
    password: initialData.password || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e, formData);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700'>
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          required
        />
      </div>

      <div>
        <label
          htmlFor='username'
          className='block text-sm font-medium text-gray-700'>
          Username
        </label>
        <input
          type='text'
          id='username'
          name='username'
          value={formData.username}
          onChange={handleChange}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          required
        />
      </div>

      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700'>
          {isEdit ? 'New Password (leave blank to keep current)' : 'Password'}
        </label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password || ''}
          onChange={handleChange}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          required={!isEdit}
          minLength={isEdit ? 0 : 6}
        />
      </div>

      <div className='flex justify-end space-x-3 pt-4'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          disabled={isLoading}>
          Cancel
        </button>
        <button
          type='submit'
          disabled={isLoading}
          className='px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'>
          {isLoading ? 'Saving...' : submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
