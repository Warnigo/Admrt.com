import React, { useCallback, useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';
import { usersCollection } from '../firebase/firebase';
import { avatar } from '../modul/main';
import youtube from './Primary/youtube.svg';
import twitter from '../svgs/social-media/Twitter X.svg';
import facebook from './Primary/facebook.svg';
import instagram from './Primary/instagram.svg';
import tiktok from '../svgs/social-media/tiktok-svgrepo-com.svg'
import whatsapp from '../svgs/social-media/whatsapp-icon-logo-svgrepo-com.svg';
import Linkedin from '../svgs/social-media/Rectangle 6594.svg'
import { Link } from 'react-router-dom';

const Cards = () => {
    const [userData, setUserData] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const querySnapshot = await getDocs(usersCollection);
            const data = querySnapshot.docs.map(doc => doc.data());
            setUserData(data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const platformIcons = (platform) => {
        switch (platform) {
            case 'Youtube':
                return youtube;
            case 'X':
                return twitter;
            case 'Facebook':
                return facebook;
            case 'Instagram':
                return instagram;
            case 'Tik Tok':
                return tiktok;
            case 'WhatsApp':
                return whatsapp;
            case 'Linkedin':
                return Linkedin;
            default:
                return null;
        }
    };

    return (
        <div className='p-3'>
            <div className='max-w-screen-2xl mx-auto px-3 md:px-0'>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {userData.map(user => (
                        <div key={user.uid} className='border rounded-lg p-3'>
                            <div className='flex mt-5'>
                                <div className='w-1/3'>
                                    <img className='w-12 h-12 rounded-full' src={user.imageUrl || avatar} alt="iconYoutuber" />
                                </div>
                                <div className='w-2/3'>
                                    <h1 className='userPhoto font-semibold'>{user.fullName}</h1>
                                    <h1 className='text-gray-500 text-sm'>{user.experitise && user.experitise.length > 0 ? user.experitise.join(', ') : 'none'}</h1>
                                </div>
                            </div>
                            <div className='flex flex-coll gap-3 justify-end'>
                                {user.socialMedia ? Object.entries(user.socialMedia).map(([platform, value]) => (
                                    platform !== "timestamp" && (
                                        <Link to={`${value}`}>
                                            <div key={platform} >
                                                <img src={platformIcons(platform)} alt={platform} className='h-7' />
                                            </div>
                                        </Link>
                                    )
                                )) : (
                                    <div className='flex cursor-not-allowed opacity-50 gap-3'>
                                        <img src={youtube} alt="YouTube" className='h-7' />
                                        <img src={facebook} alt="Facebook" className='h-7' />
                                        <img src={instagram} alt="Instagram" className='h-7' />
                                        <img src={twitter} alt="Twitter" className='h-7' />
                                    </div>
                                )}
                            </div>
                            <div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cards;
