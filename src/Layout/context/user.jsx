import React, { useEffect, useRef, useState } from "react";
import PencilIcon from "./cropImg/icons/PencilIcon";
import ImageCropper from "./cropImg/modal";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { usersCollection, storage, db } from "../../firebase/firebase";
import edit_svg_blue from "../../image/edit_svg_blue.svg";
import { VscChromeClose } from "react-icons/vsc";

const EditeUser = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const avatarUrl = useRef("https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg");
  const [modalOpen, setModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  const [todoModal, setTodoModal] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [experitise, setExperitise] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchUserData(user.uid);
        fetchUserImage(user.uid);
        fetchExperitise(user.uid);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      const usernameRef = doc(db, 'search', fullName);
      await updateDoc(usernameRef, { imageUrl });

    } catch (error) {
      console.error("Error fetching user image:", error);
    }
  };

  const updateAvatar = (imgSrc) => {
    const newCroppedImage = imgSrc + `?key=${Date.now()}`;
    setCroppedImage(newCroppedImage);

    window.location.reload();
  };

  const handleAddTodo = () => {
    if (todos.length < 3) {
      const newTodo = {
        id: todos.length + 1,
        text: todoText
      };
      setTodos([...todos, newTodo]);
      setTodoText("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const fetchExperitise = async (currentUser) => { 
    try {
      const experitiseDoc = await getDoc(doc(usersCollection, currentUser.uid));
      if (experitiseDoc.exists()) {
        const experitiseData = experitiseDoc.data();
        setExperitise(experitiseData.experitise); 
      }
    } catch (error) {
      console.error("Error fetching experitise data:", error);
    }
  };

  const updateExperitise = async () => {
    try {
      const userDocRef = doc(usersCollection, currentUser.uid);
      await setDoc(userDocRef, { experitise: todos }, { merge: true });
    } catch (error) {
      console.error("Error updating experitise data:", error);
    }
  };

  return (
    <div className="flex -mt-10 ml-4">
      {todoModal && (
        <div className="flex justify-center items-center overflow-x-hidden bg-black bg-opacity-25 overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-[80%]  md:w-1/3 mx-auto">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className='px-3 pt-3 rounded-full flex justify-end' onClick={() => setTodoModal(false)}>
                <VscChromeClose className=' w-6 h-6 p-1 rounded-full text-red-500 bg-pink-200' />
              </div>
              <div className="relative p-2 md:p-6 justify-center items-start">
                <div>
                  <h1 className='text-center mb-6 text-2xl md:text-3xl font-semibold'>Are you sure to added Experitise</h1>
                </div>
                <div className="">
                  <div className="">
                    <div className="mb-4">
                      <div className="flex mt-4">
                        <input className="border rounded-lg w-full py-2 px-3 mr-1 text-grey-darker" placeholder="Add social" value={todoText} onChange={(e) => setTodoText(e.target.value)} />
                        <button type="submit" className={`p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 w-20 ${todos.length >= 3 ? 'cursor-not-allowed opacity-50' : ''}`} onClick={handleAddTodo} disabled={todos.length >= 3}>Add</button>
                      </div>
                    </div>
                    <div>
                      <div>
                        {todos.map(todo => (
                          <div className="flex items-center border-b" key={todo.id}>
                            <p className="w-full text-grey-50 ">{todo.text}</p>
                            <button onClick={() => handleDeleteTodo(todo.id)}>
                              <VscChromeClose />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div id="expertiseContainer" className="mt-4"></div>
              </div>
              <div className="flex items-center justify-center p-2 md:p-6 border-t border-solid gap-4 border-blue Gray-200 rounded-b">
                <button className="bg-gray-700 text-white active:bg-gray-600 font-bold uppercase text-xs md:text-sm p-2 md:px-8 md:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setTodoModal(false)}>
                  <h1 className='text-xs md:text-sm'>
                    Cancel
                  </h1>
                </button>
                <button className="bg-blue-600 text-white active:bg-blue-700 font-bold uppercase text-xs md:text-sm p-2 md:px-8 md:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={updateExperitise}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
            <div className='flex justify-center items-center cursor-pointer ml-2' onClick={() => setTodoModal(true)}>
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
