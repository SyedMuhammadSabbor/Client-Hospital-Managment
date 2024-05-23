import { useEffect, useState } from "react";
import { SamplePatients } from "../sampleData/samplePatients";
import { SampleAppintments } from "../sampleData/sampleAppointments";
import Loader from "./loader";
import AppointmentTable from "./appointmentsTable";
import { useParams } from "react-router-dom";
import { SampleDoctors } from "../sampleData/sampleDoctors";
import NotFoundPage from "../pages/not-found";

const itemsToShowAtATime = 5;
const sampleDoctor = SampleDoctors[0];

export default function PatientView({ viewRole = "doctor" }) {
  const [doctor, setDoctor] = useState({});
  const [doctorLoading, setDoctorLoading] = useState(true);

  const [patient, setPatient] = useState({});
  const [patientLaoding, setPatientLoading] = useState(true);
  const [patientFound, setPatientFound] = useState(true);

  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [itemsRange, setItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [totalItems, setTotalItems] = useState(0);

  const params = useParams();
  const { patientId } = params;

  const makeDoctorDataRequest = () => {
    setDoctorLoading(true);
    setTimeout(() => {
      setDoctor(sampleDoctor);
      setDoctorLoading(false);
    }, 500);
  };

  const makePatientDataRequest = () => {
    setTimeout(() => {
      setPatientLoading(true);
      setPatientFound(false);
      const tempPatient = SamplePatients.find(
        (patientItem) => patientItem.id == patientId
      );
      if (!tempPatient) {
        setPatientFound(false);
        setPatientLoading(false);
        return;
      }
      setPatient(tempPatient);
      setPatientLoading(false);
      setPatientFound(true);
    }, 500);
  };

  const makeAppointmentsDataRequest = async () => {
    setPatientLoading(true);
    setTimeout(() => {
      const patientAppointmentIds = patient.appointmentIds;
      const tempAppointments = SampleAppintments.filter(
        (appointmentItem) =>
          appointmentItem.doctorId == doctor.id &&
          patientAppointmentIds.includes(appointmentItem.id)
      );
      setAppointments(
        tempAppointments.slice(itemsRange.start, itemsRange.end + 1)
      );
      setTotalItems(tempAppointments.length); // for now
      setAppointmentsLoading(false);
    }, 500);
  };

  useEffect(() => {
    makeDoctorDataRequest();
  }, []);

  useEffect(() => {
    makePatientDataRequest();
  }, [doctor]);

  useEffect(() => {
    makeAppointmentsDataRequest();
  }, [patient]);

  if (!patientFound) {
    switch (viewRole) {
      case "patient":
        return <NotFoundPage redirectTo="/patient" />;
      case "doctor":
        return <NotFoundPage redirectTo="/doctor" />;
      case "admin":
        return <NotFoundPage redirectTo="/admin" />;
      default:
        <NotFoundPage redirectTo="/" />;
    }
  }

  return (
    <section className="w-full flex flex-col items-center ">
      <p className="text-textColor font-medium my-2 w-full text-center md:text-lg md:my-4 lg:text-xl lg:my-6">
        Patient Profile
      </p>

      {doctorLoading || patientLaoding ? (
        <Loader />
      ) : (
        <div className="w-full p-2 sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%]">
          <div className="flex flex-col px-2 text-xs sm:text-sm md:text-base">
            <div className="py-2">
              <p className="w-full text-left border-b border-designColor2 text-textColor font-semibold my-2">
                Patient details:{" "}
              </p>

              {patientLaoding ? (
                <Loader />
              ) : (
                <>
                  {" "}
                  <h2>
                    Name: <span className="font-semibold">{patient.name}</span>
                  </h2>
                  <h2>
                    Email:{" "}
                    <span className="font-semibold">{patient.email}</span>
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
                </>
              )}
            </div>

            <div className="py-2 md:py-4">
              <p className="w-full text-left border-b border-designColor2 text-textColor font-semibold my-2">
                Appointments History:{" "}
              </p>
              <div>
                {appointmentsLoading ? (
                  <Loader />
                ) : appointments.length == 0 ? (
                  "no appointments"
                ) : (
                  <AppointmentTable
                    tableTitle={"Notifications"}
                    itemsRange={itemsRange}
                    itemsToShowAtATime={itemsToShowAtATime}
                    appointments={appointments}
                    totalItems={totalItems}
                    setItemsRange={setItemsRange}
                    viewRole={viewRole}
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
