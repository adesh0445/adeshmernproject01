import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer,toast} from "react-toastify";

export function Registerpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword]=useState(false);
  const [phone, setPhone] = useState(""); 
  const [email, setEmail] = useState("");
  const [gender,setGender]=useState("")
   const [message, setMessage] = useState("");       // Message state 
  const [msgType, setMsgType] = useState("");       // 'error' or 'success'
     const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9800";

  const navigate = useNavigate();

  const handleRegister = () => {
    const userdata = { username, password, email, phone, gender };
    axios.post(`${API_URL}/createUser`, userdata).then((res) => {
      if(res.data.status===450){
      toast.error(res.data.message,{position:"top-right",autoclose:3000})
      }
      if(res.data.status===451){
        alert(res.data.message);
      }
      if(res.data.status===251){
        alert(res.data.message);
        setMessage(res.data.message);
        setMsgType("success");
       setTimeout(() => {
        navigate("/Login")
       }, 2000);

      }
    })
  }
  const toggleShow=()=>{
    setShowPassword(!showPassword)
  }

  return (
    <Fragment>
      <div className="col-md-12">
      <ToastContainer/>
      </div>
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
       
      <div className="card card-size p-4 shadow">
       
        <div className={msgType === "success" ? "bg-success" : "bg-danger"}>
  {message}
</div>
        <h2 className="text-center mb-4">User Register</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="form-control mb-3" />
         
         
        <div  className="input-group mb-3">
        <input type={showPassword? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
        <button className={`btn ${showPassword? "btn-danger" : "btn-success" }`} onClick={toggleShow}>{showPassword? "Hide":"Show"}</button></div>
        
        
        <input type="phone" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="form-control mb-3" />
         
         
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="form-control mb-3" />

        <div className="p-3 mb-3">
        <label className="me-2">Gender: </label>
        <input type="radio" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)}/>
        <label For="male" className="me-3">Male</label>

        <input type="radio" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)}/>
            <label For="female">Female</label>
        </div>
        
         {/* <input type="text" placeholder="Gender" value={gender} onChange={e=>setGender(e.target.value)}  className="form-control mb-3"/> */}
        <button onClick={handleRegister} className="btn btn-success w-100 mb-3">Register</button>
        <Link to="/Login" className="text-center d-block">Already have an account? Login</Link>
      </div>
    </div>
    </Fragment>
  
  )
}
 