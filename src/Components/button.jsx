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
      className={`${variant == "secondry" && "!bg-primary"}  ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } bg-designColor1  border border-secondary rounded px-2 active:scale-95 hover:border-designColor2 `}
    >
      {text}
    </button>
  );
}
