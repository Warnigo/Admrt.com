import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, saveMessageToFirebase, getMessagesFromFirebase, usersCollection } from '../../../../firebase/firebase';
import { collection, doc, getDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';

const DirectIndexPage = () => {
    const { userId } = useParams();
    const [username, setUsername] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [meId, setMeId] = useState(null);
    const [meUsername, setMeUsername] = useState(null);
    const [messagesSend, setMessagesSend] = useState(null)

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchRef = doc(db, 'users', userId);
                const fetchDoc = await getDoc(fetchRef);
                if (fetchDoc.exists()) {
                    const data = fetchDoc.data();
                    setUsername(data.fullName);
                    setUserAvatar(data.imageUrl);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();

        const fetchMessages = async () => {
            try {
                const messagesFromMe = await getMessagesFromFirebase(meId, userId);
                setMessages(messagesFromMe);
                const messagesToMe = await getMessagesFromFirebase(userId, meId);
                setMessagesSend(messagesToMe);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMessages();

        const messagesRef = collection(db, `messages/${meId}/${userId}`);
        const messagesQuery = query(messagesRef, orderBy('timestamp'));
        const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            setMessages(data);
        });

        const messagesSendRef = collection(db, `messages/${userId}/${meId}`);
        const messagesSendQuery = query(messagesSendRef, orderBy('timestamp'));
        const unsubscribeMessagesSend = onSnapshot(messagesSendQuery, (snapshot) => {
            const data = [];
            snapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            setMessagesSend(data);
        });

        return () => {
            unsubscribeMessages();
            unsubscribeMessagesSend();
        };
    }, [userId, meId]);

    const isYesterday = (dateString) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const formattedYesterday = yesterday.toISOString().split('T')[0];
        return dateString === formattedYesterday;
    };

    const renderMessages = () => {
        const today = new Date().toDateString();
        let lastDate = null;
        let renderedMessages = [];
    
        messages.concat(messagesSend).sort((a, b) => a.timestamp - b.timestamp).forEach((msg) => {
            const messageDate = msg.timestamp.toDate();
            const messageDateString = messageDate.toDateString();
            const formattedTime = messageDate.toLocaleTimeString();
            const sender = msg.message.sender === meUsername ? 'You' : username;
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
    
            renderedMessages.push(
                <div key={msg.id} className={msg.position === 'top' ? 'top-message' : 'bottom-message'}>
                    <div className="text-center">
                        {dateComponent}
                    </div>
                    <p>{formattedMessage}</p>
                </div>
            );
        });
    
        return renderedMessages;
    };
    

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveMessageToFirebase(meId, userId, { message, sender: meUsername });
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="w-full m-4 p-6 border rounded-lg">
            <div className="flex gap-5 py-4 border-b">
                <div>
                    <img src={userAvatar} alt={username} className="w-12 h-12 border p-0.5 rounded-full border-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">{username}</h1>
                </div>
            </div>
            <div>{renderMessages()}</div>
            <form onSubmit={handleMessageSubmit}>
                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-100 border">
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
