import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import SellerLayout from './Layouts/SellerLayout'
import CustomerLayout from './Layouts/CustomerLayout'
import AdminLayout from './Layouts/AdminLayout'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import CustomerHome from './pages/customer/CustomerHome'
import ProductDetails from './pages/customer/ProductDetails'
import Sidebar from './components/Sidebar'
import Cart from './pages/customer/Cart'

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <LoginPage /> },
    {
      path: '/seller', element: <SellerLayout />,
      children: [
        { path: '/seller', element: <Sidebar /> }
      ]
    },
    {
      path: '/customer', element: <CustomerLayout />,
      children: [
        { path: '/customer', element: <CustomerHome /> },
        { path: 'product/:id', element: <ProductDetails /> },
        { path: '/customer/cart', element: <Cart /> },
      ]
    },
    {
      path: '/admin', element: <AdminLayout />,
      children: [
        { path: '/admin', element: <Sidebar /> }
      ]
    }

  ])



  return <RouterProvider router={router} />
}

export default App
