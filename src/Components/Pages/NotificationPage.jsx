import { useEffect, useState } from "react";
import { authAxios } from "../../Utils/authAxios";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import NotificationCard from "../Cards/NotificationCard";

const NotificationPage = () => {
  const { loggedInUserData, loggedInUserStatus } = useSelector(
    (state) => state.userData
  );
  const [notifications, setNotifications] = useState("");

  const fetchNotifications = async () => {
    console.log(
      "Usererrr IDDDDD",
      loggedInUserData,
      "Status ",
      loggedInUserStatus
    );

    await authAxios
      .post("/notifications", { userId: loggedInUserData._id })
      .then((res) => {
        console.log("\n\n Notificattionsg \n", res);
        setNotifications(res.data);
      })
      .catch((err) => console.log("\n\n Notificattionsg Errorrr \n", err));
  };

  useEffect(() => {
    if (loggedInUserStatus === "fulfilled") {
      fetchNotifications();
    }
    if (loggedInUserStatus === "error") {
      toast("some Error Occured");
    }
  }, [loggedInUserStatus]);

  return (
    <div className="notificationPageContainer">
      <h1>I am Notification Page</h1>
      {notifications.length ? (
        notifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            sourceUser={notification.sourceUser}
            createdAt={notification.createdAt}
            notificationType={notification.notificationType}
          />
        ))
      ) : (
        <h2>No Notifications</h2>
      )}
      <BottomNav />
    </div>
  );
};
export default NotificationPage;
