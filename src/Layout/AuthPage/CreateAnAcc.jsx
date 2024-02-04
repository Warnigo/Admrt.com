import React, {useState } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import Checkbox from '@mui/material/Checkbox';
import SlideShow from '../SlideShow';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, usersCollection } from '../../firebase/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { Link, useNavigate, useParams} from 'react-router-dom';
import { ref, set, getDatabase } from 'firebase/database';


const CreateAnAcc = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [errorUsername, setErrorUsername] = useState('')
  const [seccedUsername, setSeccedUsername] = useState('')
  const [usernameValid, setUsernameValid] = useState('')
  const { split } = useParams();
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  };

  const validateUsername = async (username) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setErrorMessage('Username is already taken. Choose another one.');
        setUsernameValid(false);
      } else {
        setErrorMessage('');
        setUsernameValid(true);
      }
    } catch (error) {
      console.error(error);
      setUsernameValid(false);
      setErrorMessage('Error checking username. Please try again.');
    }
  };

  const handleConfimAuth = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setErrorUsername('');

    if (!fullName.trim() || !email.trim() || !phoneNumber.trim() || !password.trim() || !country.trim()) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Invalid email address');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }



    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const infoRef = doc(usersCollection, userId);
      await setDoc(infoRef, {
        fullName,
        email,
        split,
        userId,
        username,
        password,
        phoneNumber,
        country,
      });

      navigate(`/`);
    } catch (err) {
      console.error(err);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  const handleUsernameMessage = async (e) => {
    const value = e.target.value;
    setUsername(value);
    setErrorUsername('');
    setErrorMessage('');
    setUsernameValid('');
    
    if (value.trim() === '') {
      setSeccedUsername('');
      setErrorUsername('Username is required.');
      return;
    }
  
    await validateUsername(value);
  
    if (usernameValid === true) {
      setSeccedUsername('Username available!');
    } else if (usernameValid === false) {
      setErrorUsername('Username is already taken. Choose another one.');
    }
  };

  return (
    <div className="login-container min-h-screen md:flex ">
      <div className="md:w-1/2">
        <SlideShow />
      </div>
      <div className="w-full px-2 md:flex justify-center items-center ">
        <div className="w-full sm:w-full p-2 md:w-auto p-2 xl:w-3/5 lg:p-2">
          <div>
            <div>
              <h1 className="justify-center mb-2 font-normal text-3xl lg:text-5xl sm:text-3xl">Create An Account</h1>
              <p className="mt-2 text-base font-light md:mt-12">Already have an account?<span className="text-purple-700 font-normal cursor-pointer "><Link to="/login"> Login </Link></span></p>
            </div>
          </div>
          <form onSubmit={handleConfimAuth}>
          <div>
          <label className="block mt-8">
            <h3 className="text-lg font-normal">Username</h3>
            <input
              type="text"
              name="text"
              className={`mt-2.5 px-3 py-3 md:py-4 bg-white border shadow-sm 
              ${errorUsername ? 'border-red-500 focus:border-red-500 focus:ring-red-600' : ''}
              ${usernameValid === true ? 'border-green-500 focus:border-green-500 focus:ring-green-600' : ''}
              ${usernameValid === false ? 'border-red-500 focus:border-red-500 focus:ring-red-600' : ''}
              placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-blue-600 block w-full rounded-xl focus:ring-1`}
              placeholder="Only one word"
              value={username}
              onChange={handleUsernameMessage}
            />
            {usernameValid === true && <p className='text-green-500'>{seccedUsername}</p>}
            {usernameValid === false && <p className='text-red-500'>{errorUsername}</p>}
          </label>
        </div>
            <div>
              <label className="block mt-8">
                <h3 className="text-lg font-normal">Full Name</h3>
                <input type="text" name="text" className="mt-2.5 px-3 py-3 md:py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-blue-600 block w-full rounded-xl focus:ring-1" placeholder="Pristia Misbash" onChange={(e) => setFullName(e.target.value)} />
              </label>
            </div>
            <div>
              <label className="block mt-8">
                <h3 className="text-lg font-normal">Email Address</h3>
                <input type="email" name="email" className="mt-2.5 px-3 py-3 md:py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-blue-600 block w-full rounded-xl focus:ring-1" placeholder="pristia@gmail.com|" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>
            <div>
              <label className="block mt-8">
                <h3 className="text-lg font-normal">Phone Number</h3>
                <input type="tel" name="tel" className="mt-2.5 px-3 py-3 md:py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-blue-600 block w-full rounded-xl focus:ring-1" placeholder="Input Area" onChange={(e) => setPhoneNumber(e.target.value)} />
              </label>
            </div>
            <div>
              <label className="password-container block mt-8">
                <h3 className="text-lg font-normal">Password</h3>
                <div className='flex'>
                  <input
                    className="mt-2.5 px-3 py-3 md:py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-blue-600 block w-full rounded-xl focus:ring-1"
                    type={type}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <span className="flex justify-around items-center" onClick={handleToggle}>
                    <Icon className="absolute mr-14 mt-2" icon={icon} size={20} />
                  </span>
                </div>
              </label>
            </div>
            <div>
              <label htmlFor="countries" className="password-container block mt-8">
                <h3 className="text-lg font-light md:font-normal">Country</h3>
              </label>
              <select id="countries" className="mt-2.5 px-3  py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-blue-600 block w-full rounded-xl focus:ring-1" onChange={(e) => setCountry(e.target.value)}>
                <option selected>Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
            <div className="flex justify-center items-center mt-8">
              <div className='flex'>
                <Checkbox defaultChecked />
                <div className='flex justify-center items-center' >
                  <p className='text-sm'>By clicking Create account, I agree that I have read and accepted the <span className="text-blue-600">Terms of Use</span> and <span className="text-blue-600">Privacy Policy.</span> </p>
                </div>
              </div>
            </div>
            {errorMessage && <p className="p-2 rounded-lg error-message text-white bg-red-400 border-2 border-red-800 text-center">{errorMessage}</p>}
            <div className="mt-2 social-card bg-blue-500 text-white google border rounded-xl  py-2 text-center hover:border-blue-600  hover:shadow-md md:px-16">
              <button type='submit' className=" text-center   text-gray-800 font-normal py-2 px-4 rounded inline-flex items-center">
                <span className="ml-1 md:ml-2 text-white">Sign Up</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAnAcc;