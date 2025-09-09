import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'


function AdminLayout() {
    return (
        <div className='flex flex-col min-h-screen'>
            <div className='flex flex-1'>
                <Sidebar />
                <div className='flex-1 flex flex-col'>
                    <Topbar />
                    <div className='p-6 flex-1'>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminLayout