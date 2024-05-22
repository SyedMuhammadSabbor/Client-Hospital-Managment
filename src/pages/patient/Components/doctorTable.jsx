import { useEffect, useState } from "react";
import Button from "../../../Components/button";
import Loader from "../../../Components/loader";
import { SampleDoctors } from "../sampleData/sampleDoctors";
import { useNavigate } from "react-router-dom";

const totalItems = SampleDoctors.length;
const itemsToShowAtATime = totalItems < 5 ? totalItems : 5; // max 5 items to show at a time

export default function DoctorTable() {
  const [doctorsData, setDoctorsData] = useState([]);
  const [itemsRange, setItemsRange] = useState({
    start: 0,
    end: itemsToShowAtATime - 1, // 0-4 => 5 items
  });
  const [isLoading, setIsLoading] = useState(true);
  const naviagte = useNavigate();

  const handlePrevClick = () => {
    if (itemsRange.start - itemsToShowAtATime >= 0) {
      if (itemsRange.start - itemsRange.end == 0) {
        // == 0
        setItemsRange((prev) => ({
          start: prev.start - itemsToShowAtATime,
          end: prev.end - 1,
        }));
      } else if (itemsRange.end - itemsRange.start > 0) {
        // >0
        setItemsRange((prev) => ({
          start: prev.start - itemsToShowAtATime,
          end: prev.start - 1,
        }));
      }
    }
  };

  const handleNextClick = () => {
    if (itemsRange.end + itemsToShowAtATime <= totalItems) {
      // minimum items
      setItemsRange((prev) => ({
        start: prev.start + itemsToShowAtATime,
        end: prev.end + itemsToShowAtATime,
      }));
    } else if (itemsRange.end < totalItems) {
      // we have less items than minimum
      setItemsRange((prev) => ({
        start: prev.end + 1,
        end: totalItems - 1, // total items is index based
      }));
    }
  };

  const sampleDataRequest = async () => {
    console.log(itemsRange);
    setIsLoading(true);
    setTimeout(() => {
      setDoctorsData(SampleDoctors.slice(itemsRange.start, itemsRange.end + 1)); // end point is exclusive
      setIsLoading(false);
    }, 500);
  };

  const handleDoctorProfileView = (doctorId) => {
    naviagte(`/patient/doctors/${doctorId}`)
  };

  useEffect(() => {
    sampleDataRequest();
  }, [itemsRange]);

  return (
    <div className="w-full flex flex-col items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <table className="w-[90%] border-collapse divide-y divide-designColor2 text-sm md:text-base">
            <thead>
              <tr className=" bg-designColor1 text-white">
                <th className="px-2 py-1 md:px-4 md:py-2 text-left">#</th>
                <th className="px-2 py-1 md:px-4 md:py-2 text-center">Doctor</th>
                <th className="px-2 py-1 md:px-4 md:py-2 text-center">Field</th>
                <th className="px-2 py-1 md:px-4 md:py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {doctorsData.map((doctor, index) => {
                return (
                  <tr key={index} className="text-gray-700 hover:bg-gray-100">
                    <td className="px-2 py-1 md:px-4 md:py-2">
                      {itemsRange.start + index + 1}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 text-center">
                      {doctor.name}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 text-center">
                      {doctor.field}
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 flex space-x-2 justify-end !text-sm md:!text-base">
                      <Button
                        text={"profile"}
                        handleOnClick={() => handleDoctorProfileView(doctor.id)}
                      />
                      <Button
                        text={
                          doctor.currentAppointments >= doctor.maxAppointments
                            ? "no vaccancy"
                            : "appoint"
                        }
                        disabled={
                          doctor.currentAppointments >= doctor.maxAppointments
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="">
              <tr className="text-white w-full relative ">
                <th className="px-2 py-1 md:px-4 md:py-2 text-center absolute right-0 space-x-2">
                  <Button
                    text="prev"
                    variant="secondary"
                    handleOnClick={handlePrevClick}
                    disabled={itemsRange.start <= 0}
                  />
                  <Button
                    text="next"
                    variant="primary"
                    handleOnClick={handleNextClick}
                    disabled={itemsRange.end >= totalItems - 1}
                  />
                </th>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </div>
  );
}
