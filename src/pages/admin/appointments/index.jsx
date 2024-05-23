import { useEffect, useState } from "react";
import AppointmentTable from "../../../Components/appointmentsTable";
import { SampleAppintments } from "../../../sampleData/sampleAppointments";
import Loader from "../../../Components/loader";
import { SampleAdmins } from "../../../sampleData/sampleAdmins";

const itemsToShowAtATime = 5;

const sampleAdmin = SampleAdmins[0];
export default function Appointments() {
  const [admin, setAdmin] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [appointments, setAppointments] = useState([]);
  const [appoitmentsLoading, setAppointmentsLoading] = useState(true);
  const [itemsRange, setItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [totalItems, setTotalItems] = useState(0);

  const makeAdminDataRequest = () => {
    setIsLoading(true);

    setTimeout(() => {
      setAdmin(sampleAdmin);
      setIsLoading(false);
    }, 500);
  };

  const makeAppointmentsDataRequest = () => {
    setAppointmentsLoading(true);
    setTimeout(() => {
      const tempAppointments = SampleAppintments;
      setAppointments(
        tempAppointments.slice(itemsRange.start, itemsRange.end + 1)
      );
      setTotalItems(tempAppointments.length); // for now
      setAppointmentsLoading(false);
    }, 500);
  };

  useEffect(() => {
    makeAdminDataRequest();
  }, []);

  useEffect(() => {
    makeAppointmentsDataRequest();
  }, [admin, itemsRange]);

  return (
    <section className="w-full flex flex-col ">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="w-full flex justify-center space-x-1 my-2  md:my-4 lg:my-6">
            <p className="text-textColor font-medium  md:text-lg lg:text-xl ">
              Appointment(s)
            </p>
          </div>
          {appoitmentsLoading ? (
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
                viewRole="admin"
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}
