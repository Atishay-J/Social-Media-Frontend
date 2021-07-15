import { useEffect, useState } from "react";
import { authAxios } from "../../Utils/authAxios";
import BottomNav from "../Navbars/Bottom Navs/BottomNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import NotificationCard from "../Cards/NotificationCard";
import TopNav from "../Navbars/Top Navs/TopNav";
import useSortByTime from "../../hooks/useSortByTime";
import styles from "./notification.module.css";

const NotificationPage = () => {
  const { loggedInUserData, loggedInUserStatus } = useSelector(
    (state) => state.userData
  );
  const [notifications, setNotifications] = useState({
    status: "idle",
    data: "",
  });

  const sortedByTime = useSortByTime(notifications.data);

  const fetchNotifications = async () => {
    setNotifications({
      status: "loading",
      data: "",
    });

    await authAxios
      .post("/notifications", { userId: loggedInUserData._id })
      .then((res) => {
        setNotifications({
          status: "fulfilled",
          data: res.data,
        });
      })
      .catch((err) => console.log("Error while fetching notifications", err));
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
    <>
      <TopNav />
      <div className={styles.notificationPageContainer}>
        {notifications.status === "loading" && <h2>Loading...</h2>}
        {notifications.status === "fulfilled" &&
          (sortedByTime.length ? (
            sortedByTime.map((notification) => (
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
      </div>
      <BottomNav />
    </>
  );
};
export default NotificationPage;
