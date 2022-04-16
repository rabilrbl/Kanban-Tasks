import React, { useState } from "react";
import { toast } from "react-toastify";
import { priority, status } from "../types/tasks";
import { request } from "../utils/api";
import DotMenu from "./DotMenu";
import SmallBadge from "./SmallBadge";
import TaskModal from "./TaskModal";

type Props = {
  id: number;
  boardId: number;
  title: string;
  description: string;
  priority: priority;
  status: status;
  update: boolean;
  setUpdate: (update: boolean) => void;
};

const TaskCard = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  return (
    <div>
      <TaskModal update={props.update} setUpdate={props.setUpdate} mode="edit" boardId={props.boardId} id={props.id} open={editOpen} setOpen={setEditOpen} title={props.title} description={props.description} status={props.status} priority={props.priority} />
      <div className="flex flex-col p-4 space-y-3 min-h-[12rem] text-gray-50 bg-gray-800 drop-shadow-lg rounded-xl">
        <div className="flex items-center justify-between">
          <SmallBadge text={props.priority} />
          <DotMenu
            open={open}
            setOpen={setOpen}
            setEditOpen={setEditOpen}
            deleteCB={() => {
              setOpen(false);
              const r = request.delete(`/boards/${props.boardId}/tasks/${props.id}`);
              toast
                .promise(r, {
                  pending: "Archiving task...",
                  success: "Task archived",
                  error: "Failed to archive task",
                })
                .then(() => {
                  props.setUpdate(!props.update);
                });
            }}
          />
        </div>
        <h3>{props.title}</h3>
        <div className="flex flex-col justify-start">
          <p className="text-sm">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
