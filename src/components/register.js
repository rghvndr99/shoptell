import React,{useState} from 'react';
import base64 from 'base-64';
import {baseUrl} from '../configuration';

const Register=(props)=>{
	const [inputState,setInputstate]=useState({});

	const registerHandler=()=>{
        if(inputState.password !== inputState.confirmpassowrd) {
            return;
        }
        const fieldObj={
            firstname: inputState.firstName,
            lastname: inputState.lastName,
            password: inputState.password,
            username: inputState.username,
        };	

		fetch(baseUrl+'users/signup',{
			method:'post',
			headers: { 'Content-type': 'application/json' },
			body:JSON.stringify(fieldObj)     	
		})
		.then(res=>res.json())
		.then(data=>{
			localStorage.setItem('token', data.token);
		}).catch(err=>console.log(err));
	}

	const changehandler=(e)=>{
		let input={...inputState};
		input[e.target.name]=e.target.value;
		setInputstate(input);
    }
    
    return (
        <React.Fragment>
        <form action="/signup/" className="form-signup">
        <input type="text" onChange={changehandler} id="user-name" name="username" className="form-control" placeholder="username" required="" autofocus=""/>
        <input type="text" onChange={changehandler} id="user-email" name="firstName" className="form-control" placeholder="first name" required autofocus=""/>
        <input type="text" onChange={changehandler} id="user-email" name="lastName" className="form-control" placeholder="last name" required autofocus=""/>
        <input type="password" onChange={changehandler} id="user-pass" name="password" className="form-control" placeholder="Password" required autofocus=""/>
        <input type="password" onChange={changehandler} id="user-repeatpass" name="confirmpassowrd" className="form-control" placeholder="Repeat Password" required autofocus=""/>

        <button className="btn btn-default btn-block btn-sign" type="button" onClick={registerHandler}><i className="fa fa-user-plus"></i> Sign Up</button>
        <a href="/login" id="cancel_signup"><i className="fa fa-angle-left"></i> Back</a>
    </form>
    <br/>
    </React.Fragment>
    )
}

export default Register;