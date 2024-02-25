import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, getMessagesFromFirebase, saveMessageToFirebase, usersCollection } from '../../../../firebase/firebase';
import { collection, doc, getDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';

const DirectIndexPage = () => {
    const { userId } = useParams();
    const [username, setUsername] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [meId, setMeId] = useState(null);
    const [meUsername, setMeUsername] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setMeId(user.uid);
                try {
                    const userRef = await getDoc(doc(usersCollection, user.uid));
                    if (userRef.exists()) {
                        const data = userRef.data();
                        setMeUsername(data.fullName);
                    }
                } catch (err) {
                    console.error(err);
                }
            } else {
                setMeId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const fetchRef = doc(db, 'users', userId);
            const fetchDoc = await getDoc(fetchRef);
            if (fetchDoc.exists()) {
                const data = fetchDoc.data();
                setUsername(data.fullName);
                setUserAvatar(data.imageUrl);
            }
    
            const messages = await getMessagesFromFirebase(userId);
            setMessages(messages);
        } catch (err) {
            console.error(err);
        }
    }, [userId]);

    useEffect(() => {
        fetchData();

        const messagesRef = collection(db, `messages/${userId}/messages`);
        const q = query(messagesRef, orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            setMessages(data);
        });

        return () => unsubscribe();
    }, [fetchData, userId]);

    console.log(message);

    const renderMessages = () => {
        const today = new Date().toDateString();
        let lastDate = null;

        return messages.map((msg) => {
            const messageDate = msg.timestamp.toDate();
            const messageDateString = messageDate.toDateString();
            const formattedTime = messageDate.toLocaleTimeString();
            const senderCall = msg.message.sender ? msg.message.sender : "Unknown";
            const sender = senderCall === meUsername ? "you" : meUsername
            const formattedMessage = `${sender}: ${msg.message.message} ${formattedTime}`;

            let dateComponent = null;

            if (messageDateString !== lastDate) {
                if (messageDateString === today) {
                    dateComponent = <p key={messageDateString} className="font-bold text-gray-500">Today</p>;
                } else if (isYesterday(messageDateString)) {
                    dateComponent = <p key={messageDateString} className="font-bold text-gray-500">Yesterday</p>;
                } else {
                    dateComponent = <p key={messageDateString} className="font-bold text-gray-500">{messageDateString}</p>;
                }
                lastDate = messageDateString;
            }
            
            function isYesterday(dateString) {
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                const formattedYesterday = yesterday.toISOString().split('T')[0];
                return dateString === formattedYesterday;
            }

            return (
                <div key={msg.id} className=''>
                    <div className='text-center'>
                        {dateComponent}
                    </div>
                    <p>{formattedMessage}</p>
                </div>
            );
        });
    };

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveMessageToFirebase(userId, { message: message, sender: meUsername });
            setMessage('');
            fetchData(); 
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    

    return (
        <div className='w-full m-4 p-6 border rounded-lg '>
            <div className='flex gap-5 py-4 border-b'>
                <div>
                    <img src={userAvatar} alt={username} className='w-12 h-12 border p-0.5 rounded-full border-blue-600' />
                </div>
                <div>
                    <h1 className='text-2xl font-semibold'>{username}</h1>
                </div>
            </div>
            <div>{renderMessages()}</div>
            <form onSubmit={handleMessageSubmit}>
                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-100 border">
                    <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                        </svg>
                        <span className="sr-only">Add emoji</span>
                    </button>
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
                        className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                    >
                        <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DirectIndexPage;
