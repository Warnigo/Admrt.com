import React, { useEffect, useRef, useState } from "react";
import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import Logo from '../images/Group 1000005596 (2).svg'
import userPhoto from '../Layout/AuthPage/images/Group 1000005937.svg'
import { Link, useNavigate } from "react-router-dom";
import Notification from '../images/notification.svg'
import down from '../svgs/down.svg'
import { ref, getDownloadURL } from 'firebase/storage'
import { auth, storage, usersCollection } from '../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Search from "./search/search";

function StickyNavbar({ authenticated, onUserSelect }) {
  const [openNav, setOpenNav] = React.useState(false);
  const [userImage, setUserImage] = useState(null);
  const [state, setState] = useState(false);
  const [userId, setUserId] = useState(null);
  const profileRef = useRef(null);
  const [userFullName, setUserFullName] = useState(null);
  const [split, setSplit] = useState(null)
  const navigate = useNavigate();
  const defaultAvate = "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg";

  useEffect(() => {
    const unsebscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid);

        try {
          const userDoc = await getDoc(doc(usersCollection, user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const fullName = userData.fullName;
            const splitCall = userData.split
            setUserFullName(fullName);
            setSplit(splitCall)
          }
        } catch (error) {
          console.error('Error getting user data:', error);
        }
      } else {
        setUserId(null);
      }
    });

    return () => unsebscribe();
  }, []);


  useEffect(() => {
    const handleDropDown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setState(true);
      }
    };

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setState(false);
      }
    };

    document.addEventListener('click', handleDropDown);
    document.addEventListener('scroll', handleClickOutside);

  }, [profileRef]);

  useEffect(() => {
    const getImageFromStorage = async () => {
      try {
        if (userId) {
          const storageRef = ref(storage, `users/${userId}/images/user_image.png`);
          const downloadURL = await getDownloadURL(storageRef);
          setUserImage(downloadURL);
        }
      } catch (error) {
        console.error('Error getting user image:', error);
      }
    };

    getImageFromStorage();
  }, [userId]);

  const navigation = [
    { title: "Dashboard", path: "/" },
    { title: "Profile", path: `/t=split${split}/${userId}` },
    { title: "Settings", path: `/t=?${split}/${userId}/settings` },
  ];

  const handleLogout = () => {
    auth.signOut();
    navigate("/")
    window.location.reload();
  }

  const ghostUser = (
    <div className="flex">
      <ul className="mt-2 mb-2 mr-6 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Search onUserSelect={onUserSelect} />
        <Typography
          as="li"
          variant="small"
          className="p-1 text-black text-lg font-normal"
        >
          <Link to="/" className="flex items-center hover:text-blue-700 hover:shadow-sm">
            <h1>Home</h1>
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          className="p-1 text-black text-lg font-normal"
        >
          <Link to="/about" className="flex items-center hover:text-blue-700 hover:shadow-sm">
            <h1>About</h1>
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          className="p-1 text-black text-lg font-normal"
        >
          <a href="/contact" className="flex items-center hover:text-blue-700 hover:shadow-sm">
            <h1>Contact</h1>
          </a>
        </Typography>
      </ul>
      <div className='cursor-pointer hidden lg:flex buttonSign'>
        <Link to="/login">
          <div className='hover:bg-blue-100 signIndiv h-10 p-2 px-8'>
            <img src={userPhoto} alt="User" className="h-5 mr-2" />
            <h1 className='text-center buttonSignIn'>Sign In</h1>
          </div>
        </Link>
        <Link to="/register">
          <div>
            <button className='buttonSignUp hover:bg-blue-100 h-10 p-2 px-8'>Sign Up</button>
          </div>
        </Link>
      </div>
      <IconButton
        variant="text"
        className="ml-auto h-6 w-6 text-inherit text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
        ripple={false}
        onClick={() => setOpenNav(!openNav)}
      >
        {openNav ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </IconButton>
    </div>
  );

  const getUser = (
    <div className="flex items-center gap-2">
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Search onUserSelect={onUserSelect} />
        <Typography
          as="li"
          variant="small"
          className="p-1 text-black text-lg font-normal"
        >
          <Link to={"/message"} className="flex items-center hover:text-blue-700 hover:shadow-sm">
            <h1>Message</h1>
          </Link>
        </Typography>
        <Typography
          as="li"
          variant="small"
          className="p-1 text-black text-lg font-normal"
        >
          <img src={Notification} alt="Notification" />
        </Typography>
      </ul>
      <div className='cursor-pointer hidden lg:flex border-2 border-blue-500 p-1 rounded-full'
        onMouseEnter={() => setState(true)}
        onMouseLeave={() => setState(false)}
      >
        <div className="flex"
        >
          <button
            className="hidden w-10 flex h-10 outline-none rounded-full  ring-offset-2 ring-blue-600 lg:focus:ring-2 lg:block"
            onClick={() => setState(!state)}
          >
            {userImage ? (
              <img src={userImage} alt="" className="w-full h-full rounded-full" />
            ) : (
              <img src={defaultAvate} alt="" className="w-full h-full rounded-full" />
            )}
          </button>
          {userFullName ? (
            <>
              <h1 className="text-black text-center p-2">{userFullName}</h1>
              <img src={down} alt="" className="w-9" />
            </>
          ) : (
            <h1 className="text-black text-center p-2">Please enter name</h1>
          )}

        </div>
        <ul className={`bg-white top-14 right-0 mt-6 space-y-6 lg:absolute lg:border lg:rounded-md lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
          {navigation.map((item, idx) => (
            <li key={idx}>
              <Link className="block text-gray-600 hover:text-gray-900 lg:hover:bg-gray-50 lg:p-3" to={item.path}>
                {item.title}
              </Link>
            </li>
          ))}
          <button onClick={handleLogout} className="block w-full text-justify text-gray-600 hover:text-gray-900 border-t py-3 lg:hover:bg-gray-50 lg:p-3">
            Logout
          </button>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="max-w-7xl mx-auto ">
        <Navbar className="sticky bg-transpernt border-none backdrop-none backdrop-blur-none shadow-none top-0 z-10 h-max max-w-full rounded-none px-6 py-6 lg:px-6 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography
              as="a"
              href="/"
              className="mr-4 text-black cursor-pointer py-1.5 font-medium"
            >
              <img className="w-36 md:w-44" src={Logo} alt="Logo" />
            </Typography>
            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block">{authenticated ? getUser : ghostUser}</div>
            </div>
          </div>
          <MobileNav open={openNav}>
            {authenticated ? getUser : ghostUser}
            <div className="flex items-center gap-x-1">
              <Button fullWidth variant="text" size="sm" className="">
                <a href="/login"><span>Sign In</span></a>
              </Button>
              <Button fullWidth variant="" size="sm" className="bg-blue-700">
                <a href="/register"><span>Sign up</span></a>
              </Button>
            </div>
          </MobileNav>
        </Navbar>
      </div>
    </div>
  );
}

export default StickyNavbar;
