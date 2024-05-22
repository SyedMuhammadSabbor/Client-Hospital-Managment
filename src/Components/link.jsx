import { Link } from "react-router-dom";

export default function CustomLink({
  text,
  to = "#",
  variant = "primary",
  disabled,
}) {
  return (
    <Link
      to={to}
      className={`${variant == "secondry" && "!bg-primary"}  ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } bg-designColor1  border border-secondary rounded px-2 active:scale-95 hover:border-designColor2 `}
    >
      {text}
    </Link>
  );
}
