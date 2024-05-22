import { useState, useEffect } from "react";
import { SampleAppintments } from "../sampleData/sampleAppointments";
import Loader from "../../../Components/loader";
import Button from "../../../Components/button";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../not-found";

export default function AppointmentView() {
  const params = useParams();
  const { appointmentId } = params;

  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [appointmentDetailsFound, setAppointmentDetailsFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const makeDataRequest = () => {
    setTimeout(() => {
      const temp = SampleAppintments.find((e) => e.id == appointmentId);
      if (!temp) {
        setIsLoading(false);
        setAppointmentDetailsFound(false);
        return;
      }
      //   console.log("temp: ", temp);
      const tempIndex = SampleAppintments.findIndex((e) => e.id == temp.id);
      SampleAppintments[tempIndex].viewed = true;

      setAppointmentDetails(temp);
      setIsLoading(false);
      setAppointmentDetailsFound(true);
    }, 500);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setIsLoading(true);
    makeDataRequest();
  }, [appointmentId]);

  //   First we will check whather the page is loading
  //  2nd Wheather the doctor has been found
  // if both condtions satified then we will render main content
  return (
    <section className="w-full flex flex-col items-center">
      {isLoading ? (
        <Loader />
      ) : !appointmentDetailsFound ? (
        <NotFound />
      ) : (
        <div className="w-full p-2 sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]">
          <div className="w-full text-center bg-primary py-4">
            <h3 className="font-semibold lg:text-lg">Appointment Details</h3>
          </div>

          <div className="w-full flex justify-between py-4">
            <div className="text-sm lg:text-base">
              <p>
                Patient Name:{" "}
                <span className="font-semibold">
                  {appointmentDetails.patientName}
                </span>
              </p>
              <p>
                Doctor Name:{" "}
                <span className="font-semibold">
                  {appointmentDetails.doctorName}
                </span>
              </p>
              <p>
                Scheduled:{" "}
                <span className="font-semibold">
                  {appointmentDetails.hoursTime > 12
                    ? `${appointmentDetails.hoursTime % 12} PM`
                    : `${appointmentDetails.hoursTime} AM`}{" "}
                  -{" "}
                  {new Date(appointmentDetails.dated).toLocaleString("en-US", {
                    year: "2-digit",
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              </p>
            </div>
            <div className="flex flex-col justify-between items-center">
              <p>Status</p>{" "}
              <span
                className={`${
                  appointmentDetails.status == "scheduled"
                    ? "bg-green-700 text-white"
                    : appointmentDetails.status == "pending"
                    ? "bg-designColor2 text-white"
                    : "bg-designColor1 text-black"
                } w-min mx-1 px-1 rounded capitalize`}
              >
                {appointmentDetails.status}
              </span>
            </div>
          </div>

          <div className="text-sm lg:text-base">
            <div className="py-2 md:py-4">
              <p className="w-full text-left border-b border-designColor2 text-textColor font-semibold my-2">
                Pre Details:{" "}
              </p>
              <p>
                {appointmentDetails.details.pre == ""
                  ? "No pre appointment Details."
                  : appointmentDetails.details.pre}
              </p>
            </div>

            <div className="py-2 md:py-4">
              <p className="w-full text-left border-b border-designColor2 text-textColor font-semibold my-2">
                Post Details:{" "}
              </p>
              <p>
                {appointmentDetails.details.post == ""
                  ? "No post appointment Details."
                  : appointmentDetails.details.post}
              </p>
            </div>
          </div>

          <div className="w-full text-left mt-2 lg:mt-4">
            <Button text={"back"} handleOnClick={handleGoBack} />
          </div>
        </div>
      )}
    </section>
  );
}
