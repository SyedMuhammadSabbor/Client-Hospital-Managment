import ADMIN_LOGO from "/logo.jpg";
import DOCTOR_LOGO from "/doctor_uniform.jpg";
import PATIENT_LOGO from "/patient_leaving.jpeg";
import RoleCards from "./roleCards";

const roleCardDetails = [
  {
    imageSource: PATIENT_LOGO,
    roleText: "patient",
  },
  {
    imageSource: DOCTOR_LOGO,
    roleText: "doctor",
  },
  {
    imageSource: ADMIN_LOGO,
    roleText: "admin",
  },
];

export default function GetStartedPage() {
  return (
    <main className="min-h-[100vh] w-full flex flex-col justify-center items-center py-4 bg-primary">
      <h2 className="text-textColor font-semibold my-2 sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
        Which role describes you the best?
      </h2>
      <RoleCards roleCardDetails={roleCardDetails} />
    </main>
  );
}
