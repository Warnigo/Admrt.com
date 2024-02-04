import React, { useEffect, useRef, useState } from "react";
import PencilIcon from "./cropImg/icons/PencilIcon";
import ImageCropper from "./cropImg/modal";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { usersCollection, storage } from "../../firebase/firebase";
import edit_svg_blue from "../../image/edit_svg_blue.svg";

const EditeUser = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const avatarUrl = useRef("https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg");
  const [modalOpen, setModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [croppedImage, setCroppedImage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchUserData(user.uid);
        fetchUserImage(user.uid);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(usersCollection, userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setFullName(userData.fullName);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserImage = async (userId) => {
    try {
      const imageRef = ref(storage, `users/${userId}/images/user_image.png`);
      const imageUrl = await getDownloadURL(imageRef);
      setCroppedImage(imageUrl + `?key=${Date.now()}`);
  
      const userDocRef = doc(usersCollection, userId);
      await updateDoc(userDocRef, { imageUrl });
  
    } catch (error) {
      console.error("Error fetching user image:", error);
    }
  };
  
  const updateAvatar = (imgSrc) => {
    const newCroppedImage = imgSrc + `?key=${Date.now()}`;
    setCroppedImage(newCroppedImage);

    window.location.reload();
  };

  return (
    <div className="flex -mt-10 ml-4">
      <div className="relative">
        <img
          key={croppedImage}
          src={croppedImage || avatarUrl.current}
          alt="...leading. please make refresh"
          className="w-[150px] h-[150px] rounded-full border-8 border-white"
        />
        <button
          className="absolute -bottom-1 left-20 right-0 w-fit p-[.35rem] rounded-full bg-white hover:bg-gray-200 border border-gray-600"
          title="Change photo"
          onClick={() => setModalOpen(true)}
        >
          <PencilIcon />
        </button>
      </div>
      <div className="flex justify-center w-1/3 items-center">
        <div className=''>
          <h1 className='font-medium text-lg md:text-2xl'>{fullName}</h1>
          <div className="flex">
            <h1 className='text-sm w-full font-medium text-blue-800'><span
              className='text-sm text-gray-500'>Experitise: </span>Magician, Youtuber, Vlogs</h1>
            <div className='flex justify-center items-center cursor-pointer ml-2'>
              <img src={edit_svg_blue} alt="" />
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <ImageCropper
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
          currentAvatar={croppedImage}
        />
      )}
    </div>
  );
};

export default EditeUser;
