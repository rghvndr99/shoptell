import React, { useState } from 'react';

const Msg=(props)=>{
    const [isShow,setShow]=useState(true);

    return (
        isShow?(<div className="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Nice!</strong> {props.content||'default'}
    <button type="button" className="close" onClick={()=>setShow(false)}data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>):null
  )
}

export default Msg;