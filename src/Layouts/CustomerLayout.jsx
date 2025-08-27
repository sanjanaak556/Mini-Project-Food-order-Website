import React from 'react'
import LogOutButton from '../components/LogOutButton'

function CustomerLayout() {
    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold text-green-600'>Customer Dashboard</h1>
                <LogOutButton />
            </div>
            <p>Welcome Customer! Browse and order food here.</p>
        </div>
    )
}

export default CustomerLayout