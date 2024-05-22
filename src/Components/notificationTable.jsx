import Button from "./button";
import { useNavigate } from "react-router-dom";
import { prevClick } from "./utils/prevClick";
import { nextClick } from "./utils/nextClick";

export default function NotificationTable({
  notifications,
  itemsRange = { start, end },
  totalItems,
  itemsToShowAtATime,
  viewRole = "patient",
  setItemsRange,
}) {
  const navigate = useNavigate();
  const handleNotificationView = (notificationId) => {
    switch (viewRole) {
      case "patient":
        navigate(`/patient/notifications/${notificationId}`);
        break;
      case "doctor":
        navigate(`/doctor/notifications/${notificationId}`);
        break;
      case "admin":
        navigate(`/admin/notifications/${notificationId}`);
        break;
      default:
        break;
    }
  };

  const handlePrevClick = () => {
    prevClick(itemsRange, itemsToShowAtATime, setItemsRange);
  };

  const handleNextClick = () => {
    nextClick(itemsRange, itemsToShowAtATime, setItemsRange);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <table className="w-[90%] border-collapse divide-y divide-designColor2 text-sm md:text-base">
        <thead>
          <tr className=" bg-designColor1 text-white">
            <th className="px-2 py-1 md:px-4 md:py-2 text-left">#</th>
            <th className="px-2 py-1 md:px-4 md:py-2 text-center">
              Notification
            </th>
            <th className="px-2 py-1 md:px-4 md:py-2 text-center">Dated</th>
            <th className="px-2 py-1 md:px-4 md:py-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {notifications.length <= 0 ? (
            <tr>
              <td className="text-sm text-nowrap lg:text-base">
                No Nnotification
              </td>
            </tr>
          ) : (
            notifications.map((notification, index) => {
              const tempDate = new Date(notification.dated);
              const formattedDate = tempDate.toLocaleDateString("en-US", {
                year: "2-digit",
                month: "short",
                day: "2-digit",
              });

              return (
                <tr key={index} className="text-gray-700 hover:bg-gray-100">
                  <td className="px-2 py-1 md:px-4 md:py-2">
                    {itemsRange.start + index + 1}
                  </td>
                  <td className="px-2 py-1 md:px-4 md:py-2 text-center">
                    {notification.name}
                  </td>
                  <td className="px-2 py-1 md:px-4 md:py-2 text-center">
                    {formattedDate}
                  </td>
                  <td className="px-2 py-1 md:px-4 md:py-2 text-right">
                    <Button
                      text={notification.viewed ? "view" : "new"}
                      variant={notification.viewed ? "secondry" : "primary"}
                      handleOnClick={() =>
                        handleNotificationView(notification.id)
                      }
                    />
                  </td>
                </tr>
              );
            })
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
    </div>
  );
}
