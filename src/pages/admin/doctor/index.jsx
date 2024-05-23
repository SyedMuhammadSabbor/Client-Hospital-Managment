import { useEffect, useState } from "react";
import Loader from "../../../Components/loader";
import DoctorTable from "../../../Components/doctorTable";
import { SampleDoctors } from "../../../sampleData/sampleDoctors";

const sampleDoctor = SampleDoctors[0];
const itemsToShowAtATime = 5;

export default function Doctors() {
  const [admin, setAdmin] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //   approved doctors
  const [approvedDoctors, setApprovedDoctors] = useState([]);
  const [approvedDoctorsLoading, setApprovedDoctorsLoading] = useState(true);

  const [approvedDoctorItemsRange, setApprovedDoctorItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [approvedDoctorTotalItems, setApprovedDoctorTotalItems] = useState(0);

  //   pending doctors
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [pendingDoctorsLoading, setPendingDoctorsLoading] = useState(true);

  const [pendingDoctorItemsRange, setPendingDoctorItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1,
  });
  const [pendingDoctorTotalItems, setPendingDoctorTotalItems] = useState(0);

  const makeAdminDataRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setAdmin(sampleDoctor);
      setIsLoading(false);
    }, 500);
  };

  const makeApprovedDoctorsDataRequest = () => {
    setApprovedDoctorsLoading(true);
    setTimeout(() => {
      const tempDoctors = SampleDoctors.filter(
        (doctorItem) => doctorItem.status == "approved"
      );
      console.log("Temp: ", tempDoctors);
      setApprovedDoctors(
        tempDoctors.slice(
          approvedDoctorItemsRange.start,
          approvedDoctorItemsRange.end + 1
        )
      );
      setApprovedDoctorTotalItems(tempDoctors.length);
      setApprovedDoctorsLoading(false);
    }, 500);
  };

  const makePendingDoctorsDataRequest = () => {
    setPendingDoctorsLoading(true);
    setTimeout(() => {
      const tempDoctors = SampleDoctors.filter(
        (doctorItem) => doctorItem.status == "pending"
      );
      setPendingDoctors(
        tempDoctors.slice(
          pendingDoctorItemsRange.start,
          pendingDoctorItemsRange.end + 1
        )
      );
      setPendingDoctorTotalItems(tempDoctors.length);
      setPendingDoctorsLoading(false);
    }, 500);
  };

  useEffect(() => {
    makeAdminDataRequest();
  }, []);

  useEffect(() => {
    makeApprovedDoctorsDataRequest();
  }, [admin, approvedDoctorItemsRange]);

  useEffect(() => {
    makePendingDoctorsDataRequest();
  }, [admin, pendingDoctorItemsRange]);

  return (
    <section className="w-full flex flex-col ">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Approved doctors */}

          <div className="w-full flex justify-center space-x-1 my-2  md:my-4 lg:my-6">
            <p className="text-textColor font-medium  md:text-lg lg:text-xl ">
              Approved Doctor(s)
            </p>
          </div>

          <div className="px-2 ">
            {approvedDoctorsLoading ? (
              <Loader />
            ) : (
              <div className="px-2 ">
                <DoctorTable
                  doctors={approvedDoctors}
                  tableTitle={"Notifications"}
                  itemsRange={approvedDoctorItemsRange}
                  itemsToShowAtATime={itemsToShowAtATime}
                  totalItems={approvedDoctorTotalItems}
                  setItemsRange={setApprovedDoctorItemsRange}
                  viewRole="admin"
                />
              </div>
            )}
          </div>

          {/* pending doctors */}

          <div className="w-full flex justify-center space-x-1 my-2  md:my-4 lg:my-6">
            <p className="text-textColor font-medium  md:text-lg lg:text-xl ">
              Pending Doctor(s)
            </p>
          </div>
          <div className="px-2 ">
            {pendingDoctorsLoading ? (
              <Loader />
            ) : (
              <div className="px-2 ">
                <DoctorTable
                  doctors={pendingDoctors}
                  tableTitle={"Pending Doctors"}
                  itemsRange={pendingDoctorItemsRange}
                  itemsToShowAtATime={itemsToShowAtATime}
                  totalItems={pendingDoctorTotalItems}
                  setItemsRange={setPendingDoctorItemsRange}
                  viewRole="admin"
                />
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
