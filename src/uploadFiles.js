import React from 'react';

const UploadFiles=()=>{
    const API_URL='http://localhost:3001/';
    const adminHash='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJjNDA0NDFkNTBhNjZmYTRkNDk2YTgiLCJpYXQiOjE1OTAxMjU3MzMsImV4cCI6MTU5MDEyOTMzM30.6yRga4kQtdRqsxp3GSQDXe33uPpuL3YW5OuPa1l2YUM';
    const handleFileUpload=(e)=>{
        const files = Array.from(e.target.files);   
        const formData = new FormData();        
        formData.append('imgFile', files[0])
        //console.log('ragh', files);
        fetch(`${API_URL}imageupload`, {
          method: 'post',
          body: formData,
          headers: { 
            //'Content-type': 'multipart/form-data',
            'Authorization': 'Bearer '+adminHash
        },
        })
        .then(res => res.text())
        .then(images => {
          console.log('img upload', images);
        });
    }
    return (
      
    <div className='button'>
        <input type='file' id='multi' name="imgFile" onChange={handleFileUpload}/>
   </div>
    )
};

export default UploadFiles;