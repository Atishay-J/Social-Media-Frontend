import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ path, ...props }) => {
  const { isUserLoggedIn } = useSelector((state) => state.auth);

  return isUserLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate to="/signin" replace={true} />
  );
};
export default PrivateRoute;
