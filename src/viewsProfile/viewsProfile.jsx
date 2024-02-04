import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import star from '../Layout/AuthPage/star.svg';
import profile_Aus from '../svgs/reviews/Profile-aus.svg';
import profile_amer from '../svgs/reviews/Profile-amer.svg';
import profile_china from '../svgs/reviews/Profile-china.svg';
import flag_Aus from '../svgs/reviews/Rectangle 6596.svg';
import reviews_img from '../svgs/reviews/Rectangle 6596 (1).svg';
import reviews_img2 from '../svgs/reviews/Rectangle 6596 (2).svg';
import reviews_img3 from '../svgs/reviews/Rectangle 6596 (3).svg';
import reviews_img4 from '../svgs/reviews/Rectangle 6596 (4).svg';
import EditBackground from "./others/editeBg";
import EditeUser from "./others/user";
import IntoDescription from "./others/description";
import AboutHim from './others/abouthim';
import SocialMedia from './others/socialMedia';

function ViewsProfile() {
  return (
    <div className="App">
      <div className="max-w-screen-2xl mx-auto">
        <div className="md:flex">
          <div className="w-full order-2 md:w-2/3">
            <div className={"border p-2 md:p-5 rounded-xl"}>
              <EditBackground />
              <EditeUser />
              <IntoDescription />
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
                <div>
                  <div>
                    <div className='flex'>
                      <div className='w-32'>
                        <div className='text-center'>
                          <img className='h-24 w-24 text-center' src={profile_Aus} alt='' />
                        </div>
                      </div>
                      <div className='w-5/6'>
                        <div className='flex justify-between'>
                          <div>
                            <h1 className='md:text-xl font-semibold'>Alfredo Lipshutz</h1>
                            <div className='flex gap-2 mt-1'>
                              <div className='flex  justify-center items-center'>
                                <img src={flag_Aus} alt='' />
                              </div>
                              <div>
                                Australia
                              </div>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className='mt-1'>
                              <img src={reviews_img} alt='' />
                            </div>
                            <div>
                              <h1>10 reviews</h1>
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-4'>
                          <div className='flex justify-center items-center gap-2'>
                            <div className='flex'>
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                            </div>
                            <div>
                              <h1 className='font-semibold text-[#F1870D]'>5.0</h1>
                            </div>
                          </div>
                          <div className='border-r border-gray-400'></div>
                          <div>
                            <h1 className='text-gray-400'>4 hour ago.</h1>
                          </div>
                        </div>
                        <div>
                          <h1 className='text-sm md:text-lg font-light'>Learning these design
                            skills was fascinating for an accountant and very easy to
                            follow. I have learnt a lot and will be designing on a regular
                            basis going forward.</h1>
                        </div>
                      </div>
                    </div>
                    <div className='flex mt-10'>
                      <div className='w-32'>
                        <div className='text-center'>
                          <img className='h-24 w-24 text-center' src={profile_amer} alt='' />
                        </div>
                      </div>
                      <div className='w-5/6'>
                        <div className='flex justify-between'>
                          <div>
                            <h1 className='md:text-xl font-semibold'>Roger Saris</h1>
                            <div className='flex gap-2 mt-1'>
                              <div className='flex  justify-center items-center'>
                                <img src={reviews_img2} alt='' />
                              </div>
                              <div>
                                Amerika
                              </div>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className='mt-1'>
                              <img src={reviews_img} alt='' />
                            </div>
                            <div>
                              <h1>10 reviews</h1>
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-4'>
                          <div className='flex justify-center items-center gap-2'>
                            <div className='flex'>
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                            </div>
                            <div>
                              <h1 className='font-semibold text-[#F1870D]'>5.0</h1>
                            </div>
                          </div>
                          <div className='border-r border-gray-400'></div>
                          <div>
                            <h1 className='text-gray-400'>1 hour ago.</h1>
                          </div>
                        </div>
                        <div>
                          <h1 className='text-sm md:text-lg font-light'>Learning these design
                            skills was fascinating for an accountant and very easy to
                            follow. I have learnt a lot and will be designing on a regular
                            basis going forward.</h1>
                        </div>
                      </div>
                    </div>
                    <div className='flex mt-10'>
                      <div className='w-32'>
                        <div className='text-center'>
                          <img className='h-24 w-24 text-center' src={profile_china} alt='' />
                        </div>
                      </div>
                      <div className='w-5/6'>
                        <div className='flex justify-between'>
                          <div>
                            <h1 className='md:text-xl font-semibold'>Cristofer Rhiel
                              Madsen</h1>
                            <div className='flex gap-2 mt-1'>
                              <div className='flex  justify-center items-center'>
                                <img src={reviews_img4} alt='' />
                              </div>
                              <div>
                                China
                              </div>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className='mt-1'>
                              <img src={reviews_img} alt='' />
                            </div>
                            <div>
                              <h1>10 reviews</h1>
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-4 '>
                          <div className='flex justify-center items-center gap-2'>
                            <div className='flex'>
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                            </div>
                            <div>
                              <h1 className='font-semibold text-[#F1870D]'>5.0</h1>
                            </div>
                          </div>
                          <div className='border-r border-gray-400'></div>
                          <div>
                            <h1 className=' text-gray-400'>3 hour ago.</h1>
                          </div>
                        </div>
                        <div>
                          <h1 className='text-sm md:text-lg font-light'>Learning these design
                            skills was fascinating for an accountant and very easy to
                            follow. I have learnt a lot and will be designing on a regular
                            basis going forward.</h1>
                        </div>
                      </div>
                    </div>
                    <div className='flex mt-10'>
                      <div className='w-32'>
                        <div className='text-center'>
                          <img className='h-24 w-24 text-center' src={profile_Aus} alt='' />
                        </div>
                      </div>
                      <div className='w-5/6'>
                        <div className='flex justify-between'>
                          <div>
                            <h1 className='md:text-xl font-semibold'>Roger Geidt</h1>
                            <div className='flex gap-2 mt-1'>
                              <div className='flex  justify-center items-center'>
                                <img src={reviews_img3} alt='' />
                              </div>
                              <div>
                                Saudi Arabia
                              </div>
                            </div>
                          </div>
                          <div className='flex gap-2'>
                            <div className='mt-1'>
                              <img src={reviews_img} alt='' />
                            </div>
                            <div>
                              <h1>10 reviews</h1>
                            </div>
                          </div>
                        </div>
                        <div className='flex gap-4'>
                          <div className='flex justify-center items-center gap-2'>
                            <div className='flex'>
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                              <img className='w-4 h-4' src={star} alt='' />
                            </div>
                            <div>
                              <h1 className='font-semibold text-[#F1870D]'>5.0</h1>
                            </div>
                          </div>
                          <div className='border-r border-gray-400'></div>
                          <div>
                            <h1 className='text-gray-400'>2 hour ago.</h1>
                          </div>
                        </div>
                        <div>
                          <h1 className='text-sm md:text-lg font-light'>Learning these design
                            skills was fascinating for an accountant and very easy to
                            follow. I have learnt a lot and will be designing on a regular
                            basis going forward.</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className='flex justify-center items-center p-4'>
                <Stack spacing={2}>
                  <Pagination count={10} />
                </Stack>
              </div>
            </div>
          </div>
          <div class="w-full py-0 max-[1200px]:px-4 px-10 order-1 md:order-2 md:w-1/3">
            <AboutHim />
            <SocialMedia />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewsProfile;