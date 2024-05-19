import React from "react";

export default function FormInput(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.handleChange}
      id={props.id}
      className="bg-white  text-black my-1 px-3 py-2 border-designColor1 border border-solid rounded focus:outline-none focus:border-designColor2"
    />
  );
}
