import React from "react";
import Button from "./Button";
import Edit from "./icons/Edit";
import ThreeDots from "./icons/ThreeDots";
import Trash from "./icons/Trash";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setEditOpen: (open: boolean) => void;
  deleteCB: () => void;
};

const DotMenu = (props: Props) => {
  const { open, setOpen, setEditOpen, deleteCB } = props;
  return (
    <div className="relative">
      <Button
        aria-label="Edit Options"
        className="ml-auto order-last "
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <ThreeDots />
      </Button>
      {open && (
        <div className="absolute z-50 right-0 bg-gray-800 w-24 text-white border rounded shadow-xl text-sm -mt-2">
          <ul className="p-2 space-y-1">
            <li>
              <button
                className="flex items-center hover:font-bold"
                aria-label="Edit"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  setEditOpen(true);
                }}
              >
                <Edit />
                &nbsp;Edit
              </button>
            </li>
            <li>
              <button
                className="flex items-center hover:font-bold overflow-hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCB();
                }}
                aria-label="Archive"
              >
                <Trash />
                &nbsp;Archive
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DotMenu;
