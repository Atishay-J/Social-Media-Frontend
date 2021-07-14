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

  const [errorMsg, setErrorMsg] = useState();

  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const signInUser = async (e) => {
    e.preventDefault();

    if ((usernameOrEmail !== "") & (password !== "")) {
      return await authAxios
        .post("/signin", { usernameOrEmail, password })
        .then((res) => {
          console.log("SignIn response from sever ", res.data);
          dispatch(signIn(res.data));
          toastSuccess("Account Created");
          navigate("/home");
        })
        .catch((err) => {
          console.log("Error while signin ", err);
          toastDark(err.response.data);
          // setErrorMsg({ err });
        });
    }
    toastDark("One or more fields are empty");
  };

  return (
    <div className={styles.container}>
      <PageNavbar />
      <div className={styles.formWrapper}>
        {errorMsg && <h3>{errorMsg}</h3>}
        <form className={styles.form} onSubmit={(e) => signInUser(e)}>
          <h1 className={styles.formHeading}>Sign In</h1>
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
