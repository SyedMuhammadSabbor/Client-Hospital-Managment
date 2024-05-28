import { useState, useEffect } from "react";
import { SampleDoctors } from "../../../sampleData/sampleDoctors";
import { SampleAppintments } from "../../../sampleData/sampleAppointments";
import Loader from "../../../Components/loader";
import AppointmentTable from "../../../Components/appointmentsTable";
import CustomLink from "../../../Components/link";

const sampleDoctor = SampleDoctors[0];
const itemsToShowAtATime = 5;

export default function Home() {
  const [doctor, setDoctor] = useState({});
  const [scheduledAppointments, setScheduledAppointmnts] = useState([]);
  const [scheduledAppointmentsLoading, setScheduledAppointmentsLoading] =
    useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsRange, setItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [totalItems, setTotalItems] = useState(0);

  const makeDataRequest = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setDoctor(sampleDoctor);
      setIsLoading(false);
    }, 500);
  };

  const makeScheduledAppointmentsRequest = async () => {
    setScheduledAppointmentsLoading(true);
    console.log("Doctor id: ", doctor.id);
    setTimeout(() => {
      const tempAppointments = SampleAppintments.filter(
        (appointment) =>
          appointment.status == "scheduled" && appointment.doctorId == doctor.id
      );
      setScheduledAppointmnts(
        tempAppointments.slice(itemsRange.start, itemsRange.end + 1)
      );
      setTotalItems(tempAppointments.length); // for now
      setScheduledAppointmentsLoading(false);
    }, 500);
  };

  useEffect(() => {
    makeDataRequest();
  }, []);

  useEffect(() => {
    makeScheduledAppointmentsRequest();
  }, [doctor]);

  return (
    <section className="w-full flex flex-col items-center ">
      <p className="text-textColor font-medium my-2 w-full text-center md:text-lg md:my-4 lg:text-xl lg:my-6">
        Welcome to Doctor Dashboard
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
                Name: <span className="font-semibold">{doctor.name}</span>
              </h2>
              <h2>
                Email: <span className="font-semibold">{doctor.email}</span>
              </h2>
              <h2>
                Gender:{" "}
                <span className="font-semibold capitalize">
                  {doctor.gender}
                </span>
              </h2>
              <h2>
                Age: <span className="font-semibold">{doctor.age}</span>
              </h2>

              <CustomLink to="/doctor/edit" text={"Edit"} />
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
                    viewRole="doctor"
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
