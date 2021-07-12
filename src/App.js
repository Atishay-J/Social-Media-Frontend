import "./App.css";
import {
  Homepage,
  NotFound,
  SignIn,
  SignUp,
  ProfilePage,
  SearchPage,
  NotificationPage,
} from "./Components";
import PrivateRoute from "./Components/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserData } from "./features/User/userDataSlice";

const Pogo = () => {
  return <h1>Pogo</h1>;
};

function App() {
  const { loggedInUserStatus } = useSelector((state) => state.userData);
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserLoggedIn && localStorage.getItem("userData")) {
      if (loggedInUserStatus === "idle") {
        dispatch(fetchLoggedInUserData());
      }
    }
  }, [dispatch, isUserLoggedIn, loggedInUserStatus]);

  // useEffect(() => {
  //   console.log("Tracking Stattusss", status);
  // }, [status]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pogo />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute path="/home" element={<Homepage />} />
        <PrivateRoute path="/profile/:username" element={<ProfilePage />} />
        <PrivateRoute path="/notifications" element={<NotificationPage />} />
        <PrivateRoute path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
