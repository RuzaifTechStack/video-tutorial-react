import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";


export function AdminDashboard(){
    
    const [Videos, SetVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:'', Views:'', CategoryName:''}]);
    const [EditVideos, SetEditVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:'', Views:'', CategoryName:''}]);
    const [cookie, Setcookie, removecookie] = useCookies('admin');
     let navigate = useNavigate();

    function handleLogout(){
        removecookie('admin');
        navigate('/adminlogin');
        window.location.reload();
    }

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/getvideos')
        .then(response=>{
            SetVideos(response.data);
        });
    },[]);

    const formik = useFormik({
        initialValues:{
            VideoId:'',
            Title:'',
            Url:'',
            Likes:'',
            Views:'',
            CategoryName:''
        },
        onSubmit: (Add)=>{
          axios.post(`http://127.0.0.1:8000/addvideo`, Add)
          alert("Video Added");
          window.location.reload();
        }
    });

    function handleEditClick(id){
    axios.get(`http://127.0.0.1:8000/getvideo/${id}`)
    .then(response=>{
        SetEditVideos(response.data);
    });
    };

    const Editformik = useFormik({
        initialValues: {
            VideoId: EditVideos[0].VideoId,
            Title: EditVideos[0].Title,
            Url: EditVideos[0].Url,
            Likes: EditVideos[0].Likes,
            Views: EditVideos[0].Views
        },
        onSubmit: (edit) =>{
            axios.put(`http://127.0.0.1:8000/updatevideo/${edit.VideoId}`, edit);
            alert("Video Edited");
            window.location.reload();
        },
        enableReinitialize:true
    })

    function handeDelete(e){
        axios.delete(`http://127.0.0.1:8000/deletevideo/${e.target.value}`)
        .then(()=>{
            alert('Video Deleted');
        });
        window.location.reload();
    }

    return(
        <div className="container-fluid">
           <div className="text-white d-flex justify-content-between">
             <h4>Admin Dashboard</h4>
             <div className="d-flex justify-content-between">
             <span className=" me-3 text-info fs-4">
                {
                    cookie['admin'].toUpperCase()
                }
              </span>
              <span>
                <button onClick={handleLogout} className="btn btn-danger">SignOut</button>
              </span>
             </div>
           </div>
           <section>
              <div className="text-center bg-dark text-white p-3 mt-2 mb-2">
                 <button data-bs-target="#addvideo" data-bs-toggle="modal" className="btn btn-primary p-2 w-50">Add Video</button>
              </div>
              <div className="modal fade" id="addvideo">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-dark">
                         <div className="modal-header">
                            <h2 className="text-primary">Add video</h2>
                            <button className="btn btn-close" data-bs-dismiss='modal'></button>
                         </div>
                         <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <dl>
                                    <dt>Video Id</dt>
                                    <dd>
                                        <input type="text" name="VideoId" onChange={formik.handleChange} className="form-control" />
                                    </dd>
                                    <dt>Title</dt>
                                    <dd>
                                        <input type="text" name="Title" onChange={formik.handleChange} className="form-control" />
                                    </dd>
                                    <dt>Url</dt>
                                    <dd>
                                        <input type="text" name="Url" onChange={formik.handleChange} className="form-control" />
                                    </dd>
                                    <dt>Likes</dt>
                                    <dd>
                                        <input type="text" name="Likes" onChange={formik.handleChange} className="form-control" />
                                    </dd>
                                    <dt>Views</dt>
                                    <dd>
                                        <input type="text" name="Views" onChange={formik.handleChange} className="form-control" />
                                    </dd>
                                    
                                </dl>
                                <button type="submit" className="btn btn-warning w-100">Add</button>
                            </form>

                         </div>
                        </div>
                    </div>
                 </div>
              <div>
                <table className="table table-hover">
                  <thead>
                    <tr className="text-center">
                        <th>Title</th>
                        <th>preview</th>
                        <th>Actions</th>
                    </tr>
                  </thead>
                  {
                    Videos.map(video=>
                        <tbody>
                            <tr>
                                <td key={video}>{video.Title}</td>
                                <td key={video}>
                                    <iframe src={video.Url} width='100%' height='200vh'></iframe>
                                </td>
                                <td key={video}>
                                    <button onClick={()=> handleEditClick(video.VideoId)} data-bs-target='#edit' data-bs-toggle='modal' className="btn btn-warning bi bi-pen-fill me-2" value={video.VideoId}></button>
                                    <button onClick={handeDelete} value={video.VideoId} className="btn btn-danger bi bi-trash-fill"></button>
                                </td>
                            </tr>
                        </tbody>
                        )
                  }
                </table>
              </div>
              <div className="modal fade" id="edit">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="text-danger">Edit Video</h2>
                            <button className="btn btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={Editformik.handleSubmit}>
                               <dl>
                                <dt>VideoId</dt>
                                <dd>
                                    <input type="text" name="VideoId" value={Editformik.values.VideoId} onChange={Editformik.handleChange} className="form-control" />
                                </dd>
                                <dt>Title</dt>
                                <dd>
                                    <input type="text" name="Title" value={Editformik.values.Title} onChange={Editformik.handleChange} className="form-control" />
                                </dd>
                                <dt>Url</dt>
                                <dd>
                                    <input type="text" name="Url" value={Editformik.values.Url} onChange={Editformik.handleChange} className="form-control" />
                                </dd>
                                <dt>Likes</dt>
                                <dd>
                                    <input type="text" name="Likes" value={Editformik.values.Likes} onChange={Editformik.handleChange} className="form-control" />
                                </dd>
                                <dt>Views</dt>
                                <dd>
                                    <input type="text" name="Views" value={Editformik.values.Views} onChange={Editformik.handleChange} className="form-control" />
                                </dd>
                               </dl>
                               <button type="submit" className="btn btn-warning w-100">Save</button>
                            </form>

                        </div>

                    </div>

                </div>

              </div>
           </section>
        </div>
    )
}