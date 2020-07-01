import React from 'react';
import { useHistory } from "react-router-dom";

const Avatar=(props)=>{
    const history = useHistory();

   const clickHandler=()=>{
        history.push('/userprofile');
    }

    return (
        <a href="#" className="user-link">
              <img onClick={clickHandler} src="https://via.placeholder.com/40" alt="user"  className="img-circle">

              </img>

        </a>
      
    )
}

export default Avatar;