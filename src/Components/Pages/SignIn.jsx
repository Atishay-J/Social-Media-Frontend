import { useState } from "react";

const SignIn = () => {
  const [userInput, setUserInput] = useState({ username: "", password: "" });

  const signIn = (e) => {
    e.preventDefault();
    console.log("Signed In", userInput);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={(e) => signIn(e)}>
        <input
          type="text"
          value={userInput.username}
          placeholder="Username or Email"
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
        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
};
export default SignIn;
