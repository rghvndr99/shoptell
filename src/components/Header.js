import React from 'react';
import { NavLink } from "react-router-dom";
import {getCookie} from '../utility';
import Avatar from './avatar';
import {useAppContext} from '../context';

const Header=(props)=>{
  const [initialState, dispatch] = useAppContext();
    return (
        <nav className="headerNav">
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
        {getCookie('token')?<NavLink exact activeClassName="active" to="/favorite">
          Favorate
        </NavLink>:null
        }        
        <NavLink activeClassName="active" to="/about">
          About
        </NavLink> 
        <NavLink activeClassName="active" to="/contact">
          Contact us
        </NavLink>
        {
        getCookie('token') || Object.keys(initialState.userInfo).length>0?<Avatar />:
        <NavLink activeClassName="active" className="user-link" to="/login">
          Login
        </NavLink>
        }
      </nav>
    )
}

export default Header;