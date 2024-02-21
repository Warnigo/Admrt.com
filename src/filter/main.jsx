import React from 'react'
import Cards from './Cards'

const MainFilter = () => {
  return (
    <div className=''>
      <div className=' mx-auto px-5'>
        <div className='border rounded-lg p-2 md:p-8'>
          <div className='flex justify-between'>
            <div className='text-xl md:text-3xl font-bold'><h1>Filter</h1></div>
            <div className='text-base md:text-xl text-red-500'><h1>Clear Filter</h1></div>
          </div>
          <div className='p-2 mt-4'>
            <h1 className='text-base font-semibold'>Location</h1>
            <form>
              <div>
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                </div>
                <input class="block w-full py-3 mt-2 text-gray-900 input text-base " placeholder='Enter or Set Current Location' />
                <button class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">
                  <h1 className='text-xs md:text-base'>Detect Current location</h1>
                </button>
              </div>
            </form>
          </div>
          <div className="mt-5">
            <div>
              <h1>Type of AdSpace</h1>
              <div className='flex justify-between'>
                <div className='flex gap-5'>
                  <div class="flex font-medium text-gray-700 ">
                    <input class="accent-blue-600 peer" type="radio" name="framework" id="applePay" value="applePay" />
                    <label class="text-gray-900 cursor-pointer peer-checked:border-blue-700 peer-checked:text-black" for="applePay">
                      <h1 class="text-sm md:text-base md:text-start pl-1 md:pl-3 mt-1 md:mt-0.5">Social Media</h1>
                    </label>
                  </div>
                  <div class="">
                    <div class="flex font-medium text-gray-700 ">
                      <input class="accent-blue-600 peer" type="radio" name="framework" id="applePay2" value="applePay2" />
                      <label class="text-gray-900 cursor-pointer peer-checked:border-blue-700 peer-checked:text-black" for="applePay2">
                        <h1 class="text-sm md:text-base md:text-start pl-1 md:pl-3 mt-1 md:mt-0.5">Social Media</h1>
                      </label>
                    </div>
                  </div>
                  <div class="">
                    <div class="flex font-medium text-gray-700 ">
                      <input class="accent-blue-600 peer" type="radio" name="framework" id="applePay3" value="applePay3" />
                      <label class="text-gray-900 cursor-pointer peer-checked:border-blue-700 peer-checked:text-black" for="applePay3">
                        <h1 class="text-sm md:text-base md:text-start pl-1 md:pl-3 mt-1 md:mt-0.5">Social Media</h1>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='flex -mt-7'>
                    <div className=''>
                      <label for="countries" class="block text-sm font-medium text-gray-900 dark:text-white"><h1>Platform</h1></label>
                      <select id="countries" class="select border rounded-lg w-44 p-2 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block">
                        <option selected>Select Social media</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                      </select>
                    </div>
                    <div className=''>
                      <label for="countries" class="block text-sm font-medium text-gray-900 dark:text-white">Target Audience</label>
                      <select id="countries" class="select border rounded-lg p-2 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block">
                        <option selected>Select Audience Type</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-center -translate-y-3 md:-translate-y-7'>
          <button type="button" class="px-3 py-1 md:px-9 md:py-4  shadow-2xl text-sm md:text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center ">Apply Filter</button>
        </div>
      </div>
      <div>
        <Cards />
      </div>
    </div>
  )
}

export default MainFilter;
