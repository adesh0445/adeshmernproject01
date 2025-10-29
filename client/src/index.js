import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './appmodules/css/style.css'
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Welcome } from './appmodules/welcome';
import { Loginpage } from './appmodules/users/userlogin';
import { Registerpage } from './appmodules/users/userregister';
import { Mainpage } from './appmodules/dashboard/Mainpage';
import Homepage from './appmodules/dashboard/Homepage';
import {Landingpage} from './appmodules/dashboard/Landingpage';
import { Reactchart } from './appmodules/dashboard/reactchart';
import { Employeelist } from './appmodules/dashboard/EmployeeList';
import EditEmployee from './appmodules/dashboard/EditEmployee';
import { AddEmployee } from './appmodules/dashboard/AddEmployee';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Welcome />} />
    <Route path='Login' element={<Loginpage />} />
    <Route path='Registerpage' element={<Registerpage />} />

    <Route path='dashboard' element={<Mainpage />}>
      <Route path='Employeelist' element={<Employeelist />} />
      <Route path='Homepage' element={<Homepage />} />
      <Route path='Landing' element={<Landingpage />} />
      <Route path='Chart' element={<Reactchart />} />
      <Route path='edit/:id' element={<EditEmployee />} />
      <Route path='AddEmployee' element={<AddEmployee />} />  
    </Route>
   </Routes>
   </BrowserRouter>
  </React.StrictMode>
);
