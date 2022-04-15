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
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
      {type !== "textarea" ? <input
        name={name}
        type={type}
        value={value}
        className="w-full px-4 py-2 drop-shadow-lg border text-gray-800 font-medium border-none border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
        placeholder={placeholder}
        onChange={onChange}
        {...extraProps}
      />: (
        <textarea
          name={name}
          value={value}
          className="w-full px-4 py-2 drop-shadow-lg border text-gray-800 font-medium border-none border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
          placeholder={placeholder}
          onChange={onChange}
          {...extraProps}
        />
      )}
    </div>
  );
};

export default FullInput;
