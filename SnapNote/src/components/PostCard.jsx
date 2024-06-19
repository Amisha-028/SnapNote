// import React from 'react'
// import appwriteService from "../appwrite/config"
// import {Link} from 'react-router-dom'

// function PostCard({$id, title, featuredImage}) {
//     // console.log($id);
//     // console.log(title);
//     // console.log(featuredImage);
//   return (
//     <Link to={`/post/${$id}`}>
//         <div className='w-full bg-gray-100 rounded-xl p-4'>
//             <div className='w-full justify-center mb-4'>
//                 <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
//                 className='rounded-xl' />

//             </div>
//             <h2
//             className='text-xl font-bold'
//             >{title}</h2>
//         </div>
//     </Link>
//   )
// }


// export default PostCard

import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        const fetchPreview = async () => {
            if (featuredImage) {
                try {
                    const response = await appwriteService.getFilePreview(featuredImage);
                    setPreviewUrl(response.href); // Assuming response contains a href property with the URL
                } catch (error) {
                    console.error('Failed to fetch file preview', error);
                }
            }
        };
        fetchPreview();
    }, [featuredImage]);

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {previewUrl ? (
                        <img src={previewUrl} alt={title} className='rounded-xl' />
                    ) : (
                        <div className='w-full h-48 bg-gray-200 rounded-xl animate-pulse'></div>
                    )}
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;

