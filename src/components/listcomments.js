import React,{useEffect,useState,} from 'react';
import {baseUrl} from '../configuration';
import {useAppContext} from '../context';
import {setCookie,getCookie} from '../utility';

const CommentsList=(props)=>{
    const [comments,setComments]=useState([]);
    const { ID } = props.match.params;
    const [initialState, dispatch] = useAppContext();
    const {userInfo={
        userId:''
    }}=initialState;

    useEffect(()=>{
        fetch(baseUrl+'products/'+ID+'/comments',{
			method:'get',
			headers: {
            	"Content-Type": "application/json",            	
        	},   
        	credentials: 'same-origin',     	
		})
		.then(res=>res.json())
		.then(data=>{
			setComments(data);
		})
    },[]);

    const editComment=(e,commentId)=>{

    }
    const deleteComment=(e,commentId)=>{
        fetch(baseUrl+'products/'+ID+'/comments/'+commentId,{
			method:'delete',
			headers: { 
				'Content-type': 'application/json',
				'Authorization': 'Bearer '+getCookie('token')
			},				
		}).then(res=>{
            if(res && res.status===200) return res.json();
            else return{
                'error': res
            }
        }).then(res=>{
            console.log('deleted successfully', res);
        })
    }

    const generateRating=(rating)=>{
        let ratingArr=[]
        for(let i=0;i<5;i++) {
            ratingArr.push(<span className="float-right1"><i class={`fa fa-star rating ${i<rating?'rating-active':''}`}></i></span>)
        }
        return ratingArr;
    }
    return (
        <div className="container commentList">
            {!comments.length && <h3 class="text-primary">No comments found!</h3>}
            {comments.map(item=>{            
            return (
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-2">
                            <img src="https://via.placeholder.com/100x100" className="img img-rounded img-fluid" />
                        </div>
                        <div className="col-md-10">
                            <p>
                                <a href="#">
                                <strong>{item?.author?.firstname +' '+ item?.author?.lastname}</strong>
                                </a>                                                             

                            </p>

                            <p>{item.comment}</p>
                            <div className="rating" style={{clear: 'both'}}> 
                            {
                                    generateRating(item.rating)
                             }
                             </div>
                            <p>{item.createdAt.split('T')[0]}</p> 
                            {(item?.author?._id===userInfo.userId) && 
                            <p>
                                <a className="float-right  btn btn-default ml-2" onClick={(e)=>editComment(e,item._id)}> <i className="fa fa-edit"></i> Edit</a>
                                <a className="float-right btn btn-default" onClick={(e)=>deleteComment(e,item._id)}> <i className="fa fa-trash-o"></i> Delete</a>
                            </p>
            }
                        </div>
                    </div>
                </div>
            </div>)
            })}
        </div>
    );
}

export default CommentsList;