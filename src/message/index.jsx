import { useEffect, useState } from "react";
import { auth, usersCollection } from '../firebase/firebase'
import { doc, getDoc } from "firebase/firestore";

const MessageIndex = () => {
    const avatar = "https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [usernames, setUsernames] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserId(user.uid);

                try {
                    const userRef = doc(usersCollection, user.uid);
                    const userDoc = await getDoc(userRef);
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setUsername(data.fullName);
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                setUserId('')
            }
        })

        return () => unsubscribe()
    }, [userId])

    return (
        <div className="max-w-96 border-r px-6" >
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
                <li className="py-5 flex items-start justify-between">
                    <div className="flex gap-3">
                        <img src={avatar} className="flex-none w-12 h-12 rounded-full" alt="" />
                        <div>
                            <span className="block text-sm text-gray-700 font-semibold">{ }</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div >
    )
}

export default MessageIndex;