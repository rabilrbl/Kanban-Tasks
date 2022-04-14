import React from "react";

const Button = ({
  type,
  children,
  className,
  disabled,
}: {
  type?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) => {
  switch (type) {
    case "fullGray":
      return (
        <div>
          <button className={"w-full px-4 py-2 bg-gray-700 rounded-md text-gray-50 hover:bg-gray-600 "+className} disabled={disabled}>
            {children}
          </button>
        </div>
      );
    default:
      return (
        <div>
          <button className={className} disabled={disabled}>
            {children}
          </button>
        </div>
      );
  }
};

export default Button;
