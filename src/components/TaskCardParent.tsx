import React, { useState } from "react";
import { DroppableProvided } from "@react-forked/dnd";
import DotMenu from "./DotMenu";
import toast from "../utils/toast";
import { request } from "../utils/api";
import StageModal from "./StageModal";

type Props = {
  heading: string;
  count: number;
  children: React.ReactNode;
  provided: DroppableProvided;
  boardId: number;
  id: number;
  update: boolean;
  setUpdate: (update: boolean) => void;
};

const TaskCardParent = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  return (
    <div
      ref={props.provided.innerRef}
      className={
        "border-2 border-gray-500 shadow-lg h-full min-h-[30rem] px-4 py-3 rounded-lg w-full "
      }
      {...props.provided.droppableProps}
    >
      <div className="flex items-center pb-4 border-b-2 border-gray-500">
        <h4>{props.heading}</h4>
        <span className="inline-flex ml-4 items-center px-2.5 py-1 rounded-full mr-2 text-sm font-semibold bg-gray-800 text-gray-100 drop-shadow-lg">
          {props.count}
        </span>
        <div className="ml-auto order-last">
          <DotMenu
            open={open}
            setOpen={setOpen}
            setEditOpen={setEditOpen}
            deleteCB={() => {
              setOpen(false);
              const r = request.delete(
                `/boards/${props.boardId}/status/${props.id}/`
              );
              toast
                .promise(r, {
                  pending: "Archiving stage...",
                  success: "Stage archived",
                  error: "Failed to archive stage",
                })
                .then(() => {
                  props.setUpdate(!props.update);
                });
            }}
          />
        </div>
      </div>
      <div className="mt-4 space-y-5">{props.children}</div>
      {props.provided.placeholder}
      <StageModal
        edit={true}
        id={props.id}
        status={props.heading}
        boardId={props.boardId}
        update={props.update}
        setUpdate={props.setUpdate}
        open={editOpen}
        setOpen={setEditOpen}
      />
    </div>
  );
};

export default TaskCardParent;
