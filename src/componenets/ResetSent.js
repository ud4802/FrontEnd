import React from 'react'
import img from "../images/emailSent.gif";
function ResetSent() {
  return (
    <>
    
    <div>
        <img src={img} alt='Error Image' height="200px" width="200px"></img>
    </div>
        <h3 style={{color:"green"}}>Reset Link has been sent to your E-mail Id. Check for further progress. </h3>
        </>
  )
}

export default ResetSent