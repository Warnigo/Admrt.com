import React, { useCallback, useEffect, useState } from 'react';
import 'flowbite';
import openSvg from '../image/chevron-down (1) 2.svg'
import closed from '../image/chevron-down (1) 1.svg'
import paypalSvg from '../svgs/payment/payment.svg'
import wiseSvg from '../svgs/payment/wise.svg'
import zelleSvg from '../svgs/payment/zille.svg'
import venmoSvg from '../svgs/payment/venmo.svg'
import payoneerSvg from '../svgs/payment/payoneer.svg'
import ModalDelete from '../Modals/ModalDelete';
import EditBackground from "../Layout/context/editeBackground";
import EditeUser from "../Layout/context/user";
import IntoDescription from "../Layout/context/intoDescription";
import { auth, usersCollection } from "../firebase/firebase";
import AboutHim from '../Layout/context/aboutHim/aboutHim';
import SocialMedia from '../Layout/context/socialMedia/socialMedia';
import { doc, getDoc } from 'firebase/firestore';
import shape from '../svgs/about/Shape.svg';
import Portfolio from '../Layout/context/portfolio/portfolio';
import { VscEmptyWindow } from "react-icons/vsc";
import { Specification } from '../Layout/context/specification';

function SiplePages() {
    const [userId, setUserId] = useState(null);
    const [split, setSplit] = useState(null);
    const [advertiserProfile, setAdvertiserProfile] = useState(false);
    const [requests, setRequests] = useState('')
    const [openPayment, setOpenPayment] = useState(false);
    const profile_amer = 'https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserId(user.uid);
                try {
                    const getCall = await getDoc(doc(usersCollection, user.uid));
                    if (getCall.exists()) {
                        const userData = getCall.data();
                        const splitCall = userData.split;
                        const comeRequestCall = userData.requests;
                        setSplit(splitCall);
                        const filteredRequests = Object.fromEntries(Object.entries(comeRequestCall));
                        setRequests(filteredRequests);
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                setUserId(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleUserAvater = useCallback(async (username) => {
        console.log();
    }, []);

    useEffect(() => {
        Object.keys(requests).map(username => handleUserAvater(username));
    }, [handleUserAvater, requests]);


    const handleOpenPayment = () => {
        setOpenPayment(!openPayment);
    };

    useEffect(() => {
        const handleProfilAdvertiser = () => {
            if (split === "advertiser") {
                setAdvertiserProfile(true)
            } else {
                setAdvertiserProfile(false)
            }
        }
        handleProfilAdvertiser()
    }, [split])

    return (
        <div className="App">
            <div className="max-w-screen-2xl mx-auto">
                <div className="md:flex">
                    <div className="w-full order-2 md:w-2/3 ">
                        <div className={"border p-2 md:p-5 rounded-xl"}>
                            <EditBackground userId={userId} split={split} />
                            <EditeUser />
                            <IntoDescription />
                        </div>
                        <Specification />
                        {split === 'adSpaceHost' && <Portfolio />}
                        {/* {advertiserProfile ? null :
                            <div className={`md:flex justify-between border py-2 px-3 md:py-4 md:px-7 ${openPayment ? "rounded-t-xl" : "rounded-xl"}`}>
                                <div className=''>
                                    <button>
                                        <h1 className='md:text-2xl font-semibold'>Payment Methods</h1>
                                    </button>
                                </div>

                                <div className='flex justify-between mt-3 md:mt-0 md:justify-center gap-5'>
                                    <div>
                                        <button data-modal-target="staticModal" data-modal-toggle="staticModal"
                                            class="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 py-1 px-2 rounded-lg text-xs md:text-sm text-center"
                                            type="button">

                                            + Add New Payment Method
                                        </button>
                                    </div>
                                    <div onClick={handleOpenPayment} className='flex items-center justify-between'>

                                        {openPayment ? <div>
                                            <img src={openSvg} alt='' />
                                        </div> : <div>
                                            <img src={closed} alt='' />
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        }

                        {openPayment ? (<div className='border rounded-b-xl'>
                            <div className='py-2 px-3 md:py-4 md:px-7'>
                                <div className="App">

                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <div
                                        className='border rounded-xl px-3 py-2 flex items-center justify-center gap-2 cursor-pointer'>
                                        <img src={paypalSvg} alt='' />
                                        <div className=''>
                                            <ModalDelete />
                                        </div>
                                    </div>
                                    <div
                                        className='border rounded-xl px-3 py-2 flex items-center justify-center  gap-2 cursor-pointer'>
                                        <img src={wiseSvg} alt='' />
                                        <div className=''>
                                            <ModalDelete />
                                        </div>
                                    </div>
                                    <div
                                        className='border rounded-xl px-3 py-2 flex items-center justify-center  gap-2 cursor-pointer'>
                                        <img src={zelleSvg} alt='' />
                                        <div className=''>
                                            <ModalDelete />
                                        </div>
                                    </div>
                                    <div
                                        className='border rounded-xl px-3 py-2 flex items-center justify-center  gap-2 cursor-pointer'>
                                        <img src={venmoSvg} alt='' />
                                        <div className=''>
                                            <ModalDelete />
                                        </div>
                                    </div>
                                    <div
                                        className='border rounded-xl px-3 py-2 flex items-center justify-center  gap-2 cursor-pointer'>
                                        <img src={payoneerSvg} alt='' />
                                        <div className=''>
                                            <ModalDelete />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>)
                         : null} */}
                    </div>
                    <div class="w-full py-5 max-[1200px]:px-4 px-10 order-1 md:order-2 md:w-1/3">
                        {advertiserProfile ? null :
                            <div className='mb-20'>
                                <div className='flex justify-between my-3'>
                                    <div>
                                        <h1 className='font-semibold'>New Connections</h1>
                                    </div>
                                    <img src={shape} alt="" />
                                </div>
                                <div className='border'></div>
                                <div className='my-3'>
                                    <h1>These are the connection which you have got from other users.</h1>
                                </div>
                                <div className='border'></div>
                                {requests && Object.keys(requests).length > 0 ? (
                                    <div>
                                        {Object.entries(requests).map(([username, value]) => {
                                            if (value === true) {
                                                return (
                                                    <div key={username} className='flex justify-between my-5'>
                                                        <div className='flex gap-3'>
                                                            <div className=''>
                                                                <img className='w-8 h-8 cursor-pointer rounded-full' src={profile_amer} alt='userImg' />
                                                            </div>
                                                            <div className='flex justify-center items-center'>
                                                                <h1>{username}</h1>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2 h-[32px]'>
                                                            <button className='bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400'>
                                                                <h1>Decline</h1>
                                                            </button>
                                                            <button className='bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700'>
                                                                <h1>Accept</h1>
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                        {!Object.values(requests).includes(true) &&
                                            <div>
                                                <VscEmptyWindow className='m-auto w-16 h-16 text-gray-300' />
                                                <p className='text-center font-semibold text-gray-400'>Empty</p>
                                            </div>
                                        }
                                    </div>
                                ) : (
                                    <div>
                                        <VscEmptyWindow className='m-auto w-16 h-16 text-gray-300' />
                                        <p className='text-center font-semibold text-gray-400'>Empty</p>
                                    </div>
                                )}
                            </div>
                        }
                        <AboutHim />
                        {advertiserProfile ? null :
                            <>
                                <SocialMedia />
                            </>
                        }
                    </div>
                </div>
            </div>

        </div>);
}

export default SiplePages