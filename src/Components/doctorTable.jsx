import Button from "./button";
import { useNavigate } from "react-router-dom";

export default function DoctorTable({
  doctors,
  itemsRange = { start: 0, end: 0 },
  totalItems,
  itemsToShowAtATime,
  viewRole = "patient",
  setItemsRange,
}) {
  const naviagte = useNavigate();

  const handleDoctorProfileView = (doctorId) => {
    switch (viewRole) {
      case "patient":
        naviagte(`/patient/doctors/${doctorId}`);
        break;
      case "admin":
        naviagte(`/admin/doctors/${doctorId}`);
        break;
      default:
        break;
    }
  };

  const handlePrevClick = () => {
    console.log(itemsRange);

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

  console.log("Doctors: ", doctors);

  return (
    <section className="w-full flex flex-col items-center">
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
          {doctors.length == 0 ? (
            <tr>
              <td className="text-sm text-nowrap lg:text-base">No Doctors</td>
            </tr>
          ) : (
            doctors.map((doctor, index) => (
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
            ))
          )}
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
    </section>
  );
}
