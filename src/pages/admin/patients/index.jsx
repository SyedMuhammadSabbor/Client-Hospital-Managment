import { useEffect, useState } from "react";
import PatientsTable from "../../../Components/patientsTable";
import { SamplePatients } from "../../../sampleData/samplePatients";
import { SampleAdmins } from "../../../sampleData/sampleAdmins";
import Loader from "../../../Components/loader";

const itemsToShowAtATime = 5;
const sampleAdmin = SampleAdmins[0];

export default function Patients() {
  const [admin, setAdmin] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [patients, setPatients] = useState([]);
  const [pateintsLoading, setPatientsLoading] = useState(true);
  const [itemsRange, setItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [totalItems, setTotalItems] = useState(0);

  const makeDoctorDataRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAdmin(sampleAdmin);
      setIsLoading(false);
    }, 500);
  };

  const makePateintsDataRequest = () => {
    setPatientsLoading(true);
    setTimeout(() => {
      const tempPatients = SamplePatients;
      setPatients(tempPatients.slice(itemsRange.start, itemsRange.end + 1));
      setTotalItems(tempPatients.length); // for now
      setPatientsLoading(false);
    }, 500);
  };

  useEffect(() => {
    makeDoctorDataRequest();
  }, []);

  useEffect(() => {
    makePateintsDataRequest();
  }, [admin, itemsRange]);

  return (
    <section className="w-full flex flex-col ">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <p className="text-textColor font-medium my-2 w-full text-center md:text-lg md:my-4 lg:text-xl lg:my-6">
            Patients(s)
          </p>

          {pateintsLoading ? (
            <Loader />
          ) : (
            <div className="px-2 ">
              <PatientsTable
                patients={patients}
                itemsToShowAtATime={itemsToShowAtATime}
                totalItems={totalItems}
                itemsRange={itemsRange}
                viewRole="admin"
                setItemsRange={setItemsRange}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}
