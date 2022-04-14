import React from "react";

const FullInput = ({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  ...extraProps
}: {
  label?: string;
  type?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        value={value}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
        placeholder={placeholder}
        onChange={onChange}
        {...extraProps}
      />
    </div>
  );
};

export default FullInput;
