
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export function UserLogin(){

    const [Users, SetUsers] = useState([]);
    const [Cookie, setcookie, removecookie] = useCookies('username');

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/users')
        .then(response=>{
            SetUsers(response.data);
        });
    },[]);

    const formik = useFormik({
        initialValues: {
            UserName:'',
            password:''
        },
        onSubmit: (formdata)=>{
          var userdetails = Users.find(user=> user.UserName===formdata.UserName);
          if(userdetails.Password===formdata.Password){
            setcookie('username',formdata.UserName);
            navigate('/userhome');
            window.location.reload();
          }else{
            navigate('/invalid');
          }
        }
    })
    return(
        <div className="d-flex justify-content-center mt-4">
           <div className="bg-dark text-white p-3 text-center">
             <form onSubmit={formik.handleSubmit}>
                <h2 className="text-danger bi bi-person-fill">User Login</h2>
                <dl>
                    <dt>User Name</dt>
                    <dd><input className="form-control" type="text" name="UserName" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input className="form-control" type="password" name="Password" onChange={formik.handleChange} /></dd>
                    <button className="btn btn-warning w-100">Login</button>
                </dl>
             </form>
            </div> 
        </div>
    )
}