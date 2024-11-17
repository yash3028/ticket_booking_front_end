import { Link } from 'react-router-dom'
import '../styles/navbar.css'
function navbar(){
    return(
        <div>
        <nav className='navbar'>
          <div className='head'>
            <Link to='/'>
            <h2 className='title'>SYR</h2>
            </Link>
            <div className='head-right'>
              <select className='lang'>
                <option value="en">English</option>
                <option value="Te">Telugu</option>
                <option value="Hi">Hindi</option>
              </select>
              <button className='login'>
                <Link to="/login-options">Login</Link>
              </button>
            </div>
          </div>
        </nav>
      </div>
    )
}

export default navbar