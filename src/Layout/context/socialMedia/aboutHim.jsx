import React from 'react'
import icon_youtube from '../../../svgs/social-media/download (5) 1.svg'
import icon_facebook from '../../../svgs/social-media/download (6) 1.svg'
import icon_instagram from '../../../svgs/social-media/download.svg'
import shape from '../../../image/share-2 1.svg'
import ModalAddPlatforms from '../../../Modals/ModalAddPlatforms';
import ModalDelete from '../../../Modals/ModalDelete'

const AboutHim = () => {
      return (
            <div>
                  <div className='flex justify-between my-3 mt-20'>
                        <div>
                              <h1 className='font-semibold'>About Him</h1>
                        </div>
                        <div className="flex gap-5">
                              <button className='bg-blue-700 px-2 py-1 rounded-lg text-sm'>
                                    <ModalAddPlatforms />
                              </button>
                              <img src={shape} alt='' />
                        </div>
                  </div>
                  <div className='border my-4'></div>
                  <div className='flex justify-between'>
                        <div>
                              <img src={icon_youtube} alt='' />
                        </div>
                        <div className=' my-2 rounded-lg '>
                              <div className="h-6 w-6 cursor-pointer">
                                    <ModalDelete />
                              </div>
                              <button className='hidden py-1 px-2 text-white text-sm'><h1>Get started</h1></button>
                        </div>
                  </div>
                  <div className='flex justify-between'>
                        <div>
                              <img src={icon_facebook} alt='' />
                        </div>
                        <div className=' my-2 rounded-lg '>
                              <div className="h-6 w-6 cursor-pointer">
                                    <ModalDelete />
                              </div>
                              <button className='hidden py-1 px-2 text-white text-sm'><h1>Get started</h1></button>
                        </div>
                  </div>
                  <div className='flex justify-between'>
                        <div>
                              <img src={icon_instagram} alt='' />
                        </div>
                        <div className=' my-2 rounded-lg '>
                              <div className="h-6 w-6 cursor-pointer">
                                    <ModalDelete />
                              </div>
                              <button className='hidden py-1 px-2 text-white text-sm'><h1>Get started</h1></button>
                        </div>
                  </div>
            </div>
      )
}

export default AboutHim
