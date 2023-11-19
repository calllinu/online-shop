import Home from './home/Home'
import Cart from './components/cart/Cart';
import Messages from './components/messages/Messages';
import Orders from './components/orders/Orders';
import Profile from './components/profile/Profile';
import { ConfigProvider} from "antd";
import {Routes, BrowserRouter, Route } from "react-router-dom";

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
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
      </ConfigProvider>
  )
}

export default App
