import Button from "./button";
import { useNavigate } from "react-router-dom";

export default function AppointmentTable({
  appointments,
  itemsRange = { start, end },
  totalItems,
  itemsToShowAtATime,
  viewRole = "patient",
  setItemsRange,
}) {
  const navigate = useNavigate();

  const handleAppointmentView = (appointmentId) => {
    console.log("view role: ", viewRole);
    switch (viewRole) {
      case "doctor":
        navigate(`/doctor/appointments/${appointmentId}`);
        break;
      case "admin":
        navigate(`/admin/appointments/${appointmentId}`);
        break;
      case "patient":
        navigate(`/patient/appointments/${appointmentId}`);
        break;
      default:
        break;
    }
  };

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

  return (
    <div className="w-full flex flex-col items-center">
      <table className="w-[90%] border-collapse divide-y divide-designColor2 text-sm md:text-base">
        <thead>
          <tr className=" bg-designColor1 text-white">
            <th className="px-2 py-1 md:px-4 md:py-2 text-left">#</th>
            <th className="px-2 py-1 md:px-4 md:py-2 text-center">Name</th>
            <th className="px-2 py-1 md:px-4 md:py-2 text-center">Time</th>
            <th className="px-2 py-1 md:px-4 md:py-2 text-center">Dated</th>
            <th className="px-2 py-1 md:px-4 md:py-2 text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => {
            const tempDate = new Date(appointment.dated);
            const formattedDate = tempDate.toLocaleDateString("en-US", {
              year: "2-digit",
              month: "short",
              day: "2-digit",
            });
            return (
              <tr
                key={index}
                className="text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAppointmentView(appointment.id)}
              >
                <td className="px-2 py-1 md:px-4 md:py-2">
                  {itemsRange.start + index + 1}
                </td>
                <td className="px-2 py-1 md:px-4 md:py-2 text-center">
                  {appointment.doctorName}
                </td>
                <td className="px-2 py-1 md:px-4 md:py-2 text-center">
                  {appointment.hoursTime > 12
                    ? `${appointment.hoursTime % 12} PM`
                    : `${appointment.hoursTime} AM`}
                </td>
                <td className="px-2 py-1 md:px-4 md:py-2 text-center  text-nowrap">
                  {formattedDate}
                </td>

                <td className="px-2 py-1 md:px-4 md:py-2 flex space-x-2 justify-end text-sm md:text-base !w-full ">
                  <span
                    className={`${
                      appointment.status == "scheduled"
                        ? "bg-green-700 text-white"
                        : appointment.status == "pending"
                        ? "bg-designColor2 text-white"
                        : appointment.status == "deleted"
                        ? "bg-red-700 text-white"
                        : "bg-designColor1 text-black"
                    }  mx-1 px-1 rounded capitalize`}
                  >
                    {appointment.status}
                  </span>
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
    </div>
  );
}
