/** @format */

import React from "react";
import svg from './images/megaphone 1.svg';
import svg1 from './images/megaphone 1 (1).svg';
import svg2 from './images/Group.svg';
import svg3 from './images/ic_google logo (1).svg';
import svg4 from './images/ic_fb logo.svg';
import '../style.css'
import SlideShow from '../SlideShow'
import { auth, googleProvider, facebookProvider } from '../../firebase/firebase'
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error(error)
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container min-h-screen md:flex">
      <div className="md:w-1/2">
        <SlideShow />
      </div>
      <section class="max-w-screen-2xl  mx-auto px-4 h-full justify-center items-center">
        <div class="flex  w-full h-full  flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white max-w-2xl rounded-lg md:mt-0 sm:max-w-md xl:p-0">
            <div class="">
              <h1 class="mb-2 font-normal text-3xl lg:text-5xl sm:text-3xl">
                Create An Account
              </h1>
              <p class="mt-2 text-base font-light md:mt-16">Already have an account? <span class="text-purple-700 font-normal cursor-pointer"><a href="/login">Login</a></span></p><hr />
              <p class="text-base font-light">Back <span class="text-purple-700 font-normal cursor-pointer"><Link to="/">Home</Link></span></p>
              <p class="my-4 text-gray-400">Join as an <span class="text-blue-500 cursor-pointer">ad space host</span>  or as <span class="text-purple-700 cursor-pointer">an advertiser</span> </p>
              <div class="gap-4 w-full  md:flex">
                <div class="relative mt-2 w-full md:w-1/2 py-3 md:py-7 rounded-xl font-medium text-gray-700">
                  <input class="j2x7_17hqRVmwte_tWFa peer hidden" type="radio" name="framework" id="googlePay" value="googlePay" />
                  <label class="absolute top-0 h-full w-full cursor-pointer rounded-xl border peer-checked:border-blue-700 peer-checked:text-blue-700  peer-checked:shadow-2xl peer-checked:duration-500 peer-checked:opacity-100" for="googlePay"></label>
                  <div className="text-center">
                    <div className="flex justify-center items-center">
                      <img class=" w-14 md:w-20" src={svg} alt="icon" />
                    </div>
                    <p class="font-light">Join as an ad space host</p>
                  </div>
                </div>
                <div class="relative w-full md:w-1/2 mt-2 py-3 px-3 md:py-7 rounded-xl font-medium text-gray-700">
                  <div className="flex justify-center items-center">
                    <input class="j2x7_17hqRVmwte_tWFa peer hidden" type="radio" name="framework" id="applePay" value="applePay" />
                    <label class="absolute top-0 h-full w-full cursor-pointer rounded-xl border peer-checked:border-blue-700 peer-checked:text-blue-700 peer-checked:shadow-2xl peer-checked:duration-500 peer-checked:opacity-100" for="applePay"></label>
                    <div className="text-center">
                      <div className="flex justify-center items-center">
                        <img class=" w-14 md:w-20" src={svg1} alt="icon2" />
                      </div>
                      <p class="font-light hover:font-normal">Join as an advertiser</p>
                    </div>
                  </div>
                </div>

              </div>
              <h3 class="text-center text-base md:text-lg font-light my-4 md:my-8 md:font-normal">Create with</h3>
              <div class="">
                <div>
                  <div class="mt-3 flex justify-center items-center text-center w-full social-card text-gray-800 md:font-normal google border font-light rounded-xl py-4 px-4 text-center hover:border-blue-600  hover:shadow-md md:px-16">

                    <img src={svg2} alt="" />
                    <span class="ml-1 md:ml-2"><a className="" href="/continue">Create Account</a></span>

                  </div>
                  <div class="mt-3 flex justify-center items-center text-center w-full social-card text-gray-800 md:font-normal google border font-light rounded-xl py-4 px-4 text-center hover:border-blue-600  hover:shadow-md md:px-16">
                    <img src={svg3} alt="" />
                    <button onClick={signInWithGoogle}><span class="ml-1 md:ml-2">Continue with Google</span></button>
                  </div>
                  <div class="mt-3 flex justify-center items-center text-center w-full social-card text-gray-800 md:font-normal google border font-light rounded-xl py-4 px-4 text-center hover:border-blue-600  hover:shadow-md md:px-16">

                    <img src={svg4} alt="" />
                    <span class="ml-1 md:ml-2" onClick={signInWithFacebook}>Continue with Facebook</span>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
