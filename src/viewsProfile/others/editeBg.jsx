import React, { useEffect, useState } from 'react';
import { db } from "../../firebase/firebase";
import emptyBg from '../../image/Image (2).svg'
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom'

const EditBg = () => {
    const { userUID } = useParams();
    const [bgImage, setBgImage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', userUID));

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const imageUrl = userData.backgroundURL || '';
                    setBgImage(imageUrl);
                } else {
                    console.log('User not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userUID]);

    return (
        <div className="relative h-72 bg-cover bg-center border rounded-lg bg-gray-100" style={{ backgroundImage: bgImage ? `url(${bgImage})` : `url(${emptyBg})` }} />
    );
};

export default EditBg;
