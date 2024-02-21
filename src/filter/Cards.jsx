import React from 'react'
import primary from './Primary/With Icon.svg'
import fire from './Primary/fire.svg'
import group from './Primary/group.svg'
import category from './Primary/category.svg'
import ratings from './Primary/ratings.svg'
import star from './Primary/star 1.svg'
import platforms from './Primary/platforms.svg'
import youtube from './Primary/youtube.svg'
import twitter from './Primary/twitter.svg'
import facebook from './Primary/facebook.svg'
import instagram from './Primary/instagram.svg'
import save from './Primary/Vector (1).svg'

const Cards = () => {
    return (
        <div className='p-3'>
            <div className='max-w-screen-2xl mx-auto px-3 md:px-0'>
                <div class=" grid grid-cols-1  md:grid-cols-3 gap-4">
                    <div className='border rounded-lg p-3'>
                        <div className='flex mt-5'>
                            <div className='w-1/3 '>
                                <img className='iconYoutuber' src={primary} alt="iconYoutuber" />
                            </div>
                            <div className='w-2/3'>
                                <h1 className='userPhoto font-semibold'>Mr Beast</h1>
                                <h1 className='text-gray-500 text-sm'>American Youtuber</h1>
                            </div>
                        </div>
                        <div className='flex justify-between py-2 md:py-2.5'>
                            <div className='flex '>
                                <img src={fire} alt="fire" />
                                <h1 className='text-gray-500 text-sm ml-2'>Popularity:</h1>
                            </div>
                            <div>
                                <h1 className='text-sm'>100M+ Subscriber</h1>
                            </div>
                        </div>
                        <div className='flex justify-between py-2 md:py-2.5'>
                            <div className='flex '>
                                <img src={group} alt="group" />
                                <h1 className='text-gray-500 text-sm ml-2'>Target Audience:</h1>
                            </div>
                            <div>
                                <h1 className='text-sm'>Younger & Kids</h1>
                            </div>
                        </div>
                        <div className='flex justify-between py-2 md:py-2.5'>
                            <div className='flex '>
                                <img src={category} alt="category" />
                                <h1 className='text-gray-500 text-sm ml-2'>Category:</h1>
                            </div>
                            <div>
                                <h1 className='text-sm'>Entertainment</h1>
                            </div>
                        </div>
                        <div className='flex justify-between py-2 md:py-2.5'>
                            <div className='flex '>
                                <img src={ratings} alt="category" />
                                <h1 className='text-gray-500 text-sm ml-2'>Ratings:</h1>
                            </div>
                            <div className='flex  justify-center items-center'>
                                <img src={star} alt="star" />
                                <h1 className='text-sm mr-2'>5</h1>
                                <div className='border border-green-400 rounded-xl text-center bg-green-200 text-green-400'>
                                    <button className='text-sm p-1'>Accepts: Any Advertiser</button>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between pb-2'>
                            <div className='flex '>
                                <img src={platforms} alt="platforms" />
                                <h1 className='text-gray-500 text-sm ml-2'>Platforms:</h1>
                            </div>
                            <div className='flex  gap-3 mt-2 w-auto h-6'>
                                <img src={youtube} alt="youtube" />
                                <img src={twitter} alt="twitter" />
                                <img src={facebook} alt="facebook" />
                                <img src={instagram} alt='instagram' />
                            </div>
                        </div>
                        <div className='flex justify-center items-center mt-1 bg-gray-100 px-2 py-1 rounded-xl'>
                            <div className='w-1/4'>
                                <img src={save} alt="save" />
                            </div>
                            <div className='w-1/3'>
                                <h1 className='text-sm font-bold'>$1,500</h1>
                                <h1 className='text-gray-500 text-xs'>Starting at</h1>
                            </div>
                            <div className='w-1/3 bg-blue-600 text-white text-center py-2 px-1 rounded-xl'>
                                <button className='text-sm'>View Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards