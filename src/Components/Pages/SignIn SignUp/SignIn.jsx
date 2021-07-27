import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./signin.module.css";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { ToastContainer } from "react-toastify";
import { toastDark, toastSuccess } from "../../../Utils/toastMessage";
import PageNavbar from "../Page Navbar/PageNavbar";
import { authAxios } from "../../../Utils/authAxios";

const SignIn = () => {
  const [{ usernameOrEmail, password }, setUserInput] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [showLoader, setShowLoader] = useState(false);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  let guestPassword = process.env.REACT_APP_GUEST_PASSWORD;

  console.log("guest pass", guestPassword);

  const signInUser = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    if ((usernameOrEmail !== "") & (password !== "")) {
      return await authAxios
        .post("/signin", { usernameOrEmail, password })
        .then((res) => {
          setShowLoader(false);
          dispatch(signIn(res.data));
          toastSuccess("Logged In");
          navigate("/home");
        })
        .catch((err) => {
          setShowLoader(false);
          toastDark(err.response.data);
        });
    }
    toastDark("One or more fields are empty");
  };

  const loginGuest = async () => {
    setShowLoader(true);
    await authAxios
      .post("/guestuser")
      .then((res) => {
        setShowLoader(false);
        dispatch(signIn(res.data));
        toastSuccess("Logged In");
        navigate("/home");
      })
      .catch((err) => {
        setShowLoader(false);
        toastDark(err.response.data);
      });
  };

  return (
    <div className={styles.container}>
      <PageNavbar />

      <div className={styles.formWrapper}>
        {showLoader && <h3 className={styles.signInMsg}>signing you in...</h3>}
        <form className={styles.form} onSubmit={(e) => signInUser(e)}>
          <div className={styles.headingWrapper}>
            <h1 className={styles.formHeading}>Sign In</h1>
            <h4 className={styles.skipSignin} onClick={loginGuest}>
              Skip signin
            </h4>
          </div>

          <input
            className={styles.inputs}
            type="text"
            value={usernameOrEmail}
            placeholder="Username or Email"
            onChange={(e) =>
              setUserInput((prevState) => {
                return { ...prevState, usernameOrEmail: e.target.value };
              })
            }
          />
          <div className={`${styles.inputWrapper} ${styles.passwordWrapper}`}>
            <input
              className={styles.inputs}
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
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

          <input className={styles.submitBtn} type="submit" value="Sign In" />
        </form>
        <div className={styles.signOptionWrapper}>
          <h3 className={styles.signOption}>
            Don't have an account?{" "}
            <span
              className={styles.signOptionLink}
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </h3>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};
export default SignIn;
