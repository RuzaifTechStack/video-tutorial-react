import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { date } from "yup";

export function AdminLogin(){

    const [Admin, SetAdmin] = useState([]);
    const [cookie, Setcookie, removecookie] = useCookies('admin');

    let navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/admin")
        .then(response=>{
            SetAdmin(response.data);
        });
    },[]);

    const formik = useFormik({
        initialValues: {
            UserName:'',
            Password:''
        },
        onSubmit: (formdata)=>{
            var AdminDetails = Admin.find(admin=> admin.UserName===formdata.UserName);
            if(AdminDetails.Password===formdata.Password){
                Setcookie('admin', formdata.UserName);
                navigate('/adminhome');
                window.location.reload();
            }else{
                navigate('/invalid');
            }
        }
    })
    return(
        <div className="container-fluid text-white">
            <div className="d-flex justify-content-center align-items-center p-3 rounded rounded-2">
               <form onSubmit={formik.handleSubmit}>
                <h2 className="text-warning fw-bolder">Admin Login</h2>
               <dl>
                    <dt className="text-danger fs-4 fw-bold">User Name</dt>
                    <dd>
                        <input type="text" name="UserName" onChange={formik.handleChange} className="form-control" />
                    </dd>
                    <dt className="text-danger fs-4 fw-bold">Password</dt>
                    <dd>
                        <input type="password" name="Password" onChange={formik.handleChange} className="form-control" />
                    </dd>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </dl>
               </form>
            </div>
        </div>
    )
}