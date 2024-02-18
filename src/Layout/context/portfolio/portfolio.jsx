import React, { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { VscChromeClose, VscEmptyWindow } from "react-icons/vsc";
import { auth, savePortfolioFirebase } from '../../../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { Id } from '../../../redux/all';

const Portfolio = () => {
  const [modal, setModal] = useState(false)
  const [isHovered, setIsHovered] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('')
  const [date, setDate] = useState();
  const [errorMessageTitle, setErrorMessageTitle] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setUserId(user.uid);
      }else{
        setUserId(null)
      }
    })

    return() => unsubscribe()
  }, [userId])

  const handleNextButton = async () => {
    if (title.length === 0 || !date) {
      setErrorMessageTitle(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    const datas = {
      portfolioTitle: title,
      startDate: date,
      portfolioId: Id,
      userId: userId,
    };
    try {
      await savePortfolioFirebase(userId, Id, datas);
      setLoading(false);
      navigate(`/${title}/portfolio/${userId}/${Id}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  
  return (
    <div>
      {modal && (
        <div>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-25 focus:outline-none">
            <div className="relative w-[80%]  md:w-1/3 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className='px-3 pt-3 rounded-full flex justify-end'
                  onClick={() => setModal(false)}>
                  <VscChromeClose className=' w-6 h-6 p-1 rounded-full text-white bg-gray-700 hover:bg-opacity-75 cursor-pointer' />
                </div>
                <div className="relative p-2 md:p-6 justify-center items-start">
                  <div className='border-b'>
                    <h1 className='text-center mb-6 text-2xl md:text-3xl font-semibold'>Add new portfolio</h1>
                  </div>
                  <div className='pt-2'>
                    <div className="">
                      <p className='pl-1'>Name</p>
                      <p className='px-1 pb-1 text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      <input type="text"
                        placeholder='Writing portfolio name'
                        className={`w-full p-2 border rounded-lg ${errorMessageTitle ? "border-red-600" : ""}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      {errorMessageTitle && <p className='text-red-600'>Please enter title</p>}
                    </div>
                    <div className='mt-4'>
                      <p>Completion Date <span className='text-sm text-gray-500'>(optional)</span></p>
                      <input type="date"
                        className='w-full p-2 border rounded-lg mt-1'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-2 md:p-6 border-t border-solid gap-4 border-blue Gray-200 rounded-b">
                  <button
                    className="bg-gray-700 text-white active:bg-gray-600 font-bold uppercase text-xs md:text-sm p-2 md:px-8 md:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(false)}
                  >
                    <h1 className='text-xs md:text-sm'>
                      Cansel
                    </h1>
                  </button>
                  <button
                    className="bg-blue-700 text-white active:bg-red-600 font-bold uppercase text-xs md:text-sm p-2 md:px-8 md:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleNextButton}
                  >
                    {loading ? "Loading..." : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='border rounded-xl my-4 p-4'>
        <div className='flex justify-between border-b pb-4'>
          <div className='text-2xl font-semibold px-3'>
            <h1>Portfolio (0)</h1>
          </div>
          <div className=''>
            <p className={`absolute text-sm bg-gray-50 border rounded-ls shadow p-2 -mt-11 -ml-9 ${isHovered ? '' : 'hidden'}`}>Add Portfolio</p>
            <IoIosAddCircleOutline className='w-8 h-8 mr-1.5 cursor-pointer hover:'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setModal(true)}
            />
          </div>
        </div>
        <div>
          <div className='text-center py-3'>
            <h1 className='text-gray-500 font-semibold text-sm'>Empty portfolio</h1>
            <p className='text-gray-500 text-sm'>You haven't added a portfolio yet! Please <span onClick={() => setModal(true)} className='text-blue-700 font-semibold text-sm hover:text-blue-800 hover:border-b border-gray-400 cursor-pointer'>add portfolio</span></p>
            <VscEmptyWindow className='w-32 h-32 text-gray-300 m-auto' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio;
