import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [userInput, setUserInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });

  const signUp = (e) => {
    e.preventDefault();
    console.log("Signed In", userInput);
    axios
      .post("http://localhost:8000/signup", userInput)
      .then((res) => console.log("Response from sever ", res))
      .catch((err) => console.log("Error from server ", err));
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
    </div>
  );
};
export default SignUp;
