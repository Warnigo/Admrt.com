import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const User = () => {
    const { userUID } = useParams();
    const [fullName, setFullName] = useState('');
    const [userImg, setUserImg] = useState('');
    const avatarUrl = 'https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg';

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', userUID));

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const userFullName = userData.fullName;
                    const imageUrl = userData.imageUrl || '';
                    setFullName(userFullName);
                    setUserImg(imageUrl);
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
        <div className="flex -translate-y-10 ml-4">
            <div className="relative">
                <img
                    src={userImg || avatarUrl}
                    alt="...leading. please make refresh"
                    className="w-[150px] h-[150px] rounded-full border-8 border-white"
                />
            </div>
            <div className="flex justify-center w-1/3 items-center">
                <div className=''>
                    <h1 className='font-medium text-lg md:text-2xl'>{fullName}</h1>
                    <div className="flex">
                        <h1 className='text-sm w-full font-medium text-blue-800'><span
                            className='text-sm text-gray-500'>Experitise: </span>Magician, Youtuber, Vlogs</h1>
                        <div className='flex justify-center items-center cursor-pointer ml-2'>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default User;
