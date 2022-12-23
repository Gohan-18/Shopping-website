import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Cart from './Pages/cart';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Layout from './Components/Layout';
import { Provider } from 'react-redux';
import store  from './store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<Login/>}/>
    </Route>
  )
)

function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  )
}

export default App;
