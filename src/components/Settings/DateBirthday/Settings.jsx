import React, { useEffect, useState } from 'react'
import DatePickerPage from './DatePickerPage';
import './style.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { auth, db, usersCollection } from '../../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Settings = () => {
  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [email, setChangeEmail] = useState(null);
  const [dateBirthday, setDateBirthday] = useState(null);
  const [phoneNumber, setCHangePhoneNumber] = useState(null);
  const [data, setData] = useState(null);
  const { userId: userIdParam } = useParams();
  const [modal, setModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    })

    return () => fetchUser()
  }, [])

  const handleSaveChanges = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userRef = doc(usersCollection, userId);

      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const currentData = userDoc.data();

        const userData = {
          fullName,
          email,
          dateBirthday,
          phoneNumber,
        };

        const updatedUserData = { ...currentData, ...userData };

        await setDoc(userRef, updatedUserData);
        setModal(false);
        window.location.reload();
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const userDoc = getDoc(doc(db, "users", userId || userIdParam));
        const userData = userDoc.data();
        setData(userData || {});
      } catch (error) {
        console.log(error);
      }
    }

    handleFetchData()
  }, [userId, userIdParam])

  const handleLogout = () => {
    console.log(`logout user: ${userId}`);
    auth.signOut();
    navigate("/")
  }

  const updateFormValidation = () => {
    setIsFormValid(!!fullName && !!email && !!dateBirthday && !!phoneNumber);
  };

  return (
    <div>
      {modal && (
        <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
          <div className='absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
            <div className='bg-white p-4 rounded-sm pt-6'>
              <h1 className='text-2xl font-bold'>Are you sure you want to change your information?</h1><hr />
              <div className=' text-center  p-3 '>
                <button className='bg-blue-500 p-2 m-1 rounded-sm w-32 text-white hover:bg-blue-600'
                  onClick={() => setModal(false)}
                >
                  No
                </button>
                <button className='bg-gray-500 p-2 m-1 rounded-sm w-32 text-white hover:bg-gray-600'
                  onClick={handleSaveChanges}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div class="md:flex  my-12 bg-white m-auto max-w-screen-2xl justify-center items-center px-4 py-6 sm:px-6 lg:px-8">
        <div class="w-full h-96 border  border-gray-100 bg-white py-8 px-3 md:px-10 mb-5 rounded-2xl md:0  md:w-1/3">
          <div className=''>
            <div class="mb-6">
              <h3 class="font-bold text-2xl text-start">Settings</h3>
            </div>
            <div class="mx-auto">
              <div class=" ">
                <button class="flex mt-8 w-full text-lg font-medium p-4 rounded-2xl  mb-2.5 bg-gray-100">
                  <img class="mr-4" src="./account.svg" alt="" />
                  Account
                </button>
                <Link to={`/${userId}/qwerty`}>
                  <button class="flex w-full mt-8 text-lg font-medium p-4 mb-2.5 rounded-2xl hover:bg-gray-100">
                    <img class="mr-4" src="./Billings.svg" alt="" />
                    Billings
                  </button>
                </Link>
                <button onClick={handleLogout} className="border mt-8 w-full  text-lg bg-white rounded-2xl font-medium p-4 hover:text-red-500">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full  md:w-2/3 md:ml-8 py-8 px-3 md:px-10 border border-gray-100 bg-white p-4 rounded-2xl">
          <div class="text-start">
            <div class="mb-6">
              <h3 class="font-bold  text-xl">Account Settings</h3>
            </div>

            <form>
              <div class=" grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label for="first_name" className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Full Name</label>
                  <input type="text" id="first_name" class="bg-gray-50 border px-4 py-3 text-base border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      updateFormValidation();
                    }}
                    required
                  />
                </div>

                <div class="">
                  <label for="email" className="block mb-2 text-base font-medium text-gray-900 dark:text-black">Email</label>
                  <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="expample@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setChangeEmail(e.target.value);
                      updateFormValidation();
                    }}
                    required
                  />
                </div>

                <div>
                  <label for="email" class="block mb-2 text-base font-medium text-gray-900 dark:text-black">Birthday</label>
                  <DatePickerPage fullName={dateBirthday} setDateBirthday={setDateBirthday} updateFormValidation={updateFormValidation} />
                </div>
                <div>
                  <label for="phone" class="block mb-2 text-base font-medium text-gray-900 dark:text-black">Phone number</label>
                  <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 px-4 py-3 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="123-45-678"
                    value={phoneNumber}
                    onChange={(e) => {
                      setCHangePhoneNumber(e.target.value);
                      updateFormValidation();
                    }}
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          <div>
            <div className="mb-6 mt-10 py-6 text-center md:text-end">
              <button className="w-full md:w-64 rounded-lg  py-3  bg-blue-500 text-white hover:shadow-lg font-medium font-medium text-sm md:text-base shadow-indigo-700/40 text-center"
                onClick={() => 
                    setModal(true)}
                 
              >
                Save Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
