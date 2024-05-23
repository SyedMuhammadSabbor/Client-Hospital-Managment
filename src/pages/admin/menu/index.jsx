import { Link } from "react-router-dom";
import MenuItem from "../../../Components/menuItem";

const doctorMenuDetails = [
  {
    linkText: "home",
    linkPath: "/admin",
  },
  {
    linkText: "patients",
    linkPath: "/admin/patients",
  },
  {
    linkText: "doctors",
    linkPath: "/admin/doctors",
  },
  {
    linkText: "notifications",
    linkPath: "/admin/notifications",
  },

  {
    linkText: "appointments",
    linkPath: "/admin/appointments",
  },
];

export default function AdminMenu() {
  return (
    <menu className="bg-secondary h-full text-textColor flex justify-between px-2 sm:px-4 md:px-8 lg:px-0 lg:flex-col lg:items-center">
      <Link
        to={"/doctor"}
        className="flex items-center justify-center p-1 flex:h-[50%] "
      >
        <img
          src="/nobackground_logo.png"
          alt="logo"
          className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] lg:w-[80%] lg:h-[80%]"
        />
      </Link>

      <div className=" flex space-x-2 items-center sm:space-x-4 md:space-x-6 lg:space-x-0 lg:flex-col lg:space-y-2 lg:flex-[50%] ">
        {doctorMenuDetails.map((menuItem, index) => (
          <MenuItem
            linkPath={menuItem.linkPath}
            linkText={menuItem.linkText}
            key={index}
          />
        ))}
      </div>
    </menu>
  );
}
