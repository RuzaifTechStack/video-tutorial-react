import { Link } from "react-router-dom";


export function Invalid(){
    return(
        <div className="container-fluid">
          <h2>Invalid Credentials</h2>

          <Link to='/login'>Try Again</Link>
        </div>
    )
}