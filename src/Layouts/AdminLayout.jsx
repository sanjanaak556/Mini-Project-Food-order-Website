import React from 'react'
import LogOutButton from '../components/LogOutButton'

function AdminLayout() {
    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold text-green-600'>Admin Dashboard</h1>
                <LogOutButton />
            </div>
            <p>Welcome Admin! Manage users and orders here.</p>
        </div>
    )
}

export default AdminLayout