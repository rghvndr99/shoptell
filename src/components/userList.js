import React, { useEffect, useState, } from 'react';
import { baseUrl } from '../configuration';
import { getCookie,redirectToLogin } from '../utility';
import Msg from './msg';

const ListUser = () => {
    const [list, setList] = useState([]);
    const [showMsg,setMsg]=useState(false);

    useEffect(() => {
        fetch(baseUrl + 'users', {
            method: 'get',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('token')
            },

        }).then(res => {
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
        })
            .then(data => {
                setList(data);
            })
    }, [])
    return (
        <React.Fragment>
            { showMsg? <Msg content={showMsg} />: null}
            <ul class="list-group">
            { list && !!list.length ? list.map((item) => {
                return (<li class="list-group-item">{item.firstname}</li>)
            }) :
                <li class="list-group-item">No user found</li>
            }
        </ul>
        </React.Fragment>
        
    )
}

export default ListUser;