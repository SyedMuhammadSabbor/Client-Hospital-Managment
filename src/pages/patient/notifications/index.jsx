import NotificationTable from "../Components/notificationTable";

export default function AllNotifications() {
  return (
    <section className="w-full flex flex-col ">
      <p className="text-textColor font-medium my-2 w-full text-center md:text-lg md:my-4 lg:text-xl lg:my-6">
        Notification(s)
      </p>

      <div className="px-2 ">
        <NotificationTable />
      </div>
    </section>
  );
}
