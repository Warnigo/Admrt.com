import React, { useEffect, useState } from 'react';
import 'flowbite';
import openSvg from '../../image/chevron-down (1) 2.svg'
import closed from '../../image/chevron-down (1) 1.svg'
// import targetSvg from '../../svgs/specification/target.svg'
import contentSvg from '../../svgs/specification/content.svg'
import subscribersSvg from '../../svgs/specification/subscribers.svg'
import typesSvg from '../../svgs/specification/types.svg'
import typicalSvg from '../../svgs/specification/typical.svg'
import serviseSvg from '../../svgs/specification/servise.svg'
import languageSvg from '../../svgs/specification/language.svg'
import paypalSvg from '../../svgs/payment/payment.svg'
import wiseSvg from '../../svgs/payment/wise.svg'
import zelleSvg from '../../svgs/payment/zille.svg'
import venmoSvg from '../../svgs/payment/venmo.svg'
import payoneerSvg from '../../svgs/payment/payoneer.svg'
// import star from '../../Layout/AuthPage/star.svg'
import edit_svg_blue from '../../image/edit_svg_blue.svg'
// import ModalFeedbackCard from '../../Modals/ModalFeedbackCard';
import ModalDelete from '../../Modals/ModalDelete';
import EditBackground from "../../Layout/context/editeBackground";
import EditeUser from "../../Layout/context/user";
import IntoDescription from "../../Layout/context/intoDescription";
import { auth, usersCollection } from "../../firebase/firebase";
import AboutHim from '../../Layout/context/aboutHim/aboutHim';
import SocialMedia from '../../Layout/context/socialMedia/socialMedia';
import { doc, getDoc } from 'firebase/firestore';
import view_eye from '../../image/eye 1.svg';
import view_search from '../../image/search 1.svg';
import shape from '../../svgs/about/Shape.svg';
import Loading from '../../loading/loading'
import Portfolio from '../../Layout/context/portfolio/portfolio';

