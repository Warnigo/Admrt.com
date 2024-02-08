import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Layout/AuthPage/Login";
import Register from "./Layout/AuthPage/Register";
import Continue from "./Layout/AuthPage/Continue";
import CreateAnAcc from "./Layout/AuthPage/CreateAnAcc";
import ConfirmPassword from "./Layout/AuthPage/ConfirmPassword";
import CheckEmail from "./Layout/AuthPage/CheckEmail";
import ForgotPassword from "./Layout/AuthPage/ForgotPassword";
import Main from "./components/Main";
import './App.css'
import About from "./components/About";
import Contact from "./components/Contact";
import Billings from "./components/Settings/Billings/Billings";
import Profile from "./Layout/AuthPage/Profile";
import { auth, usersCollection } from "./firebase/firebase";
import { NotFound } from "./404/404";
import Settings from "./components/Settings/DateBirthday/Settings";
import Home from "./components/Home";
import ViewsProfile from "./viewsProfile/viewsProfile";
import Loading from "./loading/loading";
import { doc, getDoc } from "firebase/firestore";
import MessageIndex from "./message";
import EmptyMessage from "./message/layout/empty";

function App() {
    const [userId, setUserId] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [split, setSplit] = useState();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserId(user.uid);
                handleSuccess();
                try {
                    const userDoc = await getDoc(doc(usersCollection, user.uid));
                    if (userDoc.exists()) {
                      const userData = userDoc.data();
                      const splitCall = userData.split
                      setSplit(splitCall)
                    }
                  } catch (error) {
                    console.error('Error getting user data:', error);
                  }
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRegister = () => {
        setAuthenticated(true);
    };

    const handleSuccess = () => {
        handleRegister();
    };

    useEffect(() => {
        const delay = 1500;
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [loading]);

    const handleUserSelect = (selectedUserUID) => {
        console.log("Selected User UID:", selectedUserUID);
    };

    const AuthUserRoutes = [
        { id: 1, path: "/about", element: <About /> },
        { id: 2, path: "/contact", element: <Contact /> },
        { id: 3, path: `/t=split${split}/${userId}`, element: <Profile /> },
        { id: 4, path: `/t=split${split}/${userId}/settings`, element: <Settings /> },
        // { id: 5, path: `/t=split${split}/${userId}/qwerty`, element: <Billings /> },
        { id: 6, path: `/p=profileut/:split/:userUID`, element: <ViewsProfile onUserUID={handleUserSelect} /> },
        { id: 0, path: "*", element: <NotFound /> },
    ];

    const GhostUser = [
        { id: 1, path: "/login", element: <Login /> },
        { id: 2, path: "/register", element: <Register authenticated={handleRegister} /> },
        { id: 3, path: "/continue", element: <Continue /> },
        { id: 4, path: "/:split/registasion", element: <CreateAnAcc /> },
        { id: 5, path: "/forgotPassword", element: <ForgotPassword /> },
        { id: 6, path: "/confirmPassword", element: <ConfirmPassword /> },
        { id: 7, path: "/checkEmail", element: <CheckEmail /> },
        { id: 8, path: "/congratulation", element: <CreateAnAcc /> },
        { id: 9, path: "*", element: <NotFound /> },
    ];

    const currentPath = window.location.pathname;
    useEffect(() => {
        if (currentPath !== "/") {
            setLoading(true);
        }
    }, [currentPath]);

    return (
        <div>
            {loading && <Loading />}
            <Routes>
                <Route
                    path="/"
                    element={<Main authenticated={authenticated} onUserSelect={handleUserSelect} />}
                >
                    <Route index element={<Home />} />
                    {AuthUserRoutes.map((route) => (
                        <Route key={route.id} path={route.path} element={route.element} />
                    ))}
                    <Route path={`/m=split${split}/message`} element={<MessageIndex />}>
                        <Route index element={<EmptyMessage />} />
                    </Route>
                </Route>
                {GhostUser.map((route) => (
                    <Route key={route.id} path={route.path} element={route.element} />
                ))}
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </div>
    );
}

export default App;
