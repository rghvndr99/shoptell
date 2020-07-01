import React,{useState} from 'react';
import {baseUrl} from '../configuration';
import {useAppContext} from '../context';
import {setCookie,getCookie} from '../utility';
import Msg from './msg';
import { useHistory } from "react-router-dom";

const UserProfile=()=>{
    const [initialState, dispatch] = useAppContext();
    const [showMsg,setMsg]=useState(false);
    const history = useHistory();

    const logoutHandler=()=>{
		fetch(baseUrl+'users/signout',{
			method:'get',
			headers: { 'Content-type': 'application/json' },			     	
		})
		.then(res=>res.json())
		.then(data=>{
            console.log('logout');
			dispatch({type:'userDetails',payload: {}});
			const date = new Date();			
            setCookie("token=; expires=" + date.toGMTString());
            setCookie("isAdmin=; expires=" + date.toGMTString());
            setMsg(true);
            setTimeout(()=>{
                document.location.href = '/';
            }, 600);
             	
		},error=>{
			dispatch({type:'userDetails',payload: {}});
		}).catch(err=>console.log(err));
    }
    const redirectHandler=(e, url)=>{
        e.stopPropagation();
        e.preventDefault();
        history.push(url);
    }

    return (
        <div className="container user-profile">
            { showMsg? <Msg content="logged off successfully, redirecting to home" />: null}
        <div className="row">
            <div className="col-12">
                <div className="card">

                    <div className="card-body">
                        <div className="card-title mb-4">
                            <div className="d-flex justify-content-start">
                                <div className="image-container">
                                    <img src="http://placehold.it/100x100" id="imgProfile"  className="img-thumbnail" />
                                                                    </div>
                                <div className="quick-links">
                                <div className="list-group">
                                        <button className="list-group-item list-group-item-action">
                                            change picture
                                        </button>
                                        <button  className="list-group-item list-group-item-action" onClick={logoutHandler}>Logout</button>
                                        <a onClick={(e)=>redirectHandler(e,'/additem/default')} href="#"  className="list-group-item list-group-item-action">Add Item</a>     
                                        <a onClick={(e)=>redirectHandler(e,'/userList')} href="#" className="list-group-item list-group-item-action">User List</a>                                   
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="tab-content ml-1" id="myTabContent">
                                    <div className="tab-pane fade show active" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">
                                        

                                        <div className="row">
                                            <div className="col-sm-3 col-md-2 col-5">
                                                <label className="label">Full Name</label>
                                            </div>
                                            <div className="col-md-8 col-6">
                                                Jamshaid Kamran
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="row">
                                            <div className="col-sm-3 col-md-2 col-5">
                                                <label className="label">Birth Date</label>
                                            </div>
                                            <div className="col-md-8 col-6">
                                                March 22, 1994.
                                            </div>
                                        </div>
                                   
                                        
                                       
                                       

                                    </div>
                                    
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    </div>
    )
}

export default UserProfile;