import { useEffect, useState } from "react";
import Loader from "../../../Components/loader";
import NotificationTable from "../../../Components/notificationTable";
import { SampleAdmins } from "../../../sampleData/sampleAdmins";
import { SampleNotifications } from "../../../sampleData/sampleNotification";

const sampleAdmin = SampleAdmins[0];
const itemsToShowAtATime = 5;

export default function AdminNotifications() {
  const [admin, setAdmin] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [notifications, setNotifications] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(true);

  const [itemsRange, setItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [totalItems, setTotalItems] = useState(0);

  const makeAdminDataRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAdmin(sampleAdmin);
      setIsLoading(false);
    }, 500);
  };

  const makeAdminNotificationRequest = () => {
    setNotificationLoading(true);
    setTimeout(() => {
      const tempNotifications = SampleNotifications;
      setNotifications(
        tempNotifications.slice(itemsRange.start, itemsRange.end + 1)
      );
      setTotalItems(tempNotifications.length); // for now
      setNotificationLoading(false);
    }, 500);
  };

  useEffect(() => {
    makeAdminDataRequest();
  }, []);

  useEffect(() => {
    makeAdminNotificationRequest();
  }, [admin, itemsRange]);

  return (
    <section className="w-full flex flex-col ">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <p className="text-textColor font-medium my-2 w-full text-center md:text-lg md:my-4 lg:text-xl lg:my-6">
            Notification(s)
          </p>
          {notificationLoading ? (
            <Loader />
          ) : (
            <div className="px-2 ">
              <NotificationTable
                notifications={notifications}
                itemsRange={itemsRange}
                totalItems={totalItems}
                itemsToShowAtATime={itemsToShowAtATime}
                tableTitle={"Notifications"}
                viewRole="admin"
                setItemsRange={setItemsRange}
              />
            </div>
          )}{" "}
        </>
      )}
    </section>
  );
}
