import React,{useState,useEffect} from 'react';
import base64 from 'base-64';
import {baseUrl,facebookAppID, googleID} from '../configuration';
import Register from './register';
import {useAppContext} from '../context';
import {setCookie,getCookie} from '../utility';
import { useHistory } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


const LoginAndRegistration=(props)=>{
	const [isSignUp,setSignup]=useState(false);
	const [inputState,setInputstate]=useState({});
	let [initialState, dispatch] = useAppContext();
	const history = useHistory();

	const loginHandler=()=>{
		let {username='',password=''}=inputState;
		if(username===''|| password==='') return;
		fetch(baseUrl+'users/login',{
			method:'post',
			headers: { 'Content-type': 'application/json' },
			body:JSON.stringify({username,password})     	
		})
		.then(res=>res.json())
		.then(data=>{
			afterLoginSuccess(data);
		},error=>{
			dispatch({type:'userDetails',payload: {}});
		}).catch(err=>console.log(err));
	}

	const facebookloginHandler=(res)=>{
        fetch(baseUrl+'users/facebook/token',{
            method:'get',
            headers:{
                'access_token': res.accessToken
            }
        }).then(res=>{
            if(res.status=== 200){
                afterLoginSuccess(res);
            }
            else{
				console.log(res);
			}
        })
	}
	const googleLoginhandler=(res)=>{
		console.log(baseUrl+'users/google/token');
		fetch(baseUrl+'users/google/token',{
            method:'get',
            headers:{
                'access_token': res.accessToken
            }
        }).then(res=>{
            if(res.status=== 200){
                afterLoginSuccess(res);
            }
            else{
				console.log(res);
			}
        })
	}
	
	const afterLoginSuccess=(data)=>{
		dispatch({type:'userDetails',payload: data});
			const date = new Date();
			date.setTime(date.getTime()+(24*60*60*1000));
			setCookie("token=" + data.token + "; expires=" + date.toGMTString());
			setCookie("isAdmin=" + data.isAdmin + "; expires=" + date.toGMTString()); 
			history.push('/userprofile');
	}

	const changehandler=(e)=>{
		let input={...inputState};
		input[e.target.name]=e.target.value;
		setInputstate(input);
	}
	const login=()=>{
		return (
			<form className="form-signin">
            
            <div className="social-login">
				<FacebookLogin
            		appId={facebookAppID}
					callback={facebookloginHandler} 
					cssClass="btn facebook-btn social-btn"
					icon={<i className="fa fa-facebook-f"></i>}
       			/>
				
				<GoogleLogin
    				clientId={googleID}
					buttonText="Login with Google"
					onSuccess={googleLoginhandler}	
					className="google-btn social-btn"
				>				
				</GoogleLogin>

                
            </div>
            <p style={{textAlign:"center"}}> OR  </p>
            <input type="text" name="username" id="inputEmail" className="form-control" placeholder="Email address" required="" autoFocus="" onChange={changehandler}/>
            <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required="" onChange={changehandler}/>
            
            <button className="btn btn-default btn-block btn-sign" type="button" onClick={loginHandler}><i className="fa fa-sign-in-alt"></i> Sign in</button>
            <hr/>
            <button className="btn btn-success btn-block" type="button" id="btn-signup" onClick={()=>setSignup(true)}><i className="fa fa-user-plus"></i> Sign up New Account</button>
            </form>
		)
	}

    return(
		<div id="logreg-forms">
		<h1 className="h3 mb-3 font-weight-normal" style={{textAlign: "center"}}>{isSignUp?'Sign up': 'Sign in'} </h1>
        {!isSignUp && login()}
	    {isSignUp && <Register/> }
    </div>
       )
}

export default LoginAndRegistration;