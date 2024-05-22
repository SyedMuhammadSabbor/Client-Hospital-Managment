import { Route, Routes } from "react-router-dom";
import DoctorMenu from "./menu";
import Home from "./home";
import NotFound from "./not-found";
import AppointmentView from "../../Components/appointmentView";
import Appointments from "./appointments";
import DoctorNotifications from "./notifications";
import NotificationView from "../../Components/notificationView";
import MyPatients from "./patients";
import PatientView from "../../Components/patientView";

export default function Doctor() {
  return (
    <main className="w-full  lg:min-h-screen">
      <div className="w-full lg:fixed lg:h-screen lg:w-[25%] ">
        <DoctorMenu />
      </div>

      <div className="w-full lg:ml-[25%] lg:w-[75%]">
        <Routes>
          <Route path="/">
            <Route path="" element={<Home />} />

            <Route path="/notifications">
              <Route path="" element={<DoctorNotifications />} />
              <Route path=":notificationId" element={<NotificationView />} />
            </Route>

            <Route path="/patients">
              <Route path="" element={<MyPatients />} />
              <Route path=":patientId" element={<PatientView />} />
            </Route>

            <Route path="/appointments">
              <Route path="" element={<Appointments />} />
              {/*<Route path="new" element={<NewAppointment />} /> */}
              <Route
                path=":appointmentId"
                element={<AppointmentView viewRole="doctor" />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </main>
  );
}
