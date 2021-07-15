import { useState } from "react";
import { authAxios } from "../../../Utils/authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import styles from "./signin.module.css";
import PageNavbar from "../Page Navbar/PageNavbar";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { toastDark, toastSuccess } from "../../../Utils/toastMessage";

const SignUp = () => {
  const [{ firstname, lastname, email, username, password }, setUserInput] =
    useState({
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
    });

  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    if (
      (firstname !== "") &
      (lastname !== "") &
      (email !== "") &
      (username !== "") &
      (password !== "")
    ) {
      return await authAxios
        .post("/signup", {
          firstname,
          lastname,
          email,
          username,
          password,
        })
        .then((res) => {
          setShowLoader(false);
          toastSuccess("Account Created");
          navigate("/signin");
        })
        .catch((err) => {
          setShowLoader(false);
          toastDark(err.response.data);
        });
    }
    toastDark("One or more fields are empty");
  };

  return (
    <div className={styles.container}>
      <PageNavbar />

      <div className={styles.formWrapper}>
        {showLoader && <h3 className={styles.signInMsg}>signing you up...</h3>}
        <form className={styles.form} onSubmit={(e) => signUp(e)}>
          <h1 className={styles.formHeading}>Sign Up</h1>
          <div className={styles.inputWrapper}>
            <input
              className={styles.inputs}
              type="text"
              value={firstname}
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
              value={lastname}
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
              value={email}
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
              value={username}
              placeholder="username"
              onChange={(e) =>
                setUserInput((prevState) => {
                  return { ...prevState, username: e.target.value };
                })
              }
            />
            <span className={styles.inputUnderline}></span>{" "}
          </div>
          <div className={`${styles.inputWrapper} ${styles.passwordWrapper}`}>
            <input
              className={styles.inputs}
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="password"
              onChange={(e) =>
                setUserInput((prevState) => {
                  return { ...prevState, password: e.target.value };
                })
              }
            />
            <div
              className={styles.passwordBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlash className={styles.passwordIcon} />
              ) : (
                <Eye className={styles.passwordIcon} />
              )}
            </div>
          </div>
          <input type="submit" className={styles.submitBtn} value="Sign Up" />
        </form>
        <div className={styles.signOptionWrapper}>
          <h3 className={styles.signOption}>
            Already have an account?{" "}
            <span
              className={styles.signOptionLink}
              onClick={() => navigate("/signin")}
            >
              Signin
            </span>
          </h3>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
export default SignUp;
