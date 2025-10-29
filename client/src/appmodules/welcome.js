import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/fa';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';

export function Welcome() {
  const [appmenu, setappmenu] = useState([]);
     const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9800";


  useEffect(() => {
    axios.get(`${API_URL}/applist`)
      .then((d) => setappmenu(d.data.applist));
  }, []);

  return (
    <Fragment>
      <div className='container myapp mt-3'>
        <div className='row text-center'>
          <div className='col-12'>
            <h3 className='text-primary welcome'><FaUser></FaUser></h3>
            <p className='text-secondary'>This Project Develop By Adesh Use Backend & Fronted Code</p>
            <hr />
          </div>
          {appmenu.map((m, index) => {
            const IconComponent = Icons[m.appicon] || Icons.FaUserAlt;
            return (
              <div key={index} className='col-sm-6 col-md-3'>
                <Link to={m.applink} className='card p-3 text-decoration-none'>
                  <h1><IconComponent /></h1>
                  <h5 className='text-dark'>{m.appname}</h5>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </Fragment>
  )
}
