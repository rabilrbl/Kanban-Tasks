import React from "react";

const UnderlineTabs = (props: {
  navLinks: {
    name: string;
    onClick: () => void;
  }[];
  activeTab: string;
}) => {
  return (
    <div className="text-sm font-medium text-center text-gray-400 border-b-2">
      <ul className="flex flex-wrap ">
        {props.navLinks.map((nav, index) => {
          return (
            <li className="mr-2" key={index}>
              <button
                onClick={nav.onClick}
                className={
                  props.activeTab === nav.name
                    ? "inline-block p-4 text-gray-600  font-semibold border-b-4 rounded-b-sm border-gray-600"
                    : "inline-block p-4 font-semibold  hover:text-gray-600"
                }
              >
                {nav.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UnderlineTabs;
