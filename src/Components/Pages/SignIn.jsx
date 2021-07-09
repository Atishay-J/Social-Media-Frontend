import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [userInput, setUserInput] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const signInUser = (e) => {
    e.preventDefault();
    console.log("Signed In", userInput);

    console.log("Signed In State", authState);

    axios
      .post("http://localhost:8000/signin", userInput)
      .then((res) => {
        console.log("SignIn response from sever ", res.data);
        dispatch(signIn(res.data));
        navigate("/home");
      })
      .catch((err) => console.log("Error while signin ", err));
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={(e) => signInUser(e)}>
        <input
          type="text"
          value={userInput.usernameOrEmail}
          placeholder="Username or Email"
          onChange={(e) =>
            setUserInput((prevState) => {
              return { ...prevState, usernameOrEmail: e.target.value };
            })
          }
        />
        <input
          type="password"
          value={userInput.password}
          placeholder="Password"
          onChange={(e) =>
            setUserInput((prevState) => {
              return { ...prevState, password: e.target.value };
            })
          }
        />
        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
};
export default SignIn;
