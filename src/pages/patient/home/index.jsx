import { useEffect, useState } from "react";
import { SampleUser } from "../sampleData/sampleUser";
import Loader from "../../../Components/loader";
import { SampleAppintments } from "../sampleData/sampleAppointments";
import AppointmentTable from "../Components/appointmentsTable";

export default function Home() {
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [scheduledAppointments, setScheduledAppointmnts] = useState([]);
  const [scheduledAppointmentsLoading, setScheduledAppointmntsLoading] =
    useState(true);

  const makeDataRequest = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setUserDetails(SampleUser);
      setIsLoading(false);
    }, 500);
  };

  const makeScheduledAppointmentsRequest = async () => {
    setScheduledAppointmntsLoading(true);
    setTimeout(() => {
      const tempAppointments = SampleAppintments.filter(
        (appointment) => appointment.status == "scheduled"
      );
      if (!tempAppointments) {
        setScheduledAppointmntsLoading(false);
        return;
      }
      setScheduledAppointmnts(tempAppointments);
      setScheduledAppointmntsLoading(false);
    }, 500);
  };

  useEffect(() => {
    makeDataRequest();
    makeScheduledAppointmentsRequest();
  }, []);
  return (
    <section className="w-full flex flex-col items-center ">
      <p className="text-textColor font-medium my-2 w-full text-center md:text-lg md:my-4 lg:text-xl lg:my-6">
        Welcome to Patient Dashboard
      </p>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-2 sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]">
          <div className="flex flex-col px-2 text-xs sm:text-sm md:text-base">
            <div className="py-2">
              <p className="w-full text-left border-b border-designColor2 text-textColor font-semibold my-2">
                Personal details:{" "}
              </p>

              <h2>
                Name: <span className="font-semibold">{userDetails.name}</span>
              </h2>
              <h2>
                Email:{" "}
                <span className="font-semibold">{userDetails.email}</span>
              </h2>
              <h2>
                Gender:{" "}
                <span className="font-semibold capitalize">
                  {userDetails.gender}
                </span>
              </h2>
              <h2>
                Age: <span className="font-semibold">{userDetails.age}</span>
              </h2>
              <h2 className="my-1">
                {" "}
                Status:
                <span
                  className={`${
                    userDetails.currentlyAdmitted
                      ? "bg-green-700 text-white"
                      : "bg-designColor1 text-black"
                  } w-min mx-1 px-1 rounded text-xs`}
                >
                  {userDetails.currentlyAdmitted ? "Admitted" : "Discharged"}
                </span>
              </h2>
            </div>

            <div className="py-2 md:py-4">
              <p className="w-full text-left border-b border-designColor2 text-textColor font-semibold my-2">
                Scheduled Appointments:{" "}
              </p>
              <div>
                {scheduledAppointmentsLoading ? (
                  <Loader />
                ) : scheduledAppointments.length == 0 ? (
                  "no Schduled appointments"
                ) : (
                  <AppointmentTable SampleAppintments={scheduledAppointments} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
