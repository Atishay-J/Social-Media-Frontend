import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userInput, setUserInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    console.log("Signed Up", userInput);
    axios
      .post("http://localhost:8000/signup", userInput)
      .then((res) => {
        console.log("Response from sever ", res);
        toast("Account Created");
        navigate("/signin");
      })
      .catch((err) => {
        console.log("Error from server ", err.response);
        toast(err.response.data);
      });
  };

  return (
    <div>
      <h1>Sign Upp....</h1>

      <form onSubmit={(e) => signUp(e)} method="POST">
        <input
          type="text"
          value={userInput.firstname}
          placeholder="First Name"
          onChange={(e) =>
            setUserInput((prevState) => {
              return { ...prevState, firstname: e.target.value };
            })
          }
        />
        <input
          type="text"
          value={userInput.lastname}
          placeholder="Last Name"
          onChange={(e) =>
            setUserInput((prevState) => {
              return { ...prevState, lastname: e.target.value };
            })
          }
        />
        <input
          type="email"
          value={userInput.email}
          placeholder="Email"
          onChange={(e) =>
            setUserInput((prevState) => {
              return { ...prevState, email: e.target.value };
            })
          }
        />
        <input
          type="text"
          value={userInput.username}
          placeholder="Username"
          onChange={(e) =>
            setUserInput((prevState) => {
              return { ...prevState, username: e.target.value };
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
        <input type="submit" value="Sign Up" />
      </form>
      <ToastContainer />
    </div>
  );
};
export default SignUp;
