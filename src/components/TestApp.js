import React, { useState } from 'react';
import axios from '../axios';
import newAxios from 'axios';

export default () => {
    // 1. User chooses a picture
    // 2. Check for the size and type on BE
    // 3. If (2) fails, show the error
    // 4.1. If (2) passes, then show avatar preview
    // 4.2. Get the Signed S3 from BE
    // 5. Now upload directly from FE to S3

    // const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState('Preview...')
    const handleChange = (event) => {
        // setAvatar(event.target.files[0]);
        const avatar = event.target.files[0];
        const formData = new FormData();
        formData.append('avatar', avatar);
        
        let hasError = false;
        axios.post(
            'preview-avatar',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then(({ data }) => {
            newAxios.put(data.signedRequest, avatar).then(res => {
                setPreview(<img src={data.url} alt="kuft" />)
                console.log(res);
            }).catch(err => { console.log(err) });

        }).catch(err => {
            console.log({...err})
            // err.response.data: {message: "Wrong File Type."}
            // err.response.data: {message: "File Size Exceeded."}
            const errMsg = err.response.data.message;
            setPreview(errMsg);
            hasError = true;
        });

        if (hasError) event.target.files = [];
    }

    return (
        <>
            <input type="file" onChange={handleChange} />
            <div>{preview}</div>
        </>
    )
}