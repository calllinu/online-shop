import Home from './home/home-content/Home'
import Cart from './components/cart/Cart';
import Messages from './components/messages/Messages';
import Orders from './components/orders/Orders';
//import Profile from './components/profile/Profile';
import { ConfigProvider} from "antd";
import {Routes, BrowserRouter, Route } from "react-router-dom";
import SignUp from './assets/auth/signUp/SignUp';
import Login from './assets/auth/login/Login';

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Campton",
          fontSize: 15,
        }
      }}
    >
     <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Home/>} />
          <Route path='/my-cart' element={<Cart/>} />
          <Route path='/messages' element={<Messages/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
      </ConfigProvider>
  )
}

export default App
