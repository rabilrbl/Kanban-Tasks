import { Link } from "raviger";
import React from "react";
import { request } from "../utils/api";
import toast from "../utils/toast";
import BoardModal from "./BoardModal";
import DotMenu from "./DotMenu";

interface BoardCardProps {
  id: number;
  title: string;
  description?: string;
  url: string;
  update: boolean;
  setUpdate: (update: boolean) => void;
}

const BoardCard = ({
  title,
  description,
  url,
  id,
  update,
  setUpdate,
}: BoardCardProps) => {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  return (
    <div>
      <BoardModal
        update={update}
        setUpdate={setUpdate}
        open={editOpen}
        setOpen={setEditOpen}
        mode="edit"
        id={id}
        title={title}
        description={description}
      />
      <div className="flex flex-col px-6 py-4 space-y-3 min-h-[12rem] text-gray-50 bg-gray-800 drop-shadow-lg rounded-xl">
        <div className="flex justify-end">
          <DotMenu
            open={open}
            setOpen={setOpen}
            setEditOpen={setEditOpen}
            deleteCB={() => {
              setOpen(false);
              const r = request.delete(`/boards/${id}`);
              toast
                .promise(r, {
                  pending: "Archiving board...",
                  success: "Board archived",
                  error: "Failed to archive board",
                })
                .then(() => {
                  setUpdate(!update);
                });
            }}
          />
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
