import { useCallback, useEffect, useState } from "react";
import { auth, db, saveMessageToFirebase, usersCollection } from '../../firebase/firebase'
import { doc, getDoc } from "firebase/firestore";
import { Link, Outlet, useParams } from "react-router-dom";

const MessageIndex = () => {
    const ghostAvatar = 'https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'
    const [userUid, setUserId] = useState('');
    const [verifyRequest, setVerifyRequest] = useState({});
    const [avatars, setAvatars] = useState({});
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState(null)
    const [meId, setMeId] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async(user) => {
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
        <div className="flex mx-4 gap-4">
            <div className="fixed z-40 w-full border rounded-xl h-full bg-white space-y-8 overflow-auto relative w-1/3">
                <div className="m-3 h-full">
                    <div className="items-start border-b justify-between flex">
                        <div className="">
                            <h4 className="text-gray-800 text-center text-2xl font-semibold">Message</h4>
                            <p className="mt-0 mb-2 text-gray-600 text-base sm:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing</p>
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="w-80 py-2">
                                <div className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-lg outline-none bg-gray-50 focus:bg-white focus:border-blue-700"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="">
                        {Object.entries(verifyRequest).map(([key]) => (
                            <Link to={`/message/direct/${userUid[key]}`}>
                                <button key={key} className="py-5 flex border-b w-full items-start justify-between cursor-pointer hover:bg-gray-50 hover:text-black">
                                    <div className="flex gap-3">
                                        <img src={avatars[key] || ghostAvatar} className="flex-none w-12 h-12 rounded-full" alt="" />
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
            <div className="w-full">
                <div className="">
                    <Outlet className={""} />
                </div>
                <div className="border p-1.5 rounded-xl w-full mt-4">
                    <form onSubmit={handleMessageSubmit}>
                        <div className="flex items-center px-3 py-2 rounded-lg bg-gray-100 border">
                            {/* <button type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                                </svg>
                                <span class="sr-only">Add emoji</span>
                            </button> */}

                            <input
                                id="chat"
                                rows="1"
                                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100"
                            >
                                Sent
                                <span className="sr-only">Send message</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MessageIndex;
