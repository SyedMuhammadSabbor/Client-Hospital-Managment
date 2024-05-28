import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PatientSignUp from "./patientSignup";
import DoctorSignUp from "./doctorSignup";
import AdminSignUp from "./adminSignup";

const Signup = () => {
  const naviagte = useNavigate();
  const [role, setRole] = useState("");

  // getting user state from location state
  // no location state is set if we visit url directly
  const locationState = useLocation().state;

  // validating the presence of any role
  useEffect(() => {
    if (locationState && locationState.userRole) {
      setRole(locationState.userRole);
    } else {
      naviagte("/get-started", {});
    }
  }, [naviagte, locationState]);

  return (
    <main className="min-h-screen  flex items-center justify-center bg-primary">
      <div className="w-[70%] space-y-8 px-8 py-10 bg-white rounded-md sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[35%]">
        <div>
          <h2 className="mt-6 text-center text-xl font-semibold text-textColor">
            Sign up
          </h2>
        </div>
        {role == "admin" ? (
          <AdminSignUp formMode="signup" />
        ) : role == "doctor" ? (
          <DoctorSignUp formMode="signup" />
        ) : (
          <PatientSignUp formMode="signup" />
        )}
      </div>
    </main>
  );
};

export default Signup;
