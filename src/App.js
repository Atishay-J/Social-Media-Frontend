import "./App.css";
import {
  Homepage,
  NotFound,
  SignIn,
  SignUp,
  ProfilePage,
  SearchPage,
  NotificationPage,
  PostPage,
  IndexPage,
} from "./Components";
import PrivateRoute from "./Components/PrivateRoute";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserData } from "./features/User/userDataSlice";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const { loggedInUserStatus } = useSelector((state) => state.userData);
  const { isUserLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("UserSTatetete", localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      if (loggedInUserStatus === "idle") {
        console.log("FEtched LOGGEDDD IN USER DATA IN THER APPPP");
        dispatch(fetchLoggedInUserData());
      }
    }
  }, [isUserLoggedIn, loggedInUserStatus]);

  // useEffect(() => {
  //   console.log("Tracking Stattusss", status);
  // }, [status]);

  return (
    <div className="App">
      {/* <ToastContainer /> */}
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute path="/home" element={<Homepage />} />
        <PrivateRoute path="/profile/:username" element={<ProfilePage />} />
        <PrivateRoute path="/notifications" element={<NotificationPage />} />
        <PrivateRoute path="/search" element={<SearchPage />} />
        <PrivateRoute path="/posts/:postId" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
