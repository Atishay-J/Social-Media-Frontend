import "./App.css";
import { Homepage, NotFound, SignIn, SignUp } from "./Components";
import PrivateRoute from "./Components/PrivateRoute";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <PrivateRoute path="/signup" element={<SignUp />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
