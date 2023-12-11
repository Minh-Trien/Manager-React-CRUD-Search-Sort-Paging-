import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './Product/Product';
import Sidebar from './Layout/Sidebar';
import Footer from './Layout/Footer';
import Navbar from './Layout/Navbar';
import Logout from './Layout/Logout';
import DashBoard from './Home/DashBoard';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import User from './User/UserPage.';
import Login from './Account/Login';

function Mainter() { // Sửa tên component thành Mainter (chữ cái đầu viết hoa)
  return (
    <div>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column"> 
          <div id="content">
            <Navbar />
            <Routes>
              <Route exact path='/' element={<DashBoard />} />
              <Route path='/product' element={<Product />} />
              <Route path='/user' element={<User />} />
              <Route path='/login' element={<Login/>}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
      <Logout />
    </div>
  )
}

export default Mainter; // Sửa thành Mainter (chữ cái đầu viết hoa)
