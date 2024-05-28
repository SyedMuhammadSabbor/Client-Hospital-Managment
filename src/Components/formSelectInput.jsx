export default function FormSelecetInput({ handleOnChange, options, value }) {
  return (
    <select
      onChange={handleOnChange}
      required
      value={value}
      className="w-full bg-white  text-textColor my-1 p-1 border-designColor2 border rounded focus:outline-none focus:border-textColor overflow-y-scroll"
    >
      <option value="">none</option>
      {options.map((optionItem) => (
        <option key={optionItem.value} value={optionItem.value}>
          {optionItem.text}
        </option>
      ))}
    </select>
  );
}
