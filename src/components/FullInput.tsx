import React from "react";

type Props = {
  label?: string;
  type?: string;
  name: string;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  options?: {
    label: string;
    value: string;
  }[];
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
};

const FullInput = (props: Props) => {
  let {
    label,
    name,
    type,
    value,
    placeholder,
    onChange,
    required,
    options,
    ...extraProps
  } = props;
  type = type ? type : "text";
  placeholder = placeholder ? placeholder : "";
  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-lg ">
          {label}
        </label>
      )}
      {(type === "textarea" && (
        <textarea
          name={name}
          value={value}
          className="w-full px-4 py-2 drop-shadow-lg text-gray-800 font-medium border-2 focus:border-gray-200 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          {...extraProps}
        />
      )) ||
        (type === "select" && (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-2 drop-shadow-lg text-gray-800 font-medium border-2 focus:border-gray-200 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
          >
            {options?.map((op, i) => (
              <option key={i} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        )) || (
          <input
            name={name}
            type={type}
            value={value}
            className="w-full px-4 py-2 drop-shadow-lg text-gray-800 font-medium border-2 focus:border-gray-200 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            {...extraProps}
          />
        )}
    </div>
  );
};

export default FullInput;
