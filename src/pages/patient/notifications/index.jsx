import { useEffect, useState } from "react";
import { SamplePatients } from "../../../sampleData/samplePatients";
import { SampleNotifications } from "../../../sampleData/sampleNotification";
import Loader from "../../../Components/loader";
import NotificationTable from "../../../Components/notificationTable";

const itemsToShowAtATime = 5;
const sampleUser = SamplePatients[0]

export default function AllNotifications() {
  const [pateint, setPatient] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsRange, setItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [totalItems, setTotalItems] = useState(0)

  const makePatientDataRequest = () => {
    setTimeout(() => {
      setPatient(sampleUser);
    }, 500);
  };

  const makePateintNotificationRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      const tempNotifications = SampleNotifications.filter(
        (notificationItem) => notificationItem.toId == pateint.id
      );
      setNotifications(
        tempNotifications.slice(itemsRange.start, itemsRange.end + 1)
      );
      setTotalItems(tempNotifications.length); // for now
      setIsLoading(false);
    }, 500);
  };


  useEffect(() => {
    makePatientDataRequest();
  });

  useEffect(() => {
    makePateintNotificationRequest();
  }, [pateint, itemsRange]);

  return (
    <section className="w-full flex flex-col ">
      <p className="text-textColor font-medium my-2 w-full text-center md:text-lg md:my-4 lg:text-xl lg:my-6">
        Notification(s)
      </p>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="px-2 ">
          <NotificationTable
            notifications={notifications}
            itemsRange={itemsRange}
            totalItems={totalItems}
            tableTitle={"Notifications"}
            viewRole="patient"
            setItemsRange={setItemsRange}
          />
        </div>
      )}
    </section>
  );
}
