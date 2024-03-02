import { useCallback, useEffect, useState } from "react";
import { auth, db, saveMessageToFirebase, usersCollection } from '../../firebase/firebase'
import { doc, getDoc } from "firebase/firestore";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { avatar } from '../../modul/main'
import svg2 from '../../image/search 1.svg'
import { VscEmptyWindow } from "react-icons/vsc"

const MessageIndex = ({ isMobile }) => {
    const [userUid, setUserId] = useState('');
    const [verifyRequest, setVerifyRequest] = useState({});
    const [avatars, setAvatars] = useState({});
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState(null)
    const [meId, setMeId] = useState(null);
    const { userId } = useParams();
    const location = useLocation();
    const verifyPath = location.pathname === '/message';

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setMeId(user.uid)
                try {
                    const userRef = doc(usersCollection, user.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        const requestCall = Object.fromEntries(Object.entries(data.requests)
                            .filter(([key, value]) => value === true)
                        );
                        setVerifyRequest(requestCall);
                        setUsername(data.fullName)
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                setMeId(null)
            }
        });
        return () => unsubscribe();
    }, []);

    const handleFetch = useCallback(async () => {
        try {
            const fetchedAvatars = {};
            const fetchedUserId = {}
            await Promise.all(Object.keys(verifyRequest).map(async (key) => {
                const userRef = doc(db, "search", key);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    fetchedAvatars[key] = data.imageUrl;
                    fetchedUserId[key] = data.userId
                }
            }));
            setAvatars(fetchedAvatars);
            setUserId(fetchedUserId)
        } catch (err) {
            console.error(err);
        }
    }, [verifyRequest]);

    useEffect(() => {
        handleFetch();
    }, [handleFetch]);

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveMessageToFirebase(meId, userId, { message, sender: username });
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex h-[88vh]  max-w-screen-2xl mx-auto antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden  mx-3">
                <div className={`flex flex-col flex-auto h-full ${isMobile ? "w-full" : "w-1/3"}  flex-shrink-0`}>
                    <div className="flex flex-col flex-auto  rounded-2xl w-full h-full p-2">
                        <div className="border p-4 rounded-xl">
                            <div>
                                <h1 className="text-start mx-2 font-semibold text-lg md:text-2xl my-3">Messages</h1>
                                <div class="my-3">
                                    <form>
                                        <div class="relative w-full">
                                            <input class="md:p-3 p-2  w-full z-20 text-sm text-gray-900 bg-blue-50 rounded-full border outline-none focus:border-blue-500" placeholder="Search" required />
                                            <div class="absolute top-0 right-0 md:p-3 p-2 text-sm font-medium h-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300">
                                                <img src={svg2} alt="" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col space-y-1 mt-4  h-full border rounded-xl overflow-y-auto">
                            <div class="flex flex-col h-full w-full overflow-x-auto">
                                <div class="flex flex-col space-y-1 mt-3  h-full rounded-xl overflow-y-auto">
                                    <div class="flex flex-col h-full w-full px-5 overflow-x-auto mb-4">
                                        <div class="my-2 py-2">
                                            {Object.keys(verifyRequest).length === 0 && (
                                                <div className="text-gray-400 flex justify-center">
                                                    <div >
                                                        <VscEmptyWindow className="w-44 h-44" />
                                                        <p className="text-center">Empty Message</p>
                                                    </div>
                                                </div>
                                            )}
                                            {Object.entries(verifyRequest).map(([key]) => (
                                                <Link to={`/message/direct/${userUid[key]}`}>
                                                    <button key={key} className="py-4 flex border-b w-full items-start justify-between cursor-pointer hover:bg-gray-50 hover:text-black">
                                                        <div className="flex gap-3">
                                                            <img src={avatars[key] || avatar} className="flex-none w-12 h-12 rounded-full" alt="" />
                                                            <div className="m-auto">
                                                                <span className="block text-sm text-gray-700 font-semibold">{key}</span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-auto h-full w-2/3  flex-shrink-0">
                    <div
                        className="flex flex-col flex-auto rounded-2xl w-full h-full p-4"
                    >
                        <div className="border relative px-5 rounded-xl mb-3">
                            <div className="flex py-3">
                                <div className="w-18 flex justify-content items-center">
                                    {Object.entries(verifyRequest).map(([key]) => (
                                        <Link to={`/message/direct/${userUid[key]}`}>
                                            <button key={key} className="py-4 flex border-b w-full items-start justify-between cursor-pointer hover:bg-gray-50 hover:text-black">
                                                <div className="flex gap-3">
                                                    <img src={avatars[key] || avatar} className="flex-none w-12 h-12 rounded-full" alt="" />
                                                    <div className="m-auto">
                                                        <span className="block text-sm text-gray-700 font-semibold">{key}</span>
                                                    </div>
                                                </div>
                                            </button>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col h-full w-full border rounded-xl overflow-x-auto mb-4">
                            <div class="">
                                <Outlet />
                            </div>
                        </div>
                        {verifyPath ? null : (
                            <form onSubmit={handleMessageSubmit} className="flex flex-row items-center h-16 border rounded-xl bg-white w-full px-2">
                                <div class="flex-grow">
                                    <div class="relative w-full">
                                        <input
                                            class="flex w-full outline-none rounded-xl focus:outline-none pl-4 h-10"
                                            placeholder='Type a message'
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div class="ml-4 flex gap-3 px-6">
                                    <button
                                        class="flex items-center justify-center rounded-xl text-white py-1 flex-shrink-0"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g opacity="0.5">
                                                <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="#171725" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M5.2002 9.40009C5.2002 9.40009 6.2502 10.8001 8.0002 10.8001C9.7502 10.8001 10.8002 9.40009 10.8002 9.40009" stroke="#171725" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M5.90039 5.90015H5.90739" stroke="#171725" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M10.0996 5.90015H10.1066" stroke="#171725" stroke-linecap="round" stroke-linejoin="round" />
                                            </g>
                                        </svg>
                                    </button>
                                    <button
                                        class="flex items-center justify-center rounded-xl text-white py-1 flex-shrink-0"
                                        type="submit"
                                    >
                                        <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M23 5.51055L12.1931 21.3588L10.8042 12.5518L3.87163 6.94548L23 5.51055Z" fill="#2B59FF" stroke="#2B59FF" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M22.9987 5.50982L10.8394 12.6755" stroke="#2B59FF" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageIndex;
