import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ path, ...props }) => {
  const isUserLoggedIn = false;
  return isUserLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate to="/signin" replace={true} />
  );
};
export default PrivateRoute;
