import React, { useEffect, useState } from 'react';
import searchIcon from '../../Layout/AuthPage/images/search-normal.svg';
import { auth, db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Search = () => {
  const [userNames, setUserNames] = useState([]);
  const [userId, setUserId] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [split, setSplit] = useState(null)
  const [userUID, setUserUID] = useState([]);
  const [userImage, setUserImage] = useState();
  const avater = 'https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
  
        if (!snapshot.empty) {
          const usersData = snapshot.docs.map((doc) => doc.data());
  
          const filteredUsers = usersData.filter((user) => user.split === 'adSpaceHost');
  
          if (filteredUsers.length > 0) {
            const usernames = filteredUsers.map((user) => user.username);
            const userUIDs = filteredUsers.map((user) => user.userId);
            const userImages = filteredUsers.map((user) => user.imageUrl);
            const userSplit = filteredUsers.map((user) => user.split);
            setUserNames(usernames);
            setUserUID(userUIDs);
            setUserImage(userImages);
            setSplit(userSplit);
          } else {
            setUserNames([]);
            setUserUID([]);
          }
        } else {
          setUserNames([]);
          setUserUID([]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData();
  }, []);
  


  const filteredNames = userNames.filter(
    (username) =>
      username &&
      username.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="relative w-full lg:w-72">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="p-3 w-full h-10 z-20 text-sm text-gray-900 bg-blue-50 rounded-full border outline-none focus:border-blue-500"
          placeholder="Search"
          required
        />
        <div className="absolute top-0 right-0 p-2 pr-3 text-sm font-medium h-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
          <img src={searchIcon} alt="Search" />
        </div>
      </div>
      {searchValue && filteredNames.length === 0 && (
        <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg">
          <p className="py-2 px-4 text-black">User not found</p>
        </div>
      )}
      {searchValue && filteredNames.length > 0 && (
        <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg">
          <ul className='m-1 border border-gray-300 rounded-sm'>
            {filteredNames.map((username, index) => (
              <Link to={`p=profileut/${split}/${userUID[index]}`}>
                <div className='flex px-3 py-2 hover:bg-gray-100 border-b'>
                  <li key={index} className=''>
                    <img src={userImage[index] || avater} alt="" className='w-10 rounded-full border border-blue-700 p-0.5' />
                  </li>
                  <li
                    key={index}
                    className="py-2 px-4 cursor-pointer hover:bg-gray-100 text-black"
                  >
                    {username}
                  </li>
                </div>
              </Link>

            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
