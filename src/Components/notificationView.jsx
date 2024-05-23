import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./button";
import Loader from "./loader";
import { SampleNotifications } from "../sampleData/sampleNotification";
import NotFound from "../pages/not-found";
import PateintNotFoundPage from "../pages/patient/not-found";
import DoctorNotFoundPage from "../pages/doctor/not-found";
import AdminNotFoundPage from "../pages/admin/not-found";

export default function NotificationView({ viewRole = "patient" }) {
  const params = useParams();
  const { notificationId } = params;

  const [notificationDetails, setNotificationDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [notificationFound, setNotificationFound] = useState(true);

  const navigate = useNavigate();

  const makeDataRequest = () => {
    setTimeout(() => {
      const temp = SampleNotifications.find((e) => e.id == notificationId);
      if (!temp) {
        setIsLoading(false);
        setNotificationFound(false);
      }
      //   console.log("temp: ", temp);
      const tempIndex = SampleNotifications.findIndex((e) => e.id == temp.id);
      switch (viewRole) {
        case "patient":
          temp.viewedBy.patient = true;
          break;
        case "doctor":
          temp.viewedBy.doctor = true;
          break;
        case "admin":
          temp.viewedBy.admin = true;
          break;
        default:
          break;
      }

      SampleNotifications[tempIndex] = temp;
      setNotificationDetails(temp);
      setIsLoading(false);
      setNotificationFound(true);
    }, 1000);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setIsLoading(true);
    if (notificationId == null) {
      console.log("id is null");
      return;
    }
    makeDataRequest();
  }, [notificationId]);

  if (!notificationFound) {
    switch (viewRole) {
      case "patient":
        return <PateintNotFoundPage />;
      case "doctor":
        return <DoctorNotFoundPage />;
      case "admin":
        return <AdminNotFoundPage />;
      default:
        return <NotFound />;
    }
  }

  return (
    <section className="w-full flex flex-col items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen flex flex-col justify-between p-8 sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]">
          <div className="w-full text-center bg-primary py-4">
            <h3 className="font-semibold lg:text-lg">Notification Details</h3>
          </div>
          <div className="pt-4">
            <p className="text-sm">
              Title:{" "}
              <span className="font-medium">{notificationDetails.title}</span>
            </p>
            <p className="text-sm">
              From:{" "}
              <span className="font-medium">{notificationDetails.from}</span>
            </p>
            <p className="text-sm">
              Dated:{" "}
              <span className="font-medium">
                {new Date(notificationDetails.dated).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  }
                )}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-medium">Message:</span>{" "}
              {notificationDetails.message}
            </p>
            <p className="text-sm w-full text-right">
              Regards:{" "}
              <span className="font-medium">{notificationDetails.from}</span>
            </p>
          </div>
          <div className="w-full text-left mt-2 lg:mt-4">
            <Button text={"back"} handleOnClick={handleGoBack} />
          </div>
        </div>
      )}
    </section>
  );
}
