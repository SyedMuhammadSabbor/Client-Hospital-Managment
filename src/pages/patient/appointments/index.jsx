import CustomLink from "../../../Components/link";
import AppointmentTable from "../Components/appointmentsTable";
import { SampleAppintments } from "../sampleData/sampleAppointments";

export default function Appointments() {
  return (
    <section className="w-full flex flex-col ">
      <div className="w-full flex justify-center space-x-1 my-2  md:my-4 lg:my-6">
        <p className="text-textColor font-medium  md:text-lg lg:text-xl ">
          Appointment(s)
        </p>
        <CustomLink text={"New"} to="/patient/appointments/new"/>
      </div>

      <div className="px-2 ">
        <AppointmentTable SampleAppintments={SampleAppintments} />
      </div>
    </section>
  );
}
