import { useState, useEffect } from "react";
import { SampleAppintments } from "../sampleData/sampleAppointments";
import Loader from "./loader";
import Button from "./button";
import { useNavigate, useParams } from "react-router-dom";
import PateintNotFoundPage from "../pages/patient/not-found";
import NotFound from "../pages/not-found";
import { SampleDoctors } from "../sampleData/sampleDoctors";
import DoctorNotFoundPage from "../pages/doctor/not-found";

export default function AppointmentView({ viewRole = "patient" }) {
  const params = useParams();
  const { appointmentId } = params;

  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [appointmentDetailsFound, setAppointmentDetailsFound] = useState(true);
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

  const handleDeleteAppointment = () => {
    // get appointment data
    const tempAppointment = SampleAppintments.find(
      (appointmentItem) => appointmentItem.id == appointmentId
    );

    // update doctor time table
    const tempDoctor = SampleDoctors.find(
      (doctorItem) => doctorItem.id == tempAppointment.doctorId
    );
    const tempDoctorIndex = SampleDoctors.findIndex(
      (doctorItem) => doctorItem == tempDoctor
    );
    tempDoctor.currentAppointments--;
    tempDoctor.appointedHours = tempDoctor.appointedHours.filter(
      (hourItem) =>
        hourItem !=
        tempAppointment.hoursTime - tempDoctor.appointmentHours.start
    );
    SampleDoctors[tempDoctorIndex] = tempDoctor;
    console.log("Temp Doctor: ", tempDoctor);

    // update appointment data
    const tempAppointmentIndex = SampleAppintments.findIndex(
      (appointmentItem) => appointmentItem == tempAppointment
    );
    tempAppointment.status = "deleted";
    tempAppointment.hoursTime = 0;
    SampleAppintments[tempAppointmentIndex] = tempAppointment;
    console.log("Temp appointment: ", tempAppointment);

    navigate("/doctor/appointments");
  };

  useEffect(() => {
    setIsLoading(true);
    makeDataRequest();
  }, [appointmentId]);

  if (!appointmentDetailsFound) {
    switch (viewRole) {
      case "patient":
        return <PateintNotFoundPage />;
      case "doctor":
        return <DoctorNotFoundPage />
      default:
        return <NotFound />;
    }
  }

  //   First we will check whather the page is loading
  //  2nd Wheather the doctor has been found
  // if both condtions satified then we will render main content
  return (
    <section className="w-full flex flex-col items-center">
      {isLoading ? (
        <Loader />
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
                    : appointmentDetails.status == "deleted"
                    ? "bg-red-700 text-white"
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

          <div className="w-full flex justify-between text-left mt-2 lg:mt-4">
            <Button text={"back"} handleOnClick={handleGoBack} />
            {viewRole == "doctor" &&
              appointmentDetails.status !== "deleted" && appointmentDetails.status !== "completed" && (
                <Button
                  text={"delete"}
                  variant="danger"
                  handleOnClick={handleDeleteAppointment}
                />
              )}
          </div>
        </div>
      )}
    </section>
  );
}
