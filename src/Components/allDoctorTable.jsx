import { useEffect, useState } from "react";
import Button from "./button";
import Loader from "./loader";
import { SampleDoctors } from "../sampleData/sampleDoctors";
import { useNavigate } from "react-router-dom";
import { prevClick } from "./utils/prevClick";
import { nextClick } from "./utils/nextClick";

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
    prevClick(itemsRange, itemsToShowAtATime, setItemsRange);
  };

  const handleNextClick = () => {
    nextClick(itemsRange, itemsToShowAtATime, setItemsRange);
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
    naviagte(`/patient/doctors/${doctorId}`);
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
                <th className="px-2 py-1 md:px-4 md:py-2 text-center">
                  Doctor
                </th>
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
                    <td className="px-2 py-1 md:px-4 md:py-2 text-right">
                      <Button
                        text={"profile"}
                        handleOnClick={() => handleDoctorProfileView(doctor.id)}
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
