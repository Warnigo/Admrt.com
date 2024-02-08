import React from 'react'
import svg1 from '../Layout/AuthPage/images/icon.svg'
import image from '../Layout/AuthPage/images/image 27.png'
import { Link } from 'react-router-dom'
import Header from './Header'

const Home = () => {
  return (
    <div class="home-con h-full">
      <div class=" items-center max-w-screen-2xl px-4 md:px-8  py-4 mx-auto xl:px-5">
        <div class="flex flex-wrap items-center my-10 md:my-20 sm:-mx-3">
          <div class="w-full md:w-3/5 md:px-3">
            <div class="w-full pb-6   sm:pr-5 lg:pr-0 md:pb-0">
              <h1 class="text-4xl lg:text-5xl xl:text-6xl md:max-w-3xl font-bold">Your Brand. <span class="text-blue-700 italic">Strategic</span> Spaces. One Platform </h1>
              <p className='my-2 w-full text-xs md:text-base font-light md:font-normal md:w-3/4'>
                AdMrt streamlines advertising by directly connecting advertisers and publishers, reducing complexities and agency fees. List your ad space with ease and start earning today.              </p>
              <form class="my-6  md:mt-12 sm:max-w-md md:max-w-lg ">
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />

                  </div>
                  <input type="search" id="" class="block w-full p-5 px-4  text-sm text-gray-900 border-gray-300  rounded-lg border-blue-500 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" placeholder="Search for ads ..." required />
                  <button type="submit" class="text-black absolute right-2.5 py-3 px-8 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-white text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Find places to advertise</button>
                </div>
              </form>
              <div>
                <h1 class="mt-3 font-light">Get Started now?<a href='/register' class="text-blue-500 font-medium underline py-1 mx-2 cursor-pointer">Sign up now</a></h1>
              </div>
              <div class="mt-12 text-base md:text-xl">
                <div class="flex mb-5">
                  <img src={svg1} alt="icon" />
                  <h1 class="ml-3">Streamline the ad buying and selling process</h1>
                </div>
                <div class="flex">
                  <img src={svg1} alt="icon" />
                  <h1 class="ml-3">See all ad spaces suitable to your brand</h1>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full bg-2 bg-white rounded-xl py-8 px-10 md:w-2/5 ">
            <div class="text-center h-auto overflow-hidden rounded-md  sm:rounded-xl">
              <h1 class="text-3xl font-semibold">Sell your ad space</h1>
              <Link to="/register">
                <button class="my-5 py-2 px-12 text-white rounded-full bg-blue-600"><h1>Host ads now</h1></button>
              </Link>
              <div class="flex justify-center items-center">
                <img class="img-fluid text-center" src={image} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Header />
    </div>

  )
}

export default Home;

