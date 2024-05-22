import { useState, useEffect } from "react";
import Button from "../../../Components/button";
import Loader from "../../../Components/loader";
import { SampleNotifications } from "../sampleData/sampleNotification";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../not-found";

export default function NotificationView() {
  const params = useParams();
  const { notificationId } = params;

  const [notificationDetails, setNotificationDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [notificationFound, setNotificationFound] = useState(false);

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
      SampleNotifications[tempIndex].viewed = true;

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

  return (
    <section className="w-full flex flex-col items-center">
      {isLoading ? (
        <Loader />
      ) : !notificationFound ? (
        <NotFound />
      ) : (
        <div className="w-full min-h-screen flex flex-col justify-between p-8 sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]">
          <div className="w-full text-center bg-primary py-4">
            <h3 className="font-semibold lg:text-lg">Notification Details</h3>
          </div>
          <div className="pt-4">
            <p className="text-sm">
              Title:{" "}
              <span className="font-medium">{notificationDetails.name}</span>
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
