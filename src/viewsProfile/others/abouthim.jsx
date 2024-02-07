import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import shape1 from '../../svgs/about/ic_Place.svg';
import shape2 from '../../svgs/about/ic_website.svg';
import shape3 from '../../svgs/about/ic_date.svg';
import shape4 from '../../svgs/about/ic_Working.svg';
import shape5 from '../../svgs/about/ic_relationship.svg';
import view_eye from '../../image/eye 1.svg';
import view_search from '../../image/search 1.svg';
import { useParams } from 'react-router-dom'

const AboutHim = () => {
    const [userData, setUserDate] = useState(null)
    const { userUID } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users',  userUID));
                const userData = userDoc.data();
                setUserDate(userData || {});
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userUID]);

    return (
        <div>
            <div className='mt-8'>
                <div className='flex justify-between my-3'>
                    <div>
                        <h1 className='font-semibold'>About</h1>
                    </div>
                    <div>
                    </div>
                </div>
                <div className='border'></div>
                <div className='my-3'>
                    <h1>Tell potential advertisers more about you.</h1>
                </div>
                <div className='border'></div>
            </div>
            {userData && (
                <div>
                    <div className='flex justify-between my-4'>
                        <div className='flex gap-5 '>
                            <div className=''>
                                <img src={shape1} alt='' />
                            </div>
                            <div>
                                <h1>{userData.address || "none. Please fill in your information!"}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between my-4'>
                        <div className='flex gap-5 '>
                            <div className=''>
                                <img src={shape2} alt='' />
                            </div>
                            <div>
                                <h1>{userData.site || "none. Please fill in your information!"}</h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between my-4'>
                        <div className='flex gap-5'>
                            <div className=''>
                                <img src={shape3} alt='' />
                            </div>
                            <div>
                                <h1>Joined January 2024</h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between my-4'>
                        <div className='flex gap-5'>
                            <div className=''>
                                <img src={shape4} alt='' />
                            </div>
                            <div>
                                <h1>Working at Youtube ()</h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between my-4'>
                        <div className='flex gap-5'>
                            <div className=''>
                                <img src={shape5} alt='' />
                            </div>
                            <div>
                                <h1>{userData.additionalInfo || "Have Channel with Nova Bee"}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='flex justify-between my-3 mt-20'>
                <div>
                    <h1 className='font-semibold'>Analytics</h1>
                </div>
            </div>
            <div className='border'></div>

            <div className='flex justify-between my-4'>
                <div className='flex gap-5'>
                    <img src={view_eye} alt='' />
                    <h1>Viewed Hosting Space</h1>
                </div>
                <div>4,521</div>
            </div>
            <div className='flex justify-between my-4'>
                <div className='flex gap-5'>
                    <img src={view_search} alt='' />
                    <h1>Search appearances</h1>
                </div>
                <div>761</div>
            </div>
        </div>
    )
}

export default AboutHim;
