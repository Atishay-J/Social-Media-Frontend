import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import styles from "./signin.module.css";
import TopNav from "../../Navbars/Top Navs/TopNav";

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
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => signUp(e)} method="POST">
        <h1 className={styles.formHeading}>Sign Up</h1>
        <div className={styles.inputWrapper}>
          <input
            className={styles.inputs}
            type="text"
            value={userInput.firstname}
            placeholder="firstname"
            onChange={(e) =>
              setUserInput((prevState) => {
                return { ...prevState, firstname: e.target.value };
              })
            }
          />
          <span className={styles.inputUnderline}></span>{" "}
        </div>

        <div className={styles.inputWrapper}>
          <input
            className={styles.inputs}
            type="text"
            value={userInput.lastname}
            placeholder="lastname"
            onChange={(e) =>
              setUserInput((prevState) => {
                return { ...prevState, lastname: e.target.value };
              })
            }
          />
          <span className={styles.inputUnderline}></span>{" "}
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={styles.inputs}
            type="email"
            value={userInput.email}
            placeholder="email"
            onChange={(e) =>
              setUserInput((prevState) => {
                return { ...prevState, email: e.target.value };
              })
            }
          />
          <span className={styles.inputUnderline}></span>{" "}
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={styles.inputs}
            type="text"
            value={userInput.username}
            placeholder="username"
            onChange={(e) =>
              setUserInput((prevState) => {
                return { ...prevState, username: e.target.value };
              })
            }
          />
          <span className={styles.inputUnderline}></span>{" "}
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={styles.inputs}
            type="password"
            value={userInput.password}
            placeholder="password"
            onChange={(e) =>
              setUserInput((prevState) => {
                return { ...prevState, password: e.target.value };
              })
            }
          />
          <span className={styles.inputUnderline}></span>{" "}
        </div>
        <input type="submit" className={styles.submitBtn} value="Sign Up" />
      </form>
      <ToastContainer />
    </div>
  );
};
export default SignUp;
