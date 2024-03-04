import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { UserLogin } from './Components/User-Login';
import { AdminLogin } from './Components/Admin-Login';
import { UserDashboard } from './Components/User-Dashboard';
import { AdminDashboard } from './Components/Admin-Dashboard';
import { Invalid } from './Components/Invalid';
import { UserRegister } from './Components/User-register';
import { Cookies, useCookies } from 'react-cookie';

function App() {
  const [cookie, setcookie, removecookie] = useCookies('admin');
  const [Cookie, Setcookie, Removecookie] = useCookies('username');
  return (
    <div className="container-fluid body">
     <BrowserRouter>
      <header>
          <div>
            <div className='text-center p-1'>

          {
              (Cookie['username']==undefined && cookie['admin']==undefined)?
              <div className='m-1'>
                <h2 className='text-white'>Tech Videos</h2>
              <Link to='/register' className='me-3 btn btn-warning'>New User Register</Link>
              <Link to='/login' className='me-3 btn btn-danger'>Existing User Login</Link>
              <Link to='/adminlogin' className='me-3 fw-bold btn btn-secondary text-warning'>Admin Login</Link>
             </div>: <div> </div>
            }
          </div>
       <div className='text-center'>
       {
        (cookie['admin']==undefined)?
        <div>
           <h1 className='text-danger mt-4'>Learning Coding</h1>
        <p className='text-white fw-bold fs-4'>React, Javascript, TypeScript, Bootstrap, etc..</p>
        </div>: <div></div>
       }
       </div>
          </div>
      </header>
      <Routes>
        <Route path='login' element={ <UserLogin />} />
        <Route path='register' element={ <UserRegister />} />
        <Route path='adminlogin' element={ <AdminLogin />} />
        <Route path='userhome' element={ <UserDashboard />} />
        <Route path='adminhome' element={ <AdminDashboard />} />
        <Route path='invalid' element={ <Invalid />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
