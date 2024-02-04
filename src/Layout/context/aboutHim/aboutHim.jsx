import React, { useEffect, useState } from 'react';
import { auth, usersCollection, db } from '../../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import shape from '../../../svgs/about/Shape.svg';
import shape1 from '../../../svgs/about/ic_Place.svg';
import shape2 from '../../../svgs/about/ic_website.svg';
import shape3 from '../../../svgs/about/ic_date.svg';
import shape4 from '../../../svgs/about/ic_Working.svg';
import shape5 from '../../../svgs/about/ic_relationship.svg';
import edit_svg_blue from '../../../image/edit_svg_blue.svg';
import { useParams } from 'react-router-dom'

const AboutHim = () => {
    const [aboutHimShow, setaboutHimShow] = useState("");
    const [fullTime, setFullTime] = useState(false);
    const [partTime, setPartTime] = useState(false);
    const [userData, setUserDate] = useState(null)
    const [userId, setUserId] = useState(null)
    const { userId: userIdParam } = useParams();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'users', userId || userIdParam));
                const userData = userDoc.data();
                setUserDate(userData || {});
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId, userIdParam]);

    const servicesItems = ["Full Time", "Part time"];

    const handleCheckboxChange = (index) => {
        if (index === 0) {
            setFullTime(!fullTime);
            setPartTime(false);
        } else if (index === 1) {
            setPartTime(!partTime);
            setFullTime(false);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const userId = auth.currentUser.uid;
            const userRef = doc(usersCollection, userId);

            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const currentData = userDoc.data();

                const address = document.getElementById('address').value || currentData.address;
                const site = document.getElementById('site').value || currentData.site;
                const services = {
                    fullTime,
                    partTime,
                };
                const additionalInfo = document.getElementById('additionalInfo').value || currentData.additionalInfo;

                const userData = {
                    address,
                    site,
                    services,
                    additionalInfo,
                };

                const updatedUserData = { ...currentData, ...userData };

                await setDoc(userRef, updatedUserData);

                setaboutHimShow(false);
                window.location.reload();
            } else {
                console.error("User not found");
            }
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };


    return (
        <div>
            {aboutHimShow && (
                <form>
                    <div className="fixed inset-0 z-50 overflow-hidden flex bg-opacity-50 bg-gray-500 justify-center items-center">
                        <div className="relative w-96 mx-auto bg-white rounded-lg shadow-lg">
                            <div className="flex items-start justify-between p-5 border-b border-blueGray-200 rounded-t">
                                <h3 className="text-2xl font-semibold">Edit About Him</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <h1 className="text-xl font-medium">Enter your information correctly</h1>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Your Address</label>
                                    <input
                                        type="text"
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-600"
                                        placeholder="Enter your address"
                                        id="address"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Your Site</label>
                                    <input
                                        type="text"
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-600"
                                        placeholder="Enter your site. Ex: admrt.com"
                                        id="site"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 pb-1">Services</label>
                                    <ul className="grid gap-2 grid-cols-2">
                                        {servicesItems.map((item, idx) => (
                                            <li key={idx} className="flex items-center space-x-2 text-sm">
                                                <input
                                                    id={`service-${idx}`}
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-indigo-600 accent-blue-600"
                                                    checked={idx === 0 ? fullTime : partTime}
                                                    onChange={() => handleCheckboxChange(idx)}
                                                />
                                                <label htmlFor={`service-${idx}`} className="text-gray-700">
                                                    {item}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Additional Information</label>
                                    <input
                                        type="text"
                                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-600"
                                        placeholder="Enter additional information"
                                        id="additionalInfo"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-end p-4 border-t border-blueGray-200 rounded-b">
                                <button
                                    className="text-blue-700 hover:text-indigo-700 px-4 py-2 font-semibold focus:outline-none"
                                    onClick={() => setaboutHimShow(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 font-semibold rounded focus:outline-none"
                                    type="button"
                                    onClick={handleSaveChanges}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </form>
            )}

            <div className='mt-0'>
                <div className='flex justify-between my-3'>
                    <div>
                        <h1 className='font-semibold'>About Him</h1>
                    </div>
                    <div>
                        <img src={shape} alt='' />
                    </div>
                </div>
                <div className='border'></div>
                <div className='my-3'>
                    <h1>Some other Information to make it Trusted these information's are verified.</h1>
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
                        <div className='flex justify-center items-center cursor-pointer'>
                            <button onClick={() => {
                                setaboutHimShow(true)
                            }}>
                                <img src={edit_svg_blue} alt='' />
                            </button>
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
                        <div className='flex justify-center items-center cursor-pointer'>
                            <button onClick={() => {
                                setaboutHimShow(true)
                            }}>
                                <img src={edit_svg_blue} alt='' />
                            </button>
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
                        <div className='flex justify-center items-center cursor-pointer'>
                            <button onClick={() => {
                                setaboutHimShow(true)
                            }}>
                                <img src={edit_svg_blue} alt='' />
                            </button>
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
                        <div className='flex justify-center items-center cursor-pointer'>
                            <button onClick={() => {
                                setaboutHimShow(true)
                            }}>
                                <img src={edit_svg_blue} alt='' />
                            </button>
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
                        <div className='flex justify-center items-center cursor-pointer'>
                            <button onClick={() => {
                                setaboutHimShow(true)
                            }}>
                                <img src={edit_svg_blue} alt='' />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
        </div>
    )
}

export default AboutHim;