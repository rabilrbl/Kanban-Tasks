import { Link } from "raviger";
import React from "react";
import { request } from "../utils/api";
import toast from "../utils/toast";
import BoardModal from "./BoardModal";
import Button from "./Button";
import Edit from "./icons/Edit";
import ThreeDots from "./icons/ThreeDots";
import Trash from "./icons/Trash";

interface BoardCardProps {
  id: number;
  title: string;
  description?: string;
  url: string;
  update: boolean;
  setUpdate: (update: boolean) => void;
}

const BoardCard = ({ title, description, url, id,  update, setUpdate }: BoardCardProps) => {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  return (
    <div>
      <BoardModal update={update} setUpdate={setUpdate} open={editOpen} setOpen={setEditOpen} mode="edit" id={id} title={title} description={description} />
      <div className="block px-6 py-4 w-full max-w-sm min-h-[10rem] rounded-lg border shadow-md bg-gray-800 border-gray-700 hover:bg-gray-700 space-y-4 drop-shadow-xl">
        <div className="flex justify-end">
          <div className="relative">
            <Button
              className="ml-auto order-last"
              onClick={() => setOpen(!open)}
            >
              <ThreeDots />
            </Button>
            {open && (
              <div className="absolute  right-0 bg-gray-800 text-white border rounded shadow-xl text-sm -mt-2">
                <ul className="p-2 space-y-1">
                  <li>
                    <button className="flex items-center hover:font-bold" onClick={() => {
                      setOpen(false);
                      setEditOpen(true);
                    }}>
                      <Edit />
                      &nbsp;Edit
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center hover:font-bold overflow-hidden" onClick={() =>{
                      setOpen(false);
                      const r = request.delete(`/boards/${id}`);
                      toast.promise(r, {
                        pending: "Deleting board...",
                        success: "Board deleted",
                        error: "Failed to delete board",
                      }).then(() => {
                        setUpdate(!update);
                      })
                    }}>
                      <Trash />
                      &nbsp;Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <Link href={url} className="">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {title}
          </h5>
          <p className="text-gray-200 text-ellipse overflow-hidden">
            {description ? (
              description
            ) : (
              <i className="opacity-50">No description provided</i>
            )}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BoardCard;
