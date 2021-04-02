import React, { useState } from 'react';
import axios from '../axios';

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
        console.log(avatar);
        formData.append('avatar', avatar);
        
        let hasError = false;
        axios.post(
            'preview-avatar',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        ).then(res => {
            if (res.status === 200) {
                setPreview('YOUR AVATAR');
            } else {
                
            }
        }).catch(err => {
            console.log({...err})
            // data: {message: "Wrong File Type."}
            // data: {message: "File Size Exceeded."}
            setPreview('Ups, error!');
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