import PatientSignUp from "../../signUp/patientSignup";

export default function EditPateint() {
  return (
    <main className="min-h-screen  flex items-center justify-center bg-primary">
      <div className="w-[70%] space-y-8 px-8 py-10 bg-white rounded-md sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[35%]">
        <div>
          <h2 className="mt-6 text-center text-xl font-semibold text-textColor">
            Edit data
          </h2>
        </div>
        {<PatientSignUp formMode="edit" />}
      </div>
    </main>
  );
}
