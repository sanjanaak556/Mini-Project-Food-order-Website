import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SellerLayout from './Layouts/SellerLayout'
import CustomerLayout from './Layouts/CustomerLayout'
import AdminLayout from './Layouts/AdminLayout'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import ProductDetails from './pages/customer/ProductDetails'
import Cart from './pages/customer/Cart'
import Orders from './pages/customer/Orders'
import SellerOrders from './pages/seller/SellerOrders'
import Notifications from './pages/seller/Notifications'
import SellerDashboard from './pages/seller/SellerDashboard'
import SellerMenu from './pages/seller/SellerMenu'
import SellerReviews from './pages/seller/SellerReviews'
import SellerOffers from './pages/seller/SellerOffers'
import SellerDiscounts from './pages/seller/SellerDiscounts'
import AdminReviews from './pages/admin/AdminReviews'
import AdminNotif from './pages/admin/AdminNotif'
import AdminDashboard from './pages/admin/AdminDashboard'
import NotFound from './components/NotFound'
import ManageSellers from './pages/admin/ManageSellers'
import ManageCustomers from './pages/admin/ManageCustomers'
import SellerDetails from './pages/admin/SellerDetails'
import CustomerDetails from './pages/admin/CustomerDetails'
import ManageOrders from './pages/admin/ManageOrders'
import TrackOrder from './pages/admin/TrackOrder'
import ManageMenu from './pages/admin/ManageMenu'
import Reports from './pages/admin/Reports'
import CustomerDashboard from './pages/customer/CustomerDashboard'
import OfferDetails from './pages/customer/OfferDetails'
import DiscountDetails from './pages/customer/DiscountDetails'
import Wishlist from './pages/customer/Wishlist'
import Checkout from './pages/customer/Checkout'

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <LoginPage /> },
    {
      path: '/seller',
      element: <SellerLayout />,
      children: [
        { index: true, element: <SellerDashboard /> },
        { path: 'orders', element: <SellerOrders /> },
        { path: 'notifications', element: <Notifications /> },
        { path: 'menu', element: <SellerMenu /> },
        { path: 'reviews', element: <SellerReviews /> },
        { path: 'offers', element: <SellerOffers /> },
        { path: 'discounts', element: <SellerDiscounts /> },

      ]
    },
    {
      path: '/customer',
      element: <CustomerLayout />,
      children: [
        { index: true, element: <CustomerDashboard /> },
        { path: 'offers/:id', element: <OfferDetails /> },
        { path: 'discounts/:id', element: <DiscountDetails /> },
        { path: 'product/:id', element: <ProductDetails /> },
        { path: 'cart', element: <Cart /> },
        { path: 'wishlist', element: <Wishlist /> },
        { path: 'orders', element: <Orders /> },
        { path: 'checkout', element: <Checkout /> },
      ]
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: 'reviews', element: <AdminReviews /> },
        { path: 'notifications', element: <AdminNotif /> },
        { path: 'sellers', element: <ManageSellers /> },
        { path: 'sellers/:id', element: <SellerDetails /> },
        { path: 'customers', element: <ManageCustomers /> },
        { path: 'customers/:id', element: <CustomerDetails /> },
        { path: 'orders', element: <ManageOrders /> },
        { path: 'orders/:id', element: <TrackOrder /> },
        { path: 'menu', element: <ManageMenu /> },
        { path: 'reports', element: <Reports /> },
      ]
    },
    
    // Catch-all Route
    { path: '*', element: <NotFound /> }
  ])

  return <RouterProvider router={router} />
}

export default App

