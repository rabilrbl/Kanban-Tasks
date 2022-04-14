import React from "react";

const FullInput = ({
  label,
  name,
  type,
  placeholder,
  ...extraProps
}: {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  extraProps?: string;
}) => {
  type = type ? type : "text";
  placeholder = placeholder ? placeholder : "";
  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-lg ">
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
        placeholder={placeholder}
        {...extraProps}
      />
    </div>
  );
};

export default FullInput;
