import './App.css';
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import Cart from './Pages/cart';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Layout from './Components/Layout';
import { Provider } from 'react-redux';
import store  from './store';
import Checkout from './Pages/Checkout';
import AuthProvider from './firebase/Auth';
import { useAuth } from './firebase/Auth';

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
      </Route>
      <Route path='/login' element={<Login/>}/>
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
