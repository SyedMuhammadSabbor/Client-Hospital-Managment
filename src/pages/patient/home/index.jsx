import { useEffect, useState } from "react";
import { SamplePatients } from "../../../sampleData/samplePatients";
import Loader from "../../../Components/loader";
import { SampleAppintments } from "../../../sampleData/sampleAppointments";
import AppointmentTable from "../../../Components/appointmentsTable";

const itemsToShowAtATime = 5;
const samplePatient = SamplePatients[0]

export default function Home() {
  const [patient, setPatient] = useState({});
  const [scheduledAppointments, setScheduledAppointmnts] = useState([]);
  const [scheduledAppointmentsLoading, setScheduledAppointmentsLoading] =
    useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsRange, setItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [totalItems, setTotalItems] = useState(0);

  const makePatientDataRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPatient(samplePatient);
      setIsLoading(false);
    }, 500);
  };

  const makeScheduledAppointmentsRequest = async () => {
    setScheduledAppointmentsLoading(true);
    setTimeout(() => {
      const tempAppointments = SampleAppintments.filter(
        (appointmentItem) =>
          appointmentItem.status == "scheduled" &&
          appointmentItem.patientId == patient.id
      );
      setScheduledAppointmnts(
        tempAppointments.slice(itemsRange.start, itemsRange.end + 1)
      );
      setTotalItems(tempAppointments.length); // for now
      setScheduledAppointmentsLoading(false);
    }, 500);
  };

  useEffect(() => {
    makePatientDataRequest();
  }, []);

  useEffect(() => {
    makeScheduledAppointmentsRequest();
  }, [patient]);

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
                Name: <span className="font-semibold">{patient.name}</span>
              </h2>
              <h2>
                Email: <span className="font-semibold">{patient.email}</span>
              </h2>
              <h2>
                Gender:{" "}
                <span className="font-semibold capitalize">
                  {patient.gender}
                </span>
              </h2>
              <h2>
                Age: <span className="font-semibold">{patient.age}</span>
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
                  <AppointmentTable
                  tableTitle={"Notifications"}
                  itemsRange={itemsRange}
                  itemsToShowAtATime={itemsToShowAtATime}
                  appointments={scheduledAppointments}
                  totalItems={totalItems}
                  setItemsRange={setItemsRange}
                  viewRole="patient"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
