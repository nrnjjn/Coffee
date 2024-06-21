import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navlanding from './Navlanding';
import Userregister from './Userregister';
import Landing from './Landing';
import Shopregister from './Shopregister';
import Login from './Login';
import Shopnav from './Shop/Shopnav';
import Shophome from './Shop/Shophome';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Addproduct from './Shop/Addproduct';
import Editproduct from './Shop/Editproduct';
import Viewproduct from './Shop/Viewproduct';
import Usernav from './User/Usernav';
import Userhome from './User/Userhome';
import Uviewproduct from './User/Uviewproduct';
import Uvbooking from './User/Uvbooking';
import Userprodd from './User/Userprodd';
import Viewbooking from './Shop/Viewbooking';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navlanding/>}>
        <Route index element={<Landing/>} />
        <Route path='userregister' element={<Userregister/>}/>
        <Route path='shopregister' element={<Shopregister/>}/>
        <Route path='login' element={<Login/>}/>
      </Route>

      <Route path='/shopnav' element={<Shopnav/>}>
        <Route index element={<Shophome/>}/>
        <Route path='addproduct' element={<Addproduct/>}/> 
        <Route path='editproduct/:shopId' element={<Editproduct/>}/>
        <Route path='viewproduct' element={<Viewproduct/>}/>
        <Route path='viewbooking' element={<Viewbooking/>}/>
      </Route>

      <Route path='/usernav' element={<Usernav/>}>
        <Route index element={<Userhome/>}/>  
        <Route path='uviewproduct' element={<Uviewproduct/>}/>
        <Route path='uviewbooking' element={<Uvbooking/>}/>
        <Route path='uviewprodd/:id' element={<Userprodd/>}/>
      </Route>

    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
