import React from "react";

interface YesNoProps {
  yes: string;
  yesCB: () => void;
  no: string;
  message: string;
  setOpen: (open: boolean) => void;
}

const YesNoModal = (props: YesNoProps) => {
  const { yes, no, message, yesCB, setOpen} = props;
  return (
    <div>
      <div
        id="popup-modal"
        tabIndex={-1}
        className= "overflow-y-auto overflow-x-hidden"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-dark rounded-lg shadow">
            {/* <!-- Modal header --> */}
            {/* <!-- Modal body --> */}
            <div className="p-6 pt-0 text-center">
              <svg
                className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {message}
              </h3>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={yesCB}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                {yes}
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                {no}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YesNoModal;
