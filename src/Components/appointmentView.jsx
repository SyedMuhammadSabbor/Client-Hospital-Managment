import { useState, useEffect } from "react";
import { SampleAppintments } from "../sampleData/sampleAppointments";
import Loader from "./loader";
import Button from "./button";
import { useNavigate, useParams } from "react-router-dom";
import { SampleDoctors } from "../sampleData/sampleDoctors";
import { sendNotification } from "./utils/sendNotification";
import NotFoundPage from "../pages/not-found";

export default function AppointmentView({ viewRole = "patient" }) {
  const params = useParams();
  const { appointmentId } = params;

  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [appointmentDetailsFound, setAppointmentDetailsFound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentTimePassed, setAppointmentTimePassed] = useState(false);

  const [appointmentPostDetails, setAppointmentPostDetails] = useState("");

  const navigate = useNavigate();

  const makeDataRequest = () => {
    setTimeout(() => {
      const temp = SampleAppintments.find((e) => e.id == appointmentId);
      if (!temp) {
        setIsLoading(false);
        setAppointmentDetailsFound(false);
        return;
      }
      const tempIndex = SampleAppintments.findIndex((e) => e.id == temp.id);

      // check wether apppointment time has passed or not
      if (!temp.timePassed) {
        const appointmentDayDate = temp.dated;
        const appointmentDayHours = temp.hoursTime;
        const currentDayDate = Date.now();
        const currentDayHours = new Date(currentDayDate).getUTCHours();
        // checking for time passed for appointment
        if (
          currentDayDate >= appointmentDayDate &&
          currentDayHours >= appointmentDayHours
        ) {
          temp.timePassed = true;
          setAppointmentTimePassed(true);

          // checking if the status is pending after time has passed, so change it to deleted
          if (temp.status == "pending") {
            temp.status = "deleted";
          }

          // updating appointment data
          SampleAppintments[tempIndex] = temp;
        }
      } else {
        setAppointmentTimePassed(true);
      }

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

    // update appointment data
    const tempAppointmentIndex = SampleAppintments.findIndex(
      (appointmentItem) => appointmentItem == tempAppointment
    );
    tempAppointment.status = "deleted";
    tempAppointment.hoursTime = 0;
    SampleAppintments[tempAppointmentIndex] = tempAppointment;

    // create a notification of deletion of appointment
    const message =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    sendNotification(
      appointmentDetails.doctorId,
      appointmentDetails.patientId,
      viewRole,
      "deletion of appointmet",
      message
    );

    navigate(-1);
  };

  const handleApproveAppointment = () => {
    const tempAppointment = SampleAppintments.find(
      (appointmentItem) => appointmentItem.id == appointmentId
    );
    const tempAppointmentIndex = SampleAppintments.findIndex(
      (appointmentItem) => appointmentItem == tempAppointment
    );
    tempAppointment.status = "scheduled";
    SampleAppintments[tempAppointmentIndex] = tempAppointment;

    // create a notification of approval
    const message =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    sendNotification(
      appointmentDetails.doctorId,
      appointmentDetails.patientId,
      viewRole,
      "approval of appointmet",
      message
    );

    navigate(-1);
  };

  const handleChangePostAppointmentDetails = (e) => {
    setAppointmentPostDetails(e.target.value);
  };

  const handleSubmitPostAppointmentDetails = (e) => {
    e.preventDefault();
    const tempAppointment = SampleAppintments.find(
      (appointmentItem) => appointmentItem.id == appointmentId
    );
    const tempAppointmentIndex = SampleAppintments.findIndex(
      (appointmentItem) => appointmentItem == tempAppointment
    );
    tempAppointment.status = "completed";
    tempAppointment.details.postDetailsWritten = true;
    tempAppointment.details.post = appointmentPostDetails;
    SampleAppintments[tempAppointmentIndex] = tempAppointment;

    // create a notification of appointment post details
    const message =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    sendNotification(
      appointmentDetails.doctorId,
      appointmentDetails.patientId,
      viewRole,
      "appointment approve",
      message
    );

    // for now we are navigating back, but will refresh the page using (0)
    navigate(-1);
  };

  useEffect(() => {
    setIsLoading(true);
    makeDataRequest();
  }, [appointmentId]);

  if (!appointmentDetailsFound) {
    switch (viewRole) {
      case "patient":
        return <NotFoundPage redirectTo="/patient" />;
      case "doctor":
        return <NotFoundPage redirectTo="/doctor" />;
      case "admin":
        return <NotFoundPage redirectTo="/admin" />;
      default:
        return <NotFoundPage redirectTo="/" />;
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

              {appointmentDetails.details.postDetailsWritten ? (
                appointmentDetails.details.post
              ) : !appointmentTimePassed ? (
                appointmentDetails.status == "deleted" ? (
                  <p>
                    Appointment cancelled as time has passed before approving
                    appointment
                  </p>
                ) : (
                  <p>Please wait for appointment time</p>
                )
              ) : (
                <form onSubmit={handleSubmitPostAppointmentDetails}>
                  <label htmlFor="pre-details">
                    <span className="text-sm text-textColor">
                      Discuss post Details
                    </span>
                    <textarea
                      className="w-full bg-white  text-black my-1 p-1 border-designColor2 border rounded focus:outline-none focus:border-textColor"
                      id="pre-details"
                      name="pre-details"
                      type="text"
                      placeholder="Name"
                      value={appointmentPostDetails}
                      onChange={handleChangePostAppointmentDetails}
                    />
                  </label>
                  <div className="w-full text-right">
                    <Button type="submit" text={"save"} />
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="w-full flex justify-between text-left mt-2 lg:mt-4">
            <Button text={"back"} handleOnClick={handleGoBack} />
            {(viewRole == "doctor" || viewRole == "admin") &&
              appointmentDetails.status !== "deleted" &&
              appointmentDetails.status !== "completed" && (
                <div className="flex space-x-1">
                  <Button
                    text={"approve"}
                    handleOnClick={handleApproveAppointment}
                  />
                  <Button
                    text={"delete"}
                    variant="danger"
                    handleOnClick={handleDeleteAppointment}
                  />
                </div>
              )}
          </div>
        </div>
      )}
    </section>
  );
}
