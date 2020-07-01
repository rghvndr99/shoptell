import React,{useState} from 'react';
import {baseUrl} from '../configuration';
import {setCookie,getCookie,redirectToLogin} from '../utility';
import Msg from './msg';

const AddComment=(props)=>{
    const [ratings,setRating]=useState({});
    const [comment,setComment]=useState({});
    const [showMsg,setMsg]=useState(false);
    const { ID } = props.match.params;

    const ratingHandler=(index)=>{
        const prevrating={...ratings};
        prevrating[index]=!prevrating[index];
        setRating(prevrating);
    }

    const changeHandler=(e)=>{
        let prevComment={...comment};
        prevComment[e.target.name]= e.target.value;
        setComment(prevComment);
    }

    const generateRating=()=>{
        let ratingStar=[];
        for(let i=1;i<6;i++) {
            ratingStar.push(<i class={`fa fa-star rating ${ratings[i]?'rating-active':''}`}  onClick={()=>ratingHandler(i)} aria-hidden="true"></i>)
        }
        return ratingStar;
    }

    const addComment=(e)=>{
        let counter=0;
        for(let key in ratings) {
            counter=ratings[key]?counter+1:counter
        }
        const updatedcomments={
            ...comment,
            rating: counter
        }
        e.preventDefault();
        fetch(baseUrl+'products/'+ID+'/comments',{
			method:'post',
			headers: { 
				'Content-type': 'application/json',
				'Authorization': 'Bearer '+getCookie('token')
			},
			body:JSON.stringify(updatedcomments) 	
		}).then(res=>{
            const {status}=res;
            if(status && status=== 200) {
               return res.json();
            }
            else if(status && status === 401) {
                setMsg('you are not authenicated, being redirected to login');
                setTimeout(() => {
                    redirectToLogin();
                }, 500);                
            }
            else {
                console.log('there is a error');
            }
        }
        )
		.then(data=>{
			console.log('data',data);
		})
    }
    return (
        <form action="#" method="post" className="form-horizontal" id="commentForm" role="form"> 
        { showMsg? <Msg content={showMsg} />: null}
        <div className="form-group">
            <div className="row">
            <label for="email" className="col-sm-2 control-label">Comment</label>
            <div className="col-sm-10">
              <textarea onChange={changeHandler} className="form-control" name="comment" id="addComment" rows="5"></textarea>
            </div>
            </div>
        </div>
        <div className="form-group">
            <div className="row">
            <label for="rating" className="col-sm-2 control-label">Rating</label>
            <div className="col-sm-10">
                                 
            {generateRating()}
            </div>
            </div>
        </div>
        <div className="form-group">
            <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-10">                    
                <button className="btn btn-success btn-circle text-uppercase" onClick={(e)=>addComment(e)} type="submit" id="submitComment"><span className="glyphicon glyphicon-send"></span> Summit comment</button>
            </div>
            </div>
        </div>            
    </form>
    )
}

export default AddComment;