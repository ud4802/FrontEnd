import React from 'react'
// import img5 from "../DDU.png"

function Nav2() {
  return (
// import { ReactComponent as Logo } from './logo.svg';

    <nav className="navbar navbar-expand-sm navbar-dark" id='nav2'>
  
  {/* <img src={img5} alt='ErroImage' height="35" width="395"></img> */}
  
  
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
    <ul className="navbar-nav ">
      <li className="nav-item ">
        <a className="nav-link active" href="/home">Home </a>
      </li>
      <li className="nav-item">
        <a className="nav-link active" href="/signup">Add Students</a>
      </li>
    </ul>
  </div>
</nav>

  )
}


export default Nav2