import React, { useEffect, useState } from 'react';
import { auth, db, usersCollection } from "../../firebase/firebase";
import emptyBg from '../../image/Image (2).svg'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const EditBg = () => {
    const { userUID, split } = useParams();
    const [bgImage, setBgImage] = useState('');
    const [userId, setUserId] = useState(null);
    const [viewrRequest, setViewRequest] = useState(false);
    const [request, setRequest] = useState(null);
    const [userSplit, setUserSplit] = useState(null);
    const [userUsername, setUserUsername] = useState(null);
    const [profileUsername, setProfileUsername] = useState(null);
    const [requestLoading, setRequestLoading] = useState(false);
    const [dontVerificationRequest, setDontVerificationRequest] = useState(false);
    const [removeRequest, setRemoveRequest] = useState()
    const [removeRequestLoading, setRemoveRequestLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserId(user.uid);
                try {
                    const callData = await getDoc(doc(usersCollection, user.uid));
                    if (callData.exists()) {
                        const userData = callData.data();
                        const splitCall = userData.split;
                        const usernameCall = userData.username;
                        setUserSplit(splitCall);
                        setUserUsername(usernameCall);
                    }

                    const userProfileData = await getDoc(doc(usersCollection, userUID));
                    if (userProfileData.exists()) {
                        const profileData = userProfileData.data();
                        const profileUsernameCall = profileData.username;
                        const requestCall = profileData.requests[userUsername];
                        setProfileUsername(profileUsernameCall);
                        setRequest(requestCall);
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, [userUID, userUsername]);

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

    useEffect(() => {
        const handleSplitCleaning = () => {
            if (split !== userSplit) {
                setViewRequest(true);
            } else {
                setViewRequest(false);
            }
        };

        handleSplitCleaning();
    }, [split, userSplit]);

    const handleRequest = async () => {
        try {
            setRequestLoading(true);

            const userRef = doc(db, 'users', userUID);
            await updateDoc(userRef, {
                [`requests.${userUsername}`]: false,
            });

            setRequestLoading(false);
        } catch (error) {
            console.error('Error sending request:', error);
            setRequestLoading(false);
        }
    };

    useEffect(() => {
        const handleVerification = () => {
            if (request === false) {
                setDontVerificationRequest(false);
            } else {
                setDontVerificationRequest(true);
            }
        }
        handleVerification()
    })

    const handleRequestRemove = async () => {
        try {
            setRemoveRequestLoading(true);
    
            const userRef = doc(db, 'users', userUID);
            const userDoc = await getDoc(userRef);
    
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const updatedRequests = { ...userData.requests };
                delete updatedRequests[userUsername]; 
                await updateDoc(userRef, {
                    requests: updatedRequests,
                });
            }
            setRemoveRequestLoading(false);
            setRemoveRequest(true);
            window.location.reload();
        } catch (error) {
            console.error('Error removing request:', error);
            setRemoveRequestLoading(false);
        }
    };
    

    return (
        <div className="relative h-72 bg-cover bg-center border rounded-lg bg-gray-100" style={{ backgroundImage: bgImage ? `url(${bgImage})` : `url(${emptyBg})` }}>
            {viewrRequest ?
                <>
                    <div className="flex justify-between items-center p-6">
                        <div className="flex items-center">
                            {request ? (
                                <button onClick={handleRequestRemove} className="text-white font-semibold bg-gray-700 bg-opacity-75 p-2 rounded-lg hover:bg-opacity-100">
                                    {removeRequestLoading ? "Loading..." : "Remove request"}
                                </button>
                            ) : (
                                <button onClick={handleRequest} className="text-white font-semibold bg-blue-700 bg-opacity-75 p-2 rounded-lg hover:bg-opacity-100">
                                    {requestLoading ? "Loading..." : "Sent request"}
                                </button>
                            )}
                        </div>
                    </div>
                </>
                : null}
        </div>
    );
};

export default EditBg;
