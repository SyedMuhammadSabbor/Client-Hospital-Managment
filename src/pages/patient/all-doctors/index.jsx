import { useEffect, useState } from "react";
import Loader from "../../../Components/loader";
import { SamplePatients } from "../../../sampleData/samplePatients";
import { SampleDoctors } from "../../../sampleData/sampleDoctors";
import DoctorTable from "../../../Components/doctorTable";

const samplePatient = SamplePatients[0];
const itemsToShowAtATime = 5;

export default function AllDoctors() {
  const [patient, setPatient] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);

  const [itemsRange, setItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [totalItems, setTotalItems] = useState(0);

  const makePatientDataRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPatient(samplePatient);
      setIsLoading(false);
    }, 500);
  };

  const makeApprovedDoctorsDataRequest = () => {
    setDoctorsLoading(true);
    setTimeout(() => {
      const tempDoctors = SampleDoctors.filter(
        (doctorItem) => doctorItem.status == "approved"
      );
      setDoctors(tempDoctors.slice(itemsRange.start, itemsRange.end + 1));
      setTotalItems(tempDoctors.length); // for now
      setDoctorsLoading(false);
    }, 500);
  };

  useEffect(() => {
    makePatientDataRequest();
  });

  useEffect(() => {
    makeApprovedDoctorsDataRequest();
  }, [patient, itemsRange]);
  return (
    <section className="w-full flex flex-col ">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full flex justify-center space-x-1 my-2  md:my-4 lg:my-6">
            <p className="text-textColor font-medium  md:text-lg lg:text-xl ">
              Approved Doctor(s)
            </p>
          </div>

          <div className="px-2 ">
            {doctorsLoading ? (
              <Loader />
            ) : (
              <div className="px-2 ">
                <DoctorTable
                  doctors={doctors}
                  tableTitle={"Notifications"}
                  itemsRange={itemsRange}
                  itemsToShowAtATime={itemsToShowAtATime}
                  totalItems={totalItems}
                  setItemsRange={setItemsRange}
                  viewRole="patient"
                />
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
