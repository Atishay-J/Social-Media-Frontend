import "./App.css";
import { useEffect, useState } from "react";
import { Homepage, NotFound, SignIn, SignUp } from "./Components";
import PrivateRoute from "./Components/PrivateRoute";
import { Routes, Route } from "react-router-dom";

import { fetchUserData } from "./features/User/userDataSlice";
import { useSelector, useDispatch } from "react-redux";

const Pogo = () => {
  return <h1>Pogo</h1>;
};

function App() {
  // const { userData, status, error } = useSelector((state) => state.userData);
  // const { isUserLoggedIn } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("Is User Logged IN ", isUserLoggedIn);
  //   console.log("LOcal TOken ", localStorage.getItem("userData"));

  //   if (isUserLoggedIn) {
  //     // console.log("usererr daaata ", userData);
  //     // console.log("STatusss ", status);
  //     // console.log("ERrrrorr ", error);
  //     if (status === "idle") {
  //       dispatch(fetchUserData());
  //     }
  //     // if (error) {
  //     //   console.log("Error Gottted ", error);
  //     // }
  //   }
  // }, [dispatch, isUserLoggedIn, status]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Pogo />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <PrivateRoute path="/home" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
