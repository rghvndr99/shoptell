import React,{useEffect,useState,} from 'react';
import base64 from 'base-64';
import {baseUrl} from '../configuration';
import {getCookie} from '../utility';
import images from "../components/image";

const FavoriteList=(props)=>{
    const [list,setlist]=useState([]);
    const token= getCookie('token');
    const count=1;
    const getListOffavorite=()=>{
        if(!token) {
            return;
        }
        fetch(baseUrl + 'favorites', {
            method: 'get',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
    
        }).then(res => res.json())
            .then(data => {
                setlist(data);
            })
    }
    useEffect(()=>{getListOffavorite()},[]);

    const deleteHandler=(id)=>{
        fetch(baseUrl + 'favorites/'+id, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
    
        }).then(res => res.json())
            .then(data => {
                getListOffavorite();
            })
    }

    return (
        <React.Fragment>
            <div className="card-deck list-item">
            {(!list || !list[0] || list[0].products.length ===0 ) && <p>No Favorite items are there</p>}
            {list&&list[0]&&list[0].products && list[0].products.map((item,index)=>{
                return(
                <div className="card card-item item">
                    <img src={window.location.origin+images[count+index].src} className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p className="card-text">{item.description}</p>
                        <a href={`/tripDetail/${item._id}`} className="card-link btn btn-default">
                        <i className="fa fa-bars" aria-hidden="true"></i>Details</a>
                    <a className="btn btn-default" onClick={()=>deleteHandler(item._id)}>
                                    <i className="fa fa-trash-o fa-lg"></i> Delete</a>
                    </div>
                    
                </div>                
                )
            })}

            </div>
        </React.Fragment>
    )
}

export default FavoriteList;