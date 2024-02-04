import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import ShowMoreText from 'react-show-more-text';
import { BsDot } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { db, saveUserDataToFirebase } from '../../firebase/firebase';
import editeicon from '../../image/edit_svg_blue.svg';

const IntoDescription = () => {
    const [showModal, setShowModal] = useState(false);
    const [isDialogOpened, setIsDialogOpened] = useState(false);
    const [dialogInput, setDialogInput] = useState('');
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState(null);
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
                setUserData(userData || {});
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId, userIdParam]);

    const addNew = () => {
        try {
            if (!!dialogInput.trim()) {
                const updatedUserData = { ...userData, introDescription: dialogInput };
                setUserData(updatedUserData);
                saveUserDataToFirebase(userId, updatedUserData);
            } else {
                alert('Please try again');
            }
            setShowModal(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div>
            {showModal && (
                <form>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-2/5 mx-auto">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">Overview</h3>
                                </div>
                                <div className="relative p-6 flex-auto flex justify-center items-start">
                                    <div>
                                        <h1>
                                            Use this space to show clients you have the skills and experience they're looking for.
                                            <br />
                                            <ul className="my-3">
                                                <li className="flex">
                                                    <BsDot className="mt-1" /> Describe your strengths and skills
                                                </li>
                                                <li className="flex">
                                                    <BsDot className="mt-1" /> Highlight projects, accomplishments, and education
                                                </li>
                                                <li className="flex">
                                                    <BsDot className="mt-1" /> Keep it short and make sure it's error-free
                                                </li>
                                            </ul>
                                        </h1>
                                        <div
                                            className="break-words overflow-hidden h-48 w-full"
                                            open={isDialogOpened}
                                            onClose={() => setIsDialogOpened(false)}
                                        >
                                            <form className="h-36">
                                                <textarea
                                                    value={dialogInput}
                                                    onChange={(e) => setDialogInput(e.target.value)}
                                                    className="h-36 overfull border-2 focus:outline-none border-blue-600 focus w-full peer rounded-lg resize-none px-3 py-2.5 font-sans text-sm font-normal"
                                                    placeholder="Example: I have a Bachelor of Arts (B.A.) in Graphic design from The Higher Education Technical School of Professional Studies in Novi Sad and I am a web and mobile designer with 10+ years of experience. My range of design services includes creating design for new apps (or a new design to improve existing ones), building UI design for mobile, tablet or desktop, making UX designs, wireframes and layout concepts, and redesigning websites or adapting to mobile and responsive design. I have worked with many clients such as Replay, O'Neill, Bench, OshKosh & Carters, etc. I'm working professionally with Sketch and Adobe tools. I will work with you to discover what you need and create the best solution. My priorities are quality and respect for deadlines and budget. I love to share my enthusiasm and passion for design, so feel free to contact me and let's get the conversation started."
                                                ></textarea>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-blue-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={addNew}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </form>
            )}
            {userData && (
                <div className="mt-5">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-semibold">Intro Description</h1>
                        <div className="flex  justify-center items-center cursor-pointer mx-5">
                            <div className="item">
                                <Button
                                    onClick={() => {
                                        setDialogInput(userData.introDescription);
                                        setIsDialogOpened(true);
                                        setShowModal(true);
                                    }}
                                >
                                    <img src={editeicon} alt="icon" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="border my-5"></div>
                    <div className="items overflow-hidden w-full break-words">
                        <ShowMoreText lines={3} more="more" less="less" className="content-css">
                            {userData.introDescription && userData.introDescription.trim().length > 0 ? (
                                <div dangerouslySetInnerHTML={{ __html: userData.introDescription }} />
                            ) : (
                                <p>No description available</p>
                            )}
                        </ShowMoreText>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IntoDescription;