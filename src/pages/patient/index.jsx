import { Routes, Route } from "react-router-dom";
import PatientMenu from "./menu";
import AllDoctors from "./all-doctors";
import Home from "./home";
import Appointments from "./appointments";
import AppointmentView from "../../Components/appointmentView";
import PateintNotFoundPage from "./not-found";
import DoctorView from "../../Components/doctorView";
import NotificationView from "../../Components/notificationView";
import AllNotifications from "./notifications";
import NewAppointment from "./new-appointment";

export default function Patient() {
  return (
    <main className="w-full  lg:min-h-screen">
      <div className="w-full lg:fixed lg:h-screen lg:w-[25%] ">
        <PatientMenu />
      </div>

      <div className="w-full lg:ml-[25%] lg:w-[75%]">
        <Routes>
          <Route path="/">
            <Route path="" element={<Home />} />

            <Route path="/notifications">
              <Route path="" element={<AllNotifications />} />
              <Route path=":notificationId" element={<NotificationView viewRole="patient"/>} />
            </Route>

            <Route path="/doctors">
              <Route path="" element={<AllDoctors />} />
              <Route path=":doctorId" element={<DoctorView viewRole="patient"/>} />
            </Route>

            <Route path="/appointments">
              <Route path="" element={<Appointments />} />
              <Route path="new" element={<NewAppointment />} />
              <Route path=":appointmentId" element={<AppointmentView viewRole="patient" />} />
            </Route>

            <Route path="*" element={<PateintNotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </main>
  );
}
