import React, { useState, useEffect } from "react";
import {baseUrl} from '../configuration';
import {getCookie} from '../utility';
import Msg from './msg';

const AddItem = (props) => {
    const [formElement,setFormElementValue]=useState({});
    const [showMsg,setMsg]=useState(false);
    const token= getCookie('token');
    let { ID } = props.match.params;
    if(ID==='default') ID=undefined;

    const changeHandler=(e)=>{        
        let formEle={...formElement};
        const {name,type,value,checked,files}= e.target;
        if(type==='checkbox'){
            formEle[name]=checked.toString();
        }else if(type===""){
            formEle[name]= files[0];
        }else {
            formEle[name]= value;
        }        
        setFormElementValue(formEle);
    }
    const addHandler=(e)=>{
        e.preventDefault();
        formElement.image='na';
        formElement.comments=[];       
        
        const url= ID?baseUrl+'products/'+ID: baseUrl+'products'
        fetch(url,{
			method: ID?'put':'post',
			headers: { 
				'Content-type': 'application/json',
				'Authorization': 'Bearer '+token
			},
			body:JSON.stringify(formElement) 	
		})
		.then(data=>{
            setMsg(true);
		})
    }
    useEffect(()=>{
        if(ID) {
            fetch(baseUrl+'products/'+ID,{
                method:'get',
                headers: {
                    "Content-Type": "application/json",
                },   
                credentials: 'same-origin',     	
            })
            .then(res=>res.json())
            .then(data=>{
                const itemDetails= {
                    ...data,
                }              	
                setFormElementValue(itemDetails);	
            })
        }
    },[])

    const rsetHandler=(e)=>{
        e.preventDefault();
        setFormElementValue({})
    }


    return (
       
        <div className="addItem">
            <form className="form-horizontal" >
           { showMsg? <Msg content="action completed" />: null}
                <fieldset>
                    <legend className="heading">Add Item</legend>

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-4 control-label" htmlFor="product_id">Name</label>
                            <div className="col-md-4">
                                <input onChange={changeHandler} value={formElement.name||''} id="name" name="name" placeholder="name" className="form-control input-md" required="" type="text" />

                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-4 control-label" htmlFor="description">Description</label>
                            <div className="col-md-4">
                                <textarea value={formElement.description||''} onChange={changeHandler} className="form-control" id="description" name="description"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-4 control-label" htmlFor="price">Price</label>
                            <div className="col-md-4">
                                <input onChange={changeHandler} id="author" name="price" value={formElement.price||''} placeholder="price" className="form-control input-md" required="" type="number" />

                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-4 control-label" htmlFor="category">Category</label>
                            <div className="col-md-4">
                            <select onChange={changeHandler} id="category" name="category" className="form-control">
                                <option defaultValue>primary</option>
                                <option>Secondary</option>
                                <option>last</option>
                            </select>

                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-4 control-label" htmlFor="label">Label</label>
                            <div className="col-md-4">
                                <input onChange={changeHandler} id="label" name="label" value={formElement.label||''} placeholder="label" className="form-control input-md" required="" type="text" />

                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-4 control-label" htmlFor="featured">Featured</label>
                            <div className="col-md-4">
                                    <input onChange={changeHandler} checked={formElement.featured || false} value={formElement.featured || false} name="featured" type="checkbox" value=""/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-4 control-label" htmlFor="filebutton">image</label>
                            <div className="col-md-4">
                            <input type='file' id='multi' name="imgFile" onChange={changeHandler}/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <label className="col-md-4 control-label" htmlFor="singlebutton"></label>
                            <div className="col-md-4">
                                <button onClick={(e)=>addHandler(e)} id="singlebutton" name="singlebutton" className="btn btn-default">{ID?'Edit':'Add'}</button>
                                <button onClick={rsetHandler} className="btn btn-default">Reset</button>
                            </div>
                        </div>
                    </div>

                </fieldset>
            </form>
        </div>
    )
}

export default AddItem;