function SiplePages() {
    const [userId, setUserId] = useState(null);
    const [split, setSplit] = useState(null);
    const [advertiserProfile, setAdvertiserProfile] = useState(false);
    const [requests, setRequests] = useState('')
    const [open, setOpen] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [loading, setLoading] = useState(true)
    // const [userData, setUsersData] = useState('')
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
                        const filteredRequests = Object.fromEntries(Object.entries(comeRequestCall).filter(([value]) => value === true));
                        setRequests(filteredRequests);
                        setLoading(false)
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

    // useEffect(() => {
    //     handleFetchUserData()
    // }, [userId])

    const handleOpen = () => {
        setOpen(!open);
    };

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

    if(loading) {
        return <Loading />
    }

    return (
        <div className="App">
            <div className="max-w-screen-2xl mx-auto">
                <div className="md:flex">
                    <div className="w-full order-2 md:w-2/3 ">
                        <div className={"border p-2 md:p-5 rounded-xl"}>
                            <EditBackground userId={userId} />
                            <EditeUser />
                            <IntoDescription />
                        </div>
                        {advertiserProfile ? null :
                            <div onClick={handleOpen}
                                className={`flex justify-between border mt-8 py-2 px-3 md:py-4 md:px-7 ${open ? `rounded-t-xl` : `rounded-xl`}`}>
                                <div className=''>
                                    <button><h1 className='text-base md:text-2xl font-semibold'>Specification</h1></button>
                                </div>
                                <div className='flex justify-center items-center'>
                                    {open ? <div>
                                        <img src={openSvg} alt='' />
                                    </div> : <div>
                                        <img src={closed} alt='' />
                                    </div>}
                                </div>
                            </div>
                        }

                        {open ? (<div className='border rounded-b-xl'>
                            <div className='px-2 md:px-8 mt-6'>
                                <ul className="menu gap-5">
                                    {/* <li className="menu-item flex justify-between">
                                        <div
                                            className="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                                            <img className='h-6 my-2 mr-1' src={targetSvg} alt='' />
                                            <h1>Targeted Audience:</h1>
                                        </div>
                                        <div
                                            className='text-xs md:text-sm md:font-semibold text-[#2B59FF] flex justify-center items-center  gap-4'>
                                            <h1>Age 15 - 45 (All Gender)</h1>
                                            <div className='flex justify-center items-center cursor-pointer '><img
                                                src={edit_svg_blue} alt='' /></div>
                                        </div>
                                    </li> */}
                                    <li className="menu-item flex justify-between">
                                        <div
                                            class="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                                            <img className='h-6 my-2 mr-1' src={contentSvg} alt='' />
                                            <h1>Content:</h1>
                                        </div>
                                        <div
                                            className='text-xs md:text-sm md:font-semibold text-[#2B59FF]  flex justify-center items-center gap-4'>
                                            <h1>Technology, Science, Problem solving </h1>
                                            <div className='flex justify-center items-center cursor-pointer '><img
                                                src={edit_svg_blue} alt='' /></div>
                                        </div>
                                    </li>
                                    <li className="menu-item flex justify-between">
                                        <div
                                            className="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                                            <img className='h-6 my-2 mr-1' src={subscribersSvg} alt='' />
                                            <h1>Viewers:</h1>
                                        </div>
                                        <div
                                            className='text-xs md:text-sm md:font-semibold flex items-center justify-center text-[#2B59FF]'>
                                            <h1>100M +</h1>
                                        </div>
                                    </li>
                                    <li className="menu-item flex justify-between">
                                        <div
                                            className="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                                            <img className='h-6 my-2 mr-1' src={typesSvg} alt='' />
                                            <h1>Ad Types:</h1>
                                        </div>
                                        <div
                                            className='text-xs md:text-sm md:font-semibold text-[#2B59FF] flex items-center justify-center'>
                                            <h1>Youtube, Instagram Status, Twitter Tweets, Personal Website</h1>
                                        </div>
                                    </li>
                                    <li className="menu-item flex justify-between">
                                        <div
                                            className="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                                            <img className='h-6 my-2 mr-1' src={typicalSvg} alt='' />
                                            <h1>Typical Response Time:</h1>
                                        </div>
                                        <div
                                            className='text-xs md:text-sm md:font-semibold text-[#2B59FF] flex items-center justify-center'>
                                            <h1>10 - 28 <span className='text-gray-500'>hours</span></h1>
                                        </div>
                                    </li>
                                    <li className="menu-item flex justify-between">
                                        <div
                                            class="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                                            <img className='h-6 my-2 mr-1' src={serviseSvg} alt="" />
                                            <h1>Long-Term Service Availability:</h1>
                                        </div>
                                        <div
                                            className='text-xs md:text-sm md:font-semibold text-[#2B59FF] flex justify-center items-center  gap-4'>
                                            <h1>upto 1 year(s)</h1>
                                            <div className='flex justify-center items-center cursor-pointer '><img
                                                src={edit_svg_blue} alt='' /></div>
                                        </div>
                                    </li>
                                    <li className="menu-item flex justify-between">
                                        <div
                                            class="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                                            <img className='h-6 my-2 mr-1' src={languageSvg} alt='' />
                                            <h1>Languages</h1>
                                        </div>
                                        <div
                                            className='text-xs md:text-sm md:font-semibold text-[#2B59FF] flex justify-center items-center  gap-4'>
                                            <h1>English, Spanish</h1>
                                            <div className=' cursor-pointer '><img src={edit_svg_blue} alt='' /></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>) : null}

                        <Portfolio />

                        {advertiserProfile ? null :
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
                        </div>) : null}

                        {/* <div>
                            <div className='rounded-t-xl border px-3 md:px-7 py-4 mt-6'>
                                <div className='md:flex justify-between '>
                                    <div className='flex justify-center items-center gap-4'>
                                        <h1 className='text-lg font-semibold w-28'>144 Reviews</h1>
                                        <div className='flex w-44 justify-center items-center'>
                                            <img className='w-4 h-4 mr-1' src={star} alt='' />
                                            <h1>4.9 <span className='text-gray-400'>(687 Reviews)</span></h1>
                                        </div>
                                    </div>
                                    <div className='mt-6 md:mt-0 flex gap-2'>
                                        <div class="relative mx-auto text-gray-600">
                                            <input
                                                class="border  bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                                type="search" />
                                            <button class="absolute right-0 top-0 mt-3 mr-4">
                                                <svg class="text-gray-600 h-4 w-4 fill-current"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    version="1.1" id="Capa_1" x="0px" y="0px"
                                                    viewBox="0 0 56.966 56.966" width="512px" height="512px">
                                                    <path
                                                        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <select id="countries"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected>sort by</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="FR">France</option>
                                            <option value="DE">Germany</option>
                                        </select>

                                    </div>
                                </div>
                                <div className='md:flex py-2 md:py-8 px-0'>
                                    <div className='w-full md:w-[55%]'>
                                        <div className='w-full flex justify-center items-center gap-3 mt-4'>
                                            <h1 className='w-20 text-base md:text-lg text-blue-700 md:font-bold'>5
                                                stars</h1>
                                            <div class="w-4/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div class="bg-[#F1870D] h-2.5 rounded-full"></div>
                                            </div>
                                            <span
                                                className='w-16 mt-0  text-base md:text-lg text-blue-700 font-normal'>(144)</span>
                                        </div>
                                        <div className='w-full flex justify-center items-center gap-3 mt-4'>
                                            <h1 className='w-20 text-base md:text-lg text-gray-400 md:font-bold'>4
                                                stars</h1>
                                            <div class="w-4/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div class="bg-[#F1870D] h-2.5 rounded-full "></div>
                                            </div>
                                            <span className='w-16 mt-0  text-gray-400 text-base md:text-lg '>(43)</span>
                                        </div>
                                        <div className='flex justify-center items-center gap-3 mt-4'>
                                            <h1 className='w-20 text-base md:text-lg text-gray-400 md:font-bold'>3
                                                stars</h1>
                                            <div class="w-4/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div class="bg-[#F1870D] h-2.5 rounded-full "></div>
                                            </div>
                                            <span className='w-16 mt-0  text-gray-400 text-base md:text-lg'>(21)</span>
                                        </div>
                                        <div className='flex justify-center items-center gap-3 mt-4'>
                                            <h1 className='w-20 text-base md:text-lg text-gray-400 md:font-bold'>2
                                                stars</h1>
                                            <div class="w-4/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div class="bg-[#F1870D] h-2.5 rounded-full "></div>
                                            </div>
                                            <span className='w-16 mt-0  text-gray-400 text-base md:text-lg'>(56)</span>
                                        </div>
                                        <div className='flex justify-center items-center gap-3 mt-4'>
                                            <h1 className='w-20 text-base md:text-lg text-gray-400 md:font-bold'>1
                                                stars</h1>
                                            <div class="w-4/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div class="bg-[#F1870D] h-2.5 rounded-full"></div>
                                            </div>
                                            <span className='w-16 mt-0  text-gray-400 text-base md:text-lg'>(9)</span>
                                        </div>
                                    </div>
                                    <div className='md:w-[45%] mt-10 md:mt-0 py-2 px-0 md:px-0'>
                                        <div className=''>
                                            <div className='flex justify-between'>
                                                <h1 className=' md:text-lg font-semibold'>Rating Breakdown</h1>
                                                <ModalFeedbackCard />
                                            </div>
                                            <div className=''>
                                                <div className='mt-3 flex justify-between'>
                                                    <div>
                                                        <h1 className='md:text-lg  text-gray-400'>Seller communication
                                                            Level</h1>
                                                    </div>
                                                    <div className='flex justify-center items-center gap-2'>
                                                        <div>
                                                            <img className='w-4 h-4' src={star} alt='' />
                                                        </div>
                                                        <div className=''>
                                                            <h1>4.9</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mt-3 flex justify-between'>
                                                    <div>
                                                        <h1 className='md:text-lg  text-gray-400'>Recommend to a
                                                            friend</h1>
                                                    </div>
                                                    <div className='flex justify-center items-center gap-2'>
                                                        <div>
                                                            <img className='w-4 h-4' src={star} alt='' />
                                                        </div>
                                                        <div className=''>
                                                            <h1>4.9</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mt-3 flex justify-between'>
                                                    <div>
                                                        <h1 className='md:text-lg  text-gray-400'>Service as
                                                            described</h1>
                                                    </div>
                                                    <div className='flex justify-center items-center gap-2'>
                                                        <div>
                                                            <img className='w-4 h-4' src={star} alt='' />
                                                        </div>
                                                        <div className=''>
                                                            <h1>4.9</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
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
                                {requests && Object.keys(requests).length > 0 && (
                                    <div>
                                        {Object.entries(requests).map(([username]) => (
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
                                        ))}
                                    </div>
                                )}
                            </div>
                        }

                        <AboutHim />
                        {advertiserProfile ? null :
                            <>
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
                                <SocialMedia />
                            </>
                        }
                    </div>
                </div>
            </div>

        </div>);
}

export default SiplePages