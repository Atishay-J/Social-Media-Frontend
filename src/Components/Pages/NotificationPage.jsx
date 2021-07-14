import { useEffect, useState } from "react";
import { authAxios } from "../../Utils/authAxios";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import NotificationCard from "../Cards/NotificationCard";
import TopNav from "../Navbars/Top Navs/TopNav";
import useSortByTime from "../../hooks/useSortByTime";

const NotificationPage = () => {
  const { loggedInUserData, loggedInUserStatus } = useSelector(
    (state) => state.userData
  );
  const [notifications, setNotifications] = useState({
    status: "idle",
    data: "",
  });

  const fetchNotifications = async () => {
    console.log(
      "Usererrr IDDDDD",
      loggedInUserData,
      "Status ",
      loggedInUserStatus
    );

    setNotifications({
      status: "loading",
      data: "",
    });

    await authAxios
      .post("/notifications", { userId: loggedInUserData._id })
      .then((res) => {
        console.log("\n\n Notificattionsg \n", res);

        setNotifications({
          status: "fulfilled",
          data: res.data,
        });
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
      <TopNav />
      {notifications.status === "loading" && <h2>Loading...</h2>}
      {notifications.status === "fulfilled" &&
        (notifications.data.length ? (
          notifications.data.map((notification) => (
            <NotificationCard
              key={notification._id}
              sourceUser={notification.sourceUser}
              createdAt={notification.createdAt}
              notificationType={notification.notificationType}
            />
          ))
        ) : (
          <h2>No Notifications</h2>
        ))}
      <BottomNav />
    </div>
  );
};
export default NotificationPage;
