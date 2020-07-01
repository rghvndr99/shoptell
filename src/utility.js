
export const getCookie=(cookieName)=>{
    const cookieStr=document.cookie.split(';').filter((item)=>item.includes(cookieName+'='))[0];
    return (cookieStr || '').split('=')[1];
}
export const setCookie=(cookie)=> { 
    document.cookie = cookie;
}

export const redirectToLogin=()=>{
    setCookie("token=; max-age=0");
    setCookie("isAdmin=; max-age=0");
    document.location.href = '/login';
}