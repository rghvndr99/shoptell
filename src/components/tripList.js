import React,{useEffect,useState,} from 'react';
import base64 from 'base-64';
import {baseUrl} from '../configuration';
import {setCookie,getCookie} from '../utility';
import Msg from './msg';
import { useHistory } from "react-router-dom";
import images from "../components/image";

const TripList=(props)=>{
    const[msgContent,setMSG]=useState(null);
    const [trip,settrip]= useState([]);
    const isAdmin=getCookie('isAdmin') || false;
    const token= getCookie('token');
    const history = useHistory();
    const count= 1;

    useEffect(()=>{
        fetch(baseUrl+'products',{
			method:'get',
			headers: {
            	"Content-Type": "application/json",            	
        	},   
        	credentials: 'same-origin',     	
		})
		.then(res=>res.json())
		.then(data=>{
            settrip(data);			
		})
    },[]);
    
    const deleteHandler=(id)=>{
        fetch(baseUrl+'products/'+id,{
			method:'delete',
			headers: {
                "Content-Type": "application/json", 
                'Authorization': 'Bearer ' + token           	
        	},   
        	credentials: 'same-origin',     	
		})
		.then(res=>res.json())
		.then(data=>{
            settrip(data);				
		})
    }
    const clickHandler=(e,url)=>{
        e.preventDefault();
        history.push(url);
    }

    const toggleFavorite=(id)=>{
        fetch(baseUrl + 'favorites/'+id, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
    
        }).then(res => res.json())
            .then(data => {
                setMSG('added in favourite list');
        })
    }
    return (
        <React.Fragment>
            { msgContent? <Msg content={msgContent} />: null}
            <div className="card-deck list-item">            
            {trip.map((item,index)=>{
                return(
                <div className="card card-item item">
                    <div className="favorite-placeholder">
                    {token && <i className="fa fa-heart favorite-icon" aria-hidden="true" onClick={()=>toggleFavorite(item._id)}></i>}
                        </div>
                    <img src={window.location.origin+images[count+index].src} className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>                        
                        <p className="card-text">{item.description}</p>
                        <a href='#' className="card-link btn btn-default" onClick={(e)=>clickHandler(e,`/tripDetail/${item._id}`)}><i className="fa fa-bars" aria-hidden="true" ></i>Details</a>
                        {isAdmin &&
                        <React.Fragment>
                           <a className="btn btn-default" href= "#" onClick={(e)=>clickHandler(e,`/additem/${item._id}`)}><i className="fa fa-pencil-square-o" aria-hidden="true" ></i>Edit</a>
                           <a className="btn btn-default" onClick={()=>deleteHandler(item._id)}>
                                    <i className="fa fa-trash-o fa-lg"></i> Delete</a>
                        </React.Fragment>
                    }
                    </div>
                </div>

                )
            })}
            </div>
        </React.Fragment>
    )
}

export default TripList;