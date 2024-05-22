import DoctorTable from "../../../Components/allDoctorTable";

export default function AllDoctors() {
  return (
    <section className="w-full flex flex-col ">
      <p className="text-textColor font-medium my-2 w-full text-center md:text-lg md:my-4 lg:text-xl lg:my-6">
        Doctor(s)
      </p>

      <div className="px-2 ">
        <DoctorTable/>
      </div>
    </section>
  );
}
