import React, { useState } from 'react';
import { Button, Dialog, TextField } from "@material-ui/core";
import 'flowbite';
import '../../App.css'
import ShowMoreText from "react-show-more-text";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { BsDot } from 'react-icons/bs';

import bg from '../../image/Image (2).svg'
import user from '../../Layout/AuthPage/Erg5tAQVgAM-TY7.png'
import svg1 from '../../image/Group 1000005904.svg'
import svg2 from '../../image/flag 1.svg'
import svg3 from '../../image/share-2 1.svg'
import svg4 from '../../image/bookmark 1.svg'
import openSvg from '../../image/chevron-down (1) 2.svg'
import closed from '../../image/chevron-down (1) 1.svg'
import targetSvg from '../../svgs/specification/target.svg'
import contentSvg from '../../svgs/specification/content.svg'
import subscribersSvg from '../../svgs/specification/subscribers.svg'
import typesSvg from '../../svgs/specification/types.svg'
import satisfactionSvg from '../../svgs/specification/satisfaction.svg'
import providedSvg from '../../svgs/specification/provided.svg'
import typicalSvg from '../../svgs/specification/typical.svg'
import serviseSvg from '../../svgs/specification/servise.svg'
import languageSvg from '../../svgs/specification/language.svg'
import paypalSvg from '../../svgs/payment/payment.svg'
import wiseSvg from '../../svgs/payment/wise.svg'
import zelleSvg from '../../svgs/payment/zille.svg'
import venmoSvg from '../../svgs/payment/venmo.svg'
import payoneerSvg from '../../svgs/payment/payoneer.svg'
import star from '../../Layout/AuthPage/star.svg'
import profile_Aus from '../../svgs/reviews/Profile-aus.svg'
import profile_amer from '../../svgs/reviews/Profile-amer.svg'
import profile_china from '../../svgs/reviews/Profile-china.svg'
import flag_Aus from '../../svgs/reviews/Rectangle 6596.svg'
import reviews_img from '../../svgs/reviews/Rectangle 6596 (1).svg'
import reviews_img2 from '../../svgs/reviews/Rectangle 6596 (2).svg'
import reviews_img3 from '../../svgs/reviews/Rectangle 6596 (3).svg'
import reviews_img4 from '../../svgs/reviews/Rectangle 6596 (4).svg'
import edit_svg from '../../image/edit-3 (1) 1.svg'
import edit_svg_blue from '../../image/edit_svg_blue.svg'
import delete_svg from '../../image/Delete.svg'
import ModalDelete from '../../Modals/ModalDelete';
import ModalSidebar from '../../Modals/ModalSidebar';
import menu from '../../svgs/menu.svg'
import ModalFeedbackCard from '../../Modals/ModalFeedbackCard';



function SiplePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([{}]);
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  // Common state for dialog input
  const [dialogInput, setDialogInput] = useState("");

  // Item which is edited
  const [dialogEditItem, setDialogEditItem] = useState();

  const addNew = (newItem) => {
    if (!!dialogEditItem) {
      setDialogInput("");
      setIsDialogOpened(false);
      setDialogEditItem(null);

      const newItems = [...items];
      const index = newItems.findIndex((item) => item.id === newItem.id);
      newItems.splice(index, 1, newItem);

      setItems(newItems);
    } else {
      setDialogInput("");
      setIsDialogOpened(false);
      setItems(items.concat(newItem));
    }
  };

  const [fruits, setFruits] = useState([]);

  const handleDelete = (id) => {
    const fruitsCopy = [...fruits];
    const fruitsCopyUpdated = fruitsCopy.filter((fruit) => fruit.id !== id);
    setFruits(fruitsCopyUpdated);
  };

  const [open, setOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOpenPayment = () => {
    setOpenPayment(!openPayment);
  };

  const [isNavOpen, setIsNavOpen] = useState(false);

  return (

    <div className="App">


      <div class="max-w-screen-2xl mx-auto">
        <div class="lg:flex">



          {showModal ? (
            <>

              <div
                className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-[80%] lg:w-2/5 md:w-1/2 mx-auto">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}

                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="md:text-3xl font-semibold">
                        Overview
                      </h3>

                    </div>
                    {/*body*/}
                    <div className="relative p-2 md:p-6  flex-auto flex justify-center items-start">
                      <div>
                        <h1 className='text-sm md:text-base'>
                          Use this space to show clients you have the skills and experience they're looking for.<br></br>

                          <ul className='my-3 text-sm'>
                            <li class="flex  md:text-base"><BsDot className='mt-1' /> Describe your strengths and skills</li>
                            <li class="flex  md:text-base"><BsDot className='mt-1' /> Highlight projects, accomplishments and education</li>
                            <li class="flex md:text-base"><BsDot className='mt-1' /> Keep it short and make sure it's error-free</li>
                          </ul>

                        </h1>
                        <div className='break-words overflow-hidden h-48 w-full' open={isDialogOpened} onClose={() => setIsDialogOpened(false)}>
                          <form class="h-36">
                            <textarea
                              value={dialogInput}
                              onChange={(e) => setDialogInput(e.target.value)}
                              class="h-36 overfull border-2 focus:outline-none border-blue-600 focus w-full peer rounded-lg resize-none px-3 py-2.5 font-sans text-sm font-normal"
                              placeholder="Example: I have a Bachelor of Arts (B.A.) in Graphic design from The Higher Education Technical School of Professional Studies in Novi Sad and I am a web and mobile designer with 10+ years of experience.

          My range of design services include creating design for new apps (or a new design to improve existing ones), building UI design for mobile, tablet or desktop, making UX designs, wireframes and layout concepts and redesigning websites or adapting to mobile and responsive design. I have worked with many clients such as Replay, O'Neill, Bench, OshKosh & Carters, etc. I'm working professionally with Sketch and Adobe tools.
          
          I will will work with you to discover what you need and create the best solution. My priorities are quality and respect of deadlines and budget. I love to share my enthusiasm and passion for design, so feel free to contact me and let's get the conversation started.">

                            </textarea>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-2 md:p-6 border-t border-solid gap-4 border-blue Gray-200 rounded-b">
                      <button
                        className="text-blue-700 background-transparent font-bold uppercase md:px-6 md:py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        <h1 className='text-xs md:text-sm'>
                          Cansel
                        </h1>
                      </button>
                      <button
                        className="bg-blue-700 text-white active:bg-emerald-600 font-bold uppercase text-xs md:text-sm p-2 md:px-6 md:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setShowModal(false)
                          console.log(dialogEditItem);
                          // If item to edit exists we need to return an item with the same id
                          if (!!dialogEditItem) {
                            addNew({
                              id: dialogEditItem.id,
                              email: dialogInput
                            });
                          } else {
                            // or return an item with uniq id
                            addNew({
                              id: 5,
                              email: dialogInput
                            });
                          }
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}



          <div class="w-full order-2 lg:w-2/3 ">
            <div class='border p-2 md:p-5 rounded-xl'>
              <div class="bg relative w-full">
                <img className='img-fluid' src={bg} />
                <div className='flex justify-between'>
                  <div className='flex button1 absolute top-[20%] left-[20%] md:left-[15%] gap-2'>
                    <img className='' src={edit_svg} />
                    <button className='text-xs md:text-sm font-semibold text-white edite_bg'><h1>Edit Background</h1></button>
                  </div>
                </div>
              </div>

              <div class="">
                <div className='flex justify-between h-24'>
                <div class="rounded-full  img border-[3px] border-white inline-block ml-6">
                  <img class="w-24 h-24  rounded-full" src={user} />
                  <br />
                  </div>
                  <div className='p-2'>
                    <ModalSidebar/>
                  </div>
                </div>
               
                <div>
                 
                </div>

                <div>
                  <div className='flex justify-between '>
                    <div class="flex justify-center w-2/3 items-center">
                      <div className=''>
                        <h1 className='font-medium text-lg md:text-2xl'>Ahmad Nur Fawaid</h1>
                        <div class="flex">
                          <h1 className='text-sm w-full font-medium text-blue-800'><span className='text-sm text-gray-500'>Experitise: </span>Magician, Youtuber, Vlogs</h1>
                          <div className='flex justify-center items-center cursor-pointer ml-2'>
                            <img src={edit_svg_blue} /></div>
                        </div>
                      </div>
                    </div>

                    <div class="w-1/3">
                      <div className='grid grid-cols-4 gap-1 '>
                        <div>
                          <img class="h-5 w-6 " src={svg1} />
                        </div>
                        <div>
                          <img class="h-5 w-6 " src={svg2} />
                        </div>
                        <div>
                          <img class="h-5 w-6 " src={svg3} />
                        </div>
                        <div>
                          <img class="h-5 w-6 " src={svg4} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className='flex justify-between'>

                  <h1 className='text-2xl font-semibold'>Intro Description</h1>

                  <div className='flex justify-center items-center cursor-pointer mx-5'>
                    {items.map((item) => (
                      <div key={item.id} className="item">
                        <Button
                          onClick={() => {
                            setDialogEditItem(item);
                            setDialogInput(item.email);
                            setIsDialogOpened(true);
                            setShowModal(true)
                          }}
                        >
                          <img src={edit_svg_blue} />
                        </Button>
                       
                       
                      </div>

                    ))}


                  </div>
                </div>
                <div className='border my-5'></div>

                {items.map((item) => (
                  <div className="items overflow-hidden w-full break-words">

                    <h1>
                      <ShowMoreText
                        lines={3}
                        more="more"
                        less="less"
                        className="content-css"
                      >
                        {item.email}
                      </ShowMoreText>
                    </h1>

                  </div>
                ))}
              </div>
            </div>


            <div onClick={handleOpen} className='flex justify-between border mt-8 py-2 px-3 md:py-4 md:px-7 rounded-t-xl'>
              <div className=''>
                <button><h1 className='text-base md:text-2xl font-semibold'>Specification</h1></button>
              </div>
              <div className='flex justify-center items-center'>
                {open ? <div>
                  <img src={openSvg} />
                </div> : <div>
                  <img src={closed} />
                </div>}
              </div>
            </div>

            {open ? (
              <div className='border'>
                <div className='px-2 md:px-8 mt-6'>
                <ul className="menu gap-5">
              <li className="menu-item flex justify-between">
                 <div class="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                  <img className='h-6 my-2 mr-1' src={targetSvg} />
                  <h1>Targeted Audience:</h1>
                 </div>
                 <div className='text-xs md:text-sm md:font-semibold text-[#2B59FF] flex justify-center items-center  gap-4'>
                    <h1>Age 15 - 45 (All Gender)</h1>
                    <div className='flex justify-center items-center cursor-pointer '><img src={edit_svg_blue} /></div>
                 </div>
              </li>
              <li className="menu-item flex justify-between">
                 <div class="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                  <img  className='h-6 my-2 mr-1'src={contentSvg} />
                  <h1>Content:</h1>
                 </div>
                 <div className='text-xs md:text-sm md:font-semibold text-[#2B59FF]  flex justify-center items-center gap-4'>
                   <h1>Technology, Science, Problem solving </h1>
                   <div className='flex justify-center items-center cursor-pointer '><img  src={edit_svg_blue} /></div>
                 </div>
              </li>
              <li className="menu-item flex justify-between">
                 <div class="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                  <img className='h-6 my-2 mr-1' src={subscribersSvg} />
                  <h1>Viewers:</h1>
                 </div>
                 <div className='text-xs md:text-sm md:font-semibold flex items-center justify-center text-[#2B59FF]'>
                   <h1>100M +</h1>
                 </div>
              </li>
              <li className="menu-item flex justify-between">
                 <div class="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                  <img className='h-6 my-2 mr-1' src={typesSvg} />
                  <h1>Ad Types:</h1>
                 </div>
                 <div className='text-xs md:text-sm md:font-semibold text-[#2B59FF] flex items-center justify-center'>
                   <h1>Youtube, Instagram Status, Twitter Tweets, Personal Website</h1>
                 </div>
              </li>
              <li className="menu-item flex justify-between">
                 <div class="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                  <img  className='h-6 my-2 mr-1'src={typicalSvg} />
                  <h1>Typical Response Time:</h1>
                 </div>
                 <div className='text-xs md:text-sm md:font-semibold text-[#2B59FF] flex items-center justify-center'>
                   <h1>10 - 28 <span className='text-gray-500'>hours</span></h1>
                 </div>
              </li>
              <li className="menu-item flex justify-between">
                 <div class="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                  <img  className='h-6 my-2 mr-1'src={serviseSvg} />
                  <h1>Long-Term Service Availability:</h1>
                 </div>
                 <div className='text-xs md:text-sm md:font-semibold text-[#2B59FF] flex justify-center items-center  gap-4'>
                   <h1>upto 1 year(s)</h1>
                   <div className='flex justify-center items-center cursor-pointer '><img src={edit_svg_blue} /></div>
                 </div>
              </li>
              <li className="menu-item flex justify-between">
                 <div class="flex justify-center items-center text-xs md:text-sm md:font-semibold text-gray-400">
                  <img className='h-6 my-2 mr-1' src={languageSvg} />
                  <h1>Languages</h1>
                 </div>
                 <div className='text-xs md:text-sm md:font-semibold text-[#2B59FF] flex justify-center items-center  gap-4'>
                   <h1>English, Spanish</h1>
                   <div className=' cursor-pointer '><img src={edit_svg_blue} /></div>
                 </div>
              </li>
            </ul>
                </div>
              </div>
            ) : null}


            <div className='md:flex justify-between border mt-8 py-2 px-3 md:py-4 md:px-7 rounded-t-xl'>
              <div className=''>
                <button><h1 className='md:text-2xl font-semibold'>Payment Methods</h1></button>
              </div>

              <div className='flex justify-between mt-3 md:mt-0 md:justify-center gap-5'>
                <div>
                  <button data-modal-target="staticModal" data-modal-toggle="staticModal" class="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 py-1 px-2 rounded-lg text-xs md:text-sm text-center" type="button">

                    + Add New Payment Method
                  </button>
                </div>
                <div onClick={handleOpenPayment} className='flex items-center justify-between'>

                  {openPayment ? <div>
                    <img src={openSvg} />
                  </div> :
                    <div>
                      <img src={closed} />
                    </div>}
                </div>
              </div>
            </div>

            {openPayment ? (
              <div className='border'>
                <div className='py-2 px-3 md:py-4 md:px-7'>
                  <div className="App">

                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className='border rounded-xl px-3 py-2 flex items-center justify-center gap-2 cursor-pointer'>
                      <img src={paypalSvg} />
                      <div className=''>
                        <img src={delete_svg} />
                      </div>
                    </div>
                    <div className='border rounded-xl px-3 py-2 flex items-center justify-center  gap-2 cursor-pointer'>
                      <img src={wiseSvg} />
                      <div className=''>
                        <img src={delete_svg} />
                      </div>
                    </div>
                    <div className='border rounded-xl px-3 py-2 flex items-center justify-center  gap-2 cursor-pointer'>
                      <img src={zelleSvg} />
                      <div className=''>
                        <img src={delete_svg} />
                      </div>
                    </div>
                    <div className='border rounded-xl px-3 py-2 flex items-center justify-center  gap-2 cursor-pointer'>
                      <img src={venmoSvg} />
                      <div className=''>
                        <img src={delete_svg} />
                      </div>
                    </div>
                    <div className='border rounded-xl px-3 py-2 flex items-center justify-center  gap-2 cursor-pointer'>
                      <img src={payoneerSvg} />
                      <div className=''>
                        <img src={delete_svg} />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            ) : null}

            <div>
              <div className='rounded-t-xl border px-3 md:px-7 py-4 mt-6'>
                <div className='md:flex justify-between '>
                  <div className='flex justify-center items-center'>
                    <h1 className='text-lg md:text-xl font-semibold'>144 Reviews</h1>
                    <div className='flex w-44 ml-6 justify-center items-center'>
                      <img className='w-4 h-4 mr-1' src={star} />
                      <h1>4.9 <span className='text-gray-400'>(687 Reviews)</span></h1>
                    </div>
                  </div>
                  <div className='mt-6 md:mt-0 flex gap-2'>
                    <div class="relative mx-auto text-gray-600">
                      <input class="border  bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" type="search" />
                      <button class="absolute right-0 top-0 mt-3 mr-4">
                        <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                          version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" width="512px" height="512px">
                          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                      </button>
                    </div>
                    <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
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
                       <h1 className='w-20 text-base md:text-lg text-blue-700 md:font-bold'>5 stars</h1>
                        <div class="w-4/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                         <div class="bg-[#F1870D] h-2.5 rounded-full"></div>
                       </div>
                       <span className='w-16 mt-0  text-base md:text-lg text-blue-700 font-normal'>(144)</span>
                    </div>
                    <div className='w-full flex justify-center items-center gap-3 mt-4'>
                       <h1 className='w-20 text-base md:text-lg text-gray-400 md:font-bold'>4 stars</h1>
                        <div class="w-4/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                         <div class="bg-[#F1870D] h-2.5 rounded-full "></div>
                       </div>
                       <span className='w-16 mt-0  text-gray-400 text-base md:text-lg '>(43)</span>
                    </div>
                    <div className='flex justify-center items-center gap-3 mt-4'>
                       <h1 className='w-20 text-base md:text-lg text-gray-400 md:font-bold'>3 stars</h1>
                        <div class="w-4/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                         <div class="bg-[#F1870D] h-2.5 rounded-full "></div>
                       </div>
                       <span className='w-16 mt-0  text-gray-400 text-base md:text-lg'>(21)</span>
                    </div>
                    <div className='flex justify-center items-center gap-3 mt-4'>
                       <h1 className='w-20 text-base md:text-lg text-gray-400 md:font-bold'>2 stars</h1>
                        <div class="w-4/5 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                         <div class="bg-[#F1870D] h-2.5 rounded-full "></div>
                       </div>
                       <span className='w-16 mt-0  text-gray-400 text-base md:text-lg'>(56)</span>
                    </div>
                    <div className='flex justify-center items-center gap-3 mt-4'>
                       <h1 className='w-20 text-base md:text-lg text-gray-400 md:font-bold'>1 stars</h1>
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
                    <ModalFeedbackCard/>
                    </div>
                    <div className=''>
                      <div className='mt-3 flex justify-between'>
                       <div>
                        <h1 className='md:text-lg  text-gray-400'>Seller communication Level</h1>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                          <div>
                            <img className='w-4 h-4' src={star}/>
                          </div>
                        <div className=''>
                          <h1>4.9</h1>
                        </div>
                        </div>
                        </div>
                        <div className='mt-3 flex justify-between'>
                       <div>
                        <h1 className='md:text-lg  text-gray-400'>Recommend to a friend</h1>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                          <div>
                            <img className='w-4 h-4' src={star}/>
                          </div>
                        <div className=''>
                          <h1>4.9</h1>
                        </div>
                        </div>
                        </div>
                        <div className='mt-3 flex justify-between'>
                       <div>
                        <h1 className='md:text-lg  text-gray-400'>Service as described</h1>
                        </div>
                        <div className='flex justify-center items-center gap-2'>
                          <div>
                            <img className='w-4 h-4' src={star}/>
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
                <div>
                  <div>
                    <div className='flex'>
                      <div className='w-32'>
                        <div className='text-center'>
                          <img className='h-24 w-24 text-center' src={profile_Aus} />
                        </div>
                      </div>
                      <div className='w-5/6'>
                        <div className='flex justify-between'>
                          <div>
                            <h1 className='md:text-xl font-semibold'>Alfredo Lipshutz</h1>
                            <div className='flex gap-2 mt-1'>
                              <div className='flex  justify-center items-center'>
                                <img src={flag_Aus} />
                              </div>
                              <div>
                                Australia
                              </div>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className='mt-1'>
                              <img src={reviews_img} />
                            </div>
                            <div>
                              <h1>10 reviews</h1>
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-4'>
                          <div className='flex justify-center items-center gap-2'>
                            <div className='flex'>
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                            </div>
                            <div>
                              <h1 className='font-semibold text-[#F1870D]'>5.0</h1>
                            </div>
                          </div>
                          <div className='border-r border-gray-400'></div>
                          <div>
                            <h1 className='text-sm  text-gray-400'>4 hour ago.</h1>
                          </div>
                        </div>
                        <div>
                          <h1 className='text-sm md:text-lg font-light'>Learning these design skills was fascinating for an accountant and very easy to follow. I have learnt a lot and will be designing on a regular basis going forward.</h1>
                        </div>
                      </div>
                    </div>
                    <div className='flex mt-10'>
                      <div className='w-32'>
                        <div className='text-center'>
                          <img className='h-24 w-24 text-center' src={profile_amer} />
                        </div>
                      </div>
                      <div className='w-5/6'>
                        <div className='flex justify-between'>
                          <div>
                            <h1 className='md:text-xl font-semibold'>Roger Saris</h1>
                            <div className='flex gap-2 mt-1'>
                              <div className='flex  justify-center items-center'>
                                <img src={reviews_img2} />
                              </div>
                              <div>
                                Amerika
                              </div>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className='mt-1'>
                              <img src={reviews_img} />
                            </div>
                            <div>
                              <h1>10 reviews</h1>
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-4'>
                          <div className='flex justify-center items-center gap-2'>
                            <div className='flex'>
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                            </div>
                            <div>
                              <h1 className='font-semibold text-[#F1870D]'>5.0</h1>
                            </div>
                          </div>
                          <div className='border-r border-gray-400'></div>
                          <div>
                            <h1 className='text-sm  text-gray-400'>1 hour ago.</h1>
                          </div>
                        </div>
                        <div>
                          <h1 className='text-sm md:text-lg font-light'>Learning these design skills was fascinating for an accountant and very easy to follow. I have learnt a lot and will be designing on a regular basis going forward.</h1>
                        </div>
                      </div>
                    </div>
                    <div className='flex mt-10'>
                      <div className='w-32'>
                        <div className='text-center'>
                          <img className='h-24 w-24 text-center' src={profile_china} />
                        </div>
                      </div>
                      <div className='w-5/6'>
                        <div className='flex justify-between'>
                          <div>
                            <h1 className='md:text-xl font-semibold'>Cristofer Rhiel Madsen</h1>
                            <div className='flex gap-2 mt-1'>
                              <div className='flex  justify-center items-center'>
                                <img src={reviews_img4} />
                              </div>
                              <div>
                                China
                              </div>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className='mt-1'>
                              <img src={reviews_img} />
                            </div>
                            <div>
                              <h1>10 reviews</h1>
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-4'>
                          <div className='flex justify-center items-center gap-2'>
                            <div className='flex'>
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                            </div>
                            <div>
                              <h1 className='font-semibold text-[#F1870D]'>5.0</h1>
                            </div>
                          </div>
                          <div className='border-r border-gray-400'></div>
                          <div>
                            <h1 className='text-sm  text-gray-400'>3 hour ago.</h1>
                          </div>
                        </div>
                        <div>
                          <h1 className='text-sm md:text-lg font-light'>Learning these design skills was fascinating for an accountant and very easy to follow. I have learnt a lot and will be designing on a regular basis going forward.</h1>
                        </div>
                      </div>
                    </div>
                    <div className='flex mt-10'>
                      <div className='w-32'>
                        <div className='text-center'>
                          <img className='h-24 w-24 text-center' src={profile_Aus} />
                        </div>
                      </div>
                      <div className='w-5/6'>
                        <div className='flex justify-between'>
                          <div>
                            <h1 className='md:text-xl font-semibold'>Roger Geidt</h1>
                            <div className='flex gap-2 mt-1'>
                              <div className='flex  justify-center items-center'>
                                <img src={reviews_img3} />
                              </div>
                              <div>
                                Saudi Arabia
                              </div>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className='mt-1'>
                              <img src={reviews_img} />
                            </div>
                            <div>
                              <h1>10 reviews</h1>
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-4'>
                          <div className='flex justify-center items-center gap-2'>
                            <div className='flex'>
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                              <img className='w-4 h-4' src={star} />
                            </div>
                            <div>
                              <h1 className='font-semibold text-[#F1870D]'>5.0</h1>
                            </div>
                          </div>
                          <div className='border-r border-gray-400'></div>
                          <div>
                            <h1 className='text-sm  text-gray-400'>2 hour ago.</h1>
                          </div>
                        </div>
                        <div>
                          <h1 className='text-sm md:text-lg font-light'>Learning these design skills was fascinating for an accountant and very easy to follow. I have learnt a lot and will be designing on a regular basis going forward.</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className='flex justify-center items-center'>
                <Stack spacing={2}>
                  <Pagination count={10} />
                </Stack>
              </div>
            </div>
          </div>
          {/* <div class="w-full py-5 px-10 order-1 md:order-2 md:w-1/3">
       <div className='flex justify-between my-3'>
              <div>
                <h1 className='font-semibold'>New Connections</h1>
                </div>
              <div>
                 <img src={shape} />
              </div>
            </div>
            
            <div className='border'></div>
            <div className='my-3'>
              <h1>These are the connection which you have got from other users.</h1>
            </div>
            <div className='border'></div>
            <div className='flex justify-between my-5'>
                <div className='flex gap-3'>
                  <div className=''>
                    <img className='w-8 h-8 cursor-pointer' src={profile_amer} alt='userImg'/>
                  </div>
                  <div className='flex justify-center items-center'>
                    <h1>Jaydon Lubin</h1>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button className='bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400'><h1>Decline</h1></button>
                  <button className='bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700'><h1>Accept</h1></button>
                </div>
            </div>
            <div className='flex justify-between my-5'>
                <div className='flex gap-3'>
                  <div className=''>
                    <img className='w-8 h-8 cursor-pointer' src={profile_Aus} alt='userImg'/>
                  </div>
                  <div className='flex justify-center items-center'>
                    <h1>Zain Lipshutz</h1>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button className='bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400'><h1>Decline</h1></button>
                  <button className='bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700'><h1>Accept</h1></button>
                </div>
            </div>
            <div className='flex justify-between my-5'>
                <div className='flex gap-3'>
                  <div className=''>
                    <img className='w-8 h-8 cursor-pointer' src={profile_china} alt='userImg'/>
                  </div>
                  <div className='flex justify-center items-center'>
                    <h1>Emerson Stanton</h1>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button className='bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400'><h1>Decline</h1></button>
                  <button className='bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700'><h1>Accept</h1></button>
                </div>
            </div>
            <div className='flex justify-between my-5'>
                <div className='flex gap-3'>
                  <div className=''>
                    <img className='w-8 h-8 cursor-pointer' src={profile_amer} alt='userImg'/>
                  </div>
                  <div className='flex justify-center items-center'>
                    <h1>Cooper Korsgaard</h1>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button className='bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400'><h1>Decline</h1></button>
                  <button className='bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700'><h1>Accept</h1></button>
                </div>
            </div>
            <div className='flex justify-between my-5'>
                <div className='flex gap-3'>
                  <div className=''>
                    <img className='w-8 h-8 cursor-pointer' src={profile_Aus} alt='userImg'/>
                  </div>
                  <div className='flex justify-center items-center'>
                    <h1>Emerson Franci</h1>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button className='bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400'><h1>Decline</h1></button>
                  <button className='bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700'><h1>Accept</h1></button>
                </div>
            </div>
            <div className='flex justify-between my-5'>
                <div className='flex gap-3'>
                  <div className=''>
                    <img className='w-8 h-8 cursor-pointer' src={profile_china} alt='userImg'/>
                  </div>
                  <div className='flex justify-center items-center'>
                    <h1>Lincoln Rosser</h1>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button className='bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400'><h1>Decline</h1></button>
                  <button className='bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700'><h1>Accept</h1></button>
                </div>
            </div>
            <div className='flex justify-between my-5'>
                <div className='flex gap-3'>
                  <div className=''>
                    <img className='w-8 h-8 cursor-pointer' src={profile_amer} alt='userImg'/>
                  </div>
                  <div className='flex justify-center items-center'>
                    <h1>Ruben Torff</h1>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button className='bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400'><h1>Decline</h1></button>
                  <button className='bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700'><h1>Accept</h1></button>
                </div>
            </div>
                     <div className='flex justify-between my-5'>
                <div className='flex gap-3'>
                  <div className=''>
                    <img className='w-8 h-8 cursor-pointer' src={profile_Aus} alt='userImg'/>
                  </div>
                  <div className='flex justify-center items-center'>
                    <h1>Jaydon Stanton</h1>
                  </div>
                </div>
                <div className='flex gap-2'>
                  <button className='bg-gray-300 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-400'><h1>Decline</h1></button>
                  <button className='bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700'><h1>Accept</h1></button>
                </div>
            </div>
        
         
          <div className='mt-20'>
            <div className='flex justify-between my-3'>
              <div>
                <h1 className='font-semibold'>About Him</h1>
                </div>
              <div>
                 <img src={shape} />
              </div>
            </div>
            <div className='border'></div>
            <div className='my-3'>
              <h1>Some other Information to make it Trusted these information's are verified.</h1>
            </div>
            <div className='border'></div>
          </div>
          <div>
            <div className='flex justify-between my-4'>
              <div className='flex gap-5 '>
              <div className=''>
                <img src={shape1} />
              </div>
              <div>
                <h1>New York, United Kingdom</h1>
              </div>
              </div>
              <div className='flex justify-center items-center cursor-pointer'>
                <img src={edit_svg_blue} />
              </div>
            </div>
            <div className='flex justify-between my-4'>
              <div className='flex gap-5 '>
              <div className=''>
                <img src={shape2} />
              </div>
              <div>
                <h1>designershub.io</h1>
              </div>
              </div>
              <div className='flex justify-center items-center cursor-pointer'>
                <img src={edit_svg_blue} />
              </div>
            </div>
            <div className='flex justify-between my-4'>
              <div className='flex gap-5'>
              <div className=''>
                <img src={shape3} />
              </div>
              <div>
                <h1>Joined June 2012</h1>
              </div>
              </div>
              <div className='flex justify-center items-center cursor-pointer'>
                <img src={edit_svg_blue} />
              </div>
            </div>
            <div className='flex justify-between my-4'>
              <div className='flex gap-5'>
              <div className=''>
                <img src={shape4} />
              </div>
              <div>
                <h1>Working at Youtube (Full time)</h1>
              </div>
              </div>
              <div className='flex justify-center items-center cursor-pointer'>
                <img src={edit_svg_blue} />
              </div>
            </div>
            <div className='flex justify-between my-4'>
              <div className='flex gap-5'>
              <div className=''>
                <img src={shape5} />
              </div>
              <div>
                <h1>Have Channel with Nova Bee</h1>
              </div>
              </div>
              <div className='flex justify-center items-center cursor-pointer'>
                <img src={edit_svg_blue} />
              </div>
            </div>
          </div>
          <div className='flex justify-between my-3 mt-20'>
              <div>
                <h1 className='font-semibold'>Analytics</h1>
                </div>
              <div>
                 <img src={shape} />
              </div>
            </div>
            <div className='border'></div>

            <div className='flex justify-between my-4'>
              <div className='flex gap-5'>
                <img src={view_eye} />
                <h1>Viewed Hosting Space</h1>
              </div>
              <div>4,521</div>
            </div>
            <div className='flex justify-between my-4'>
              <div className='flex gap-5'>
                <img src={view_search} />
                <h1>Search appearances</h1>
              </div>
              <div>761</div>
            </div>
           

          <div className='flex justify-between my-3 mt-20'>
              <div>
                <h1 className='font-semibold'>Social Media</h1>
                </div>
              <div className='flex gap-5'>
                 <button className='bg-blue-700 text-white px-2 py-1 rounded-lg text-sm'><h1>+ Add New </h1></button>
                 <img src={shape} />
              </div>
            </div>
            <div className='border'></div>
            <div className='my-3'>
              <h1>Please select or copy like to get in touch with him. Add them as friend on social media</h1>
            </div>
            <div className='border'></div>
            <div>
              <div className="flex gap-4 my-4">
                <div class="w-1/6">
                  <img src={svg_facebook} />
                </div>
                <div class="w-5/6 flex justify-between">
                <div className="">
                  <h1>Facebook Id here</h1>
                </div>
                <div className="flex gap-5">
                  <img src={copy} />
                  <img className="h-6 w-6 cursor-pointer" src={delete_svg} />
                </div>
                </div>
              </div>
              <div className="flex gap-4 my-4">
                <div class="w-1/6">
                  <img src={svg_instagram} />
                </div>
                <div className="w-5/6 flex justify-between">
                <div className="">
                  <h1>Instagram ID here</h1>
                </div>
                <div className="flex gap-5">
                  <img src={copy} />
                  <img className="h-6 w-6 cursor-pointer" src={delete_svg} />
                </div>
                </div>
              </div>
                  <div className="flex gap-4 my-4">
                <div class="w-1/6">
                  <img src={svg_twitter} />
                </div>
                <div className='w-5/6 flex justify-between'>
                <div className="">
                  <h1>Twitter ID here</h1>
                </div>
                <div className="flex gap-5">
                  <img src={copy} />
                  <img className="h-6 w-6 cursor-pointer" src={delete_svg} />
                </div>
              </div>
              </div>
              <div className="flex gap-4 my-4">
                <div class="w-1/6">
                  <img src={svg_youtube} />
                </div>
                <div className='w-5/6 flex justify-between'>
                <div className="">
                  <h1>Youtube Link here</h1>
                </div>
                <div className="flex gap-5">
                  <img src={copy} />
                  <img className="h-6 w-6 cursor-pointer" src={delete_svg} />
                </div>
                </div>
              </div>
              <div className="flex gap-4 my-4">
                <div class="w-1/6">
                  <img src={svg_linkedin} />
                </div>
                <div className='w-5/6 flex justify-between'>
                <div className="">
                  <h1>Linkedin Id here</h1>
                </div>
                <div className="flex gap-5">
                  <img src={copy} />
                  <img className="h-6 w-6 cursor-pointer" src={delete_svg} />
                </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between my-3 mt-20'>
              <div>
                <h1 className='font-semibold'>About Him</h1>
                </div>
              <div className="flex gap-5">
              <button className='bg-blue-700 text-white px-2 py-1 rounded-lg text-sm'><h1>+ Add New </h1></button>
                 <img src={shape} />
              </div>
            </div>
            <div className='border my-4'></div>
            <div className='flex justify-between'>
              <div>
                <img src={icon_youtube} />
              </div>
              <div className=' my-2 rounded-lg '>
              <img className="h-6 w-6 cursor-pointer" src={delete_svg} />
                <button className='hidden py-1 px-2 text-white text-sm'><h1>Get started</h1></button>
              </div>
            </div>
            <div className='flex justify-between'>
              <div>
                <img src={icon_facebook} />
              </div>
              <div className=' my-2 rounded-lg '>
              <img className="h-6 w-6 cursor-pointer" src={delete_svg} />
                <button className='hidden py-1 px-2 text-white text-sm'><h1>Get started</h1></button>
              </div>
            </div>
            <div className='flex justify-between'>
              <div>
                <img src={icon_instagram} />
              </div>
              <div className=' my-2 rounded-lg '>
              <img className="h-6 w-6 cursor-pointer" src={delete_svg} />
                <button className='hidden py-1 px-2 text-white text-sm'><h1>Get started</h1></button>
              </div>
            </div>
       </div> */}
        </div>
      </div>

    </div>
  );
}

export default SiplePage;