import './App.css';
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Layout from './Components/Layout';
import { Provider } from 'react-redux';
import store  from './store';
import Checkout from './Pages/Checkout';
import AuthProvider from './firebase/Auth';
import { useAuth } from './firebase/Auth';
import Register from './Pages/Register';
import AccountInfo from './Components/AccountInfo';
import Profile from './Components/Profile';
import Orders from './Components/Orders';
import Wishlist from './Components/Wishlist';
import Product from './Components/Product';
import ContactPage from './Components/ContactPage';
import ErrorPage from './Components/ErrorPage';

  function ProtectedRoute ({ children }) {
    const { user } = useAuth();

    if(!user) {
      return <Navigate to={'/login'}/>
    }
    return children;
  }

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route 
          path='/checkout' 
          element={
            <ProtectedRoute>
              <Checkout/>
            </ProtectedRoute>
        }/>
        <Route path='/account' element={<AccountInfo/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/product/:productid' element={<Product/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </>
  )
)

function App() {

  return (
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </AuthProvider>
  )
}

export default App;
