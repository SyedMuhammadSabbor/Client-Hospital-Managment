import { useEffect, useState } from "react";
import Loader from "../../../Components/loader";
import NotificationTable from "../../../Components/notificationTable";
import { SampleDoctors } from "../../../sampleData/sampleDoctors";
import { SampleNotifications } from "../../../sampleData/sampleNotification";

const sampleDoctor = SampleDoctors[0];
const itemsToShowAtATime = 5;

export default function DoctorNotifications() {
  const [doctor, setDoctor] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsRange, setItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [totalItems, setTotalItems] = useState(0);

  const makePatientDataRequest = () => {
    setTimeout(() => {
        setDoctor(sampleDoctor);
    }, 500);
  };

  const makePateintNotificationRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      const tempNotifications = SampleNotifications.filter(
        (notificationItem) => notificationItem.doctorId == doctor.id
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
  }, [doctor, itemsRange]);

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
            viewRole="doctor"
            setItemsRange={setItemsRange}
          />
        </div>
      )}
    </section>
  );
}
