import { useEffect, useState } from "react";
import AppointmentTable from "../../../Components/appointmentsTable";
import CustomLink from "../../../Components/link";
import { SampleAppintments } from "../../../sampleData/sampleAppointments";
import { SamplePatients } from "../../../sampleData/samplePatients";
import Loader from "../../../Components/loader";

const itemsToShowAtATime = 5;
const sampleUser = SamplePatients[0];

export default function Appointments() {
  const [pateint, setPatient] = useState({});
  const [appointments, setAppoinments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsRange, setItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [totalItems, setTotalItems] = useState(0);

  const makePatientDataRequest = () => {
    setTimeout(() => {
      setPatient(sampleUser);
    }, 500);
  };

  const makePateintAppointmentRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      const tempAppointments = SampleAppintments.filter(
        (appointmentItem) => appointmentItem.patientId == pateint.id
      );
      setAppoinments(
        tempAppointments.slice(itemsRange.start, itemsRange.end + 1)
      );
      setTotalItems(tempAppointments.length); // for now
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    makePatientDataRequest();
  });

  useEffect(() => {
    makePateintAppointmentRequest();
  }, [pateint, itemsRange]);
  return (
    <section className="w-full flex flex-col ">
      <div className="w-full flex justify-center space-x-1 my-2  md:my-4 lg:my-6">
        <p className="text-textColor font-medium  md:text-lg lg:text-xl ">
          Appointment(s)
        </p>
        <CustomLink text={"New"} to="/patient/appointments/new" />
      </div>

      <div className="px-2 ">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="px-2 ">
            <AppointmentTable
              tableTitle={"Notifications"}
              itemsRange={itemsRange}
              itemsToShowAtATime={itemsToShowAtATime}
              appointments={appointments}
              totalItems={totalItems}
              setItemsRange={setItemsRange}
              viewRole="patient"
            />
          </div>
        )}
      </div>
    </section>
  );
}
