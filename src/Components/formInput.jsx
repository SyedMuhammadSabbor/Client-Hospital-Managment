export default function FormInput({
  type,
  placeholder,
  value,
  handleChange,
  id,
  required = false,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      id={id}
      required={required}
      className="w-full bg-white  text-textColor my-1 p-1 border-designColor2 border rounded focus:outline-none focus:border-textColor"
    />
  );
}
