import React from 'react'
import LogOutButton from '../components/LogOutButton'

function SellerLayout() {
    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold text-green-600'>Seller Dashboard</h1>
                <LogOutButton />
            </div>
            <p>Welcome Seller! Manage your products here.</p>
        </div>
    )
}

export default SellerLayout