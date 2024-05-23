export default function Button({
  text,
  type = "button",
  handleOnClick = () => {},
  variant = "primary",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={handleOnClick}
      disabled={disabled}
      className={`${
        variant == "secondry"
          ? "!bg-primary hover:border-designColor2"
          : variant == "danger"
          ? "!bg-red-700 text-white hover:border-black"
          : "bg-designColor1  hover:border-designColor2"
      }  ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }   border border-secondary rounded px-2 active:scale-95 `}
    >
      {text}
    </button>
  );
}
