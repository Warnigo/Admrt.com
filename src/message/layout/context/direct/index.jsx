import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, getMessagesFromFirebase, usersCollection } from '../../../../firebase/firebase';
import { collection, doc, getDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../../../firebase/firebase';

const DirectIndexPage = () => {
    const { userId } = useParams();
    const [username, setUsername] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);
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

        messages.concat(messagesSend)
            .filter(msg => msg !== null)
            .sort((a, b) => a.timestamp - b.timestamp)
            .forEach((msg) => {
                if (msg) {
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
                }
            });

        return renderedMessages;
    };

    return (
        <div className="w-full p-6 border rounded-lg">
            <div className="flex gap-5 py-4 border-b">
                <div>
                    <img src={userAvatar} alt={username} className="w-12 h-12 border p-0.5 rounded-full border-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">{username}</h1>
                </div>
            </div>
            <div>{renderMessages()}</div>
        </div>
    );
};

export default DirectIndexPage;
