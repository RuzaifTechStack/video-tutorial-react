import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate, useSearchParams } from "react-router-dom";


export function UserDashboard(){
    const [Cookie, Setcookie, removecookie] = useCookies('username');
    const [Videos, SetVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:'', Views:'',CategoryName:''}]);

    let navigate = useNavigate();

    useEffect(()=>{
      axios.get(`http://127.0.0.1:8000/getvideos`)
      .then(response=>{
        SetVideos(response.data);
      });
    },[]);

    function handleLogout(){
        removecookie('username');
        navigate('/login');
        window.location.reload();
    }
    return(
        <div className="container-fluid">
          <div className="text-white d-flex justify-content-between">
             <h4>User Dashboard</h4>
             <div className="d-flex justify-content-between">
             <span className=" me-3 text-info fs-4">
                {
                    Cookie['username'].toUpperCase()
                }
              </span>
              <span>
                <button onClick={handleLogout} className="btn btn-danger">SignOut</button>
              </span>
             </div>
           </div>

           {/* Videos Loader Logic */}
           <div className="d-flex justify-content-between flex-wrap mt-2">
            {
              Videos.map(Video=>
                <div className="card m-1">
                  <div className="card-header">
                  <h4 className="text-center text-primary">{Video.Title}</h4>
                  </div>
                  <div className="card-body">
                  <iframe src={Video.Url} width="100%" height="100%" className="card-img-top"></iframe>
                  </div>
                  <div className="card-footer text-center">
                     <b>{Video.Views} <span>Views</span></b>
                  </div>
                </div>
                )
            }
           </div>
        </div>
    )
}