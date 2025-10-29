import React, { Fragment } from 'react';
import Header  from '../sharecomponent/Header';
import { Sidebar } from '../sharecomponent/Sidebar';
import { Outlet } from 'react-router-dom';

export function Mainpage() {
  return (
   <Fragment>
    <div>
    <div className='sticky-top'>
    <Header></Header>
    </div>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2 mt-0'>
          <Sidebar></Sidebar>
        </div>
        <div className='col-md-10'>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
    </div>
   </Fragment>
  )
}

