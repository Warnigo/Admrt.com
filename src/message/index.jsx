import { useCallback, useEffect, useState } from "react";
import { auth, db, usersCollection } from '../firebase/firebase'
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const MessageIndex = () => {
    const ghostAvatar = 'https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'
    const [userId, setUserId] = useState('');
    const [verifyRequest, setVerifyRequest] = useState({});
    const [avatars, setAvatars] = useState({});

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserId(user.uid);
                try {
                    const userRef = doc(usersCollection, user.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        const requestCall = Object.fromEntries(Object.entries(data.requests)
                            .filter(([key, value]) => value === true)
                        );
                        setVerifyRequest(requestCall);
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                setUserId('');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleFetch = useCallback(async () => {
        try {
            const fetchedAvatars = {};
            await Promise.all(Object.keys(verifyRequest).map(async (key) => {
                const userRef = doc(db, "search", key);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    fetchedAvatars[key] = data.imageUrl;
                }
            }));
            setAvatars(fetchedAvatars);
        } catch (err) {
            console.error(err);
        }
    }, [verifyRequest]);

    useEffect(() => {
        handleFetch();
    }, [handleFetch]);

    return (
        <div className="fixed z-40 w-full border-r h-full bg-white space-y-8 overflow-auto sm:w-96">
            <div className="max-w-96 px-6">
                <div className="items-start border-b justify-between sm:flex">
                    <div>
                        <h4 className="text-gray-800 text-2xl font-semibold">Message</h4>
                        <p className="mt-0 mb-2 text-gray-600 text-base sm:text-sm">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
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
                <ul className="divide-y">
                    {Object.entries(verifyRequest).map(([key]) => (
                        <li key={key} className="py-5 flex items-start justify-between cursor-pointer hover:bg-gray-50 hover:text-black">
                            <Link to={`/message`}>
                                <div className="flex gap-3">
                                    <img src={avatars[key] || ghostAvatar} className="flex-none w-12 h-12 rounded-full" alt="" />
                                    <div className="m-auto">
                                        <span className="block text-sm text-gray-700 font-semibold">{key}</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}

export default MessageIndex;
