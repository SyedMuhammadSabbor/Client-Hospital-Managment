import { Link, useLocation } from "react-router-dom";

export default function MenuItem({ linkText, linkPath }) {
  const { pathname } = useLocation();
  return (
    <Link to={linkPath}>
      <p
        className={`${
          pathname == linkPath ? "font-semibold underline" : "font-normal"
        } capitalize text-textColor text-sm hover:underline hover:underline-offset-1 md:text-base lg:text-lg`}
      >
        {linkText}
      </p>
    </Link>
  );
}
