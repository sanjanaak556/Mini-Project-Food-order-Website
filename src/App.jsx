import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import SellerLayout from './Layouts/SellerLayout'
import CustomerLayout from './Layouts/CustomerLayout'
import AdminLayout from './Layouts/AdminLayout'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/seller', element: <SellerLayout /> },
    { path: '/customer', element: <CustomerLayout /> },
    { path: '/admin', element: <AdminLayout /> }

  ])



  return <RouterProvider router={router} />
}

export default App
