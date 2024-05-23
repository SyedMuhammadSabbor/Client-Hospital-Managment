import { useEffect, useState } from "react";
import AppointmentTable from "../../../Components/appointmentsTable";
import { SampleAppintments } from "../../../sampleData/sampleAppointments";
import { SampleDoctors } from "../../../sampleData/sampleDoctors";
import Loader from "../../../Components/loader";

const itemsToShowAtATime = 5;

const sampleDoctor = SampleDoctors[0];
export default function Appointments() {
  const [doctor, setDoctor] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsRange, setItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [totalItems, setTotalItems] = useState(0);

  const makeDoctorDataRequest = () => {
    setTimeout(() => {
      setDoctor(sampleDoctor);
    }, 500);
  };

  const makeAppointmentsDataRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      const tempAppointments = SampleAppintments.filter(
        (appointmentItem) => appointmentItem.doctorId == doctor.id
      );
      setAppointments(
        tempAppointments.slice(itemsRange.start, itemsRange.end + 1)
      );
      setTotalItems(tempAppointments.length); // for now
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    makeDoctorDataRequest();
  }, []);

  useEffect(() => {
    makeAppointmentsDataRequest();
  }, [doctor]);

  return (
    <section className="w-full flex flex-col ">
      <div className="w-full flex justify-center space-x-1 my-2  md:my-4 lg:my-6">
        <p className="text-textColor font-medium  md:text-lg lg:text-xl ">
          Appointment(s)
        </p>
      </div>

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
            viewRole="doctor"
          />
        </div>
      )}
    </section>
  );
}
