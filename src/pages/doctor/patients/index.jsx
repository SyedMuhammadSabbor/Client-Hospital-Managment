import { useEffect, useState } from "react";
import { SampleDoctors } from "../../../sampleData/sampleDoctors";
import PatientsTable from "../../../Components/patientsTable";
import { SamplePatients } from "../../../sampleData/samplePatients";

const itemsToShowAtATime = 5;
const sampleDoctor = SampleDoctors[0];

export default function MyPatients() {
  const [doctor, setDoctor] = useState({});
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsRange, setItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [totalItems, setTotalItems] = useState(0);

  const makeDoctorDataRequest = () => {
    setTimeout(() => {
      setDoctor(sampleDoctor);
    }, 500);
  };

  const makePateintsDataRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      const tempPatients = SamplePatients.filter(
        (patientItem) => patientItem.doctorIds.includes(doctor.id)
      );
      setPatients(
        tempPatients.slice(itemsRange.start, itemsRange.end + 1)
      );
      setTotalItems(tempPatients.length); // for now
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    makeDoctorDataRequest();
  }, []);

  useEffect(() => {
    makePateintsDataRequest();
  }, [doctor, itemsRange]);

  return (
    <section className="w-full flex flex-col ">
      <p className="text-textColor font-medium my-2 w-full text-center md:text-lg md:my-4 lg:text-xl lg:my-6">
        Patients(s)
      </p>

      <div className="px-2 ">
        <PatientsTable
          patients={patients}
          itemsToShowAtATime={itemsToShowAtATime}
          totalItems={totalItems}
          itemsRange={itemsRange}
          viewRole="doctor"
          setItemsRange={setItemsRange}
        />
      </div>
    </section>
  );
}
