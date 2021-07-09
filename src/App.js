import "./App.css";
import { Homepage, NotFound, SignIn, SignUp } from "./Components";
import PrivateRoute from "./Components/PrivateRoute";
import { Routes, Route } from "react-router-dom";

const Pogo = () => {
  return <h1>Pogo</h1>;
};

function App() {
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
