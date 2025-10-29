import React, { Fragment, useState } from "react";
import axios from "axios";
import { toast, ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";

export function AddEmployee() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState(""); 
  const [email, setEmail] = useState("");
  const [gender,setGender]=useState("")
  const navigate = useNavigate();
   const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9800";

  const handleAdd = () => {
    const userdata = { fullName,email, phone, gender };
    axios.post(`${API_URL}/AddEmployee`, userdata).then((res) => {
      if(res.data.status===450){
        alert(res.data.message)
      }
      if(res.data.status===251){
        toast.success(res.data.message,{position:"top-right",autoClose:1000})
        setTimeout(() => {
          navigate('/dashboard/Employeelist')
        }, 2000);      

      }
    })
  }
  const handleEnter=(enter)=>{
    if(enter.key==="Enter"){
      handleAdd();
    }
  }
  let filteredData=(id)=>{

  }

  return (
    <Fragment>
      <div className="col-md-12">
      <ToastContainer/>
      </div>
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
       
      <div className="card card-size p-4 shadow">
       
        <h2 className="text-center mb-4">Add Employees</h2>
        <input type="text" placeholder="Full Name" value={fullName} onKeyDown={handleEnter} onChange={e => setFullName(e.target.value)} className="form-control mb-3" />
                 
        
        <input type="phone" placeholder="Phone" value={phone} onKeyDown={handleEnter} onChange={e => setPhone(e.target.value)} className="form-control mb-3" />
         
         
        <input type="email" placeholder="Email" value={email} onKeyDown={handleEnter} onChange={e => setEmail(e.target.value)} className="form-control mb-3" />

        <div className="p-3 mb-3">
        <label className="me-2">Gender: </label>
        <input type="radio" value="male" checked={gender === "male"} onKeyDown={handleEnter} onChange={(e) => setGender(e.target.value)}/>
        <label For="male" className="me-3">Male</label>

        <input type="radio" value="female" checked={gender === "female"} onKeyDown={handleEnter} onChange={(e) => setGender(e.target.value)}/>
            <label For="female">Female</label>
        </div>
        
         {/* <input type="text" placeholder="Gender" value={gender} onKeyDown={handleEnter} onChange={e=>setGender(e.target.value)}  className="form-control mb-3"/> */}
        <button onClick={handleAdd} className="btn btn-success w-100 mb-3">Add Employee</button> 
             </div>
    </div>
    </Fragment>
  
  )
}
 