"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>
            Welcome, {user?.name}!
          </h1>
          <p className='text-gray-600 mb-6'>
            This is your dashboard. You can navigate using the sidebar menu.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='bg-blue-50 p-4 rounded-lg'>
              <h3 className='font-semibold text-blue-900 mb-2'>
                Add New Challan
              </h3>
              <p className='text-blue-700 text-sm'>
                Create new inventory entries
              </p>
            </div>

            <div className='bg-green-50 p-4 rounded-lg'>
              <h3 className='font-semibold text-green-900 mb-2'>Search</h3>
              <p className='text-green-700 text-sm'>
                Search through your inventory
              </p>
            </div>

            <div className='bg-purple-50 p-4 rounded-lg'>
              <h3 className='font-semibold text-purple-900 mb-2'>
                Challan Register
              </h3>
              <p className='text-purple-700 text-sm'>
                View all challan records
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
