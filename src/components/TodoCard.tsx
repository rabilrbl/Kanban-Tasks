import React, { useState } from "react";
import { Task } from "../types/tasks";
import { request } from "../utils/api";
import toast from "../utils/toast";
import DotMenu from "./DotMenu";
import SmallBadge from "./SmallBadge";
import TaskModal from "./TaskModal";

type Props = {
  update: boolean;
  setUpdate: (update: boolean) => void;
  task: Task;
  onDone: (id: number, status: "completed" | "pending") => void;
};

const TodoCard = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const fade = props.task.status === "completed" ? "opacity-50 line-through decoration-2" : "";
  return (
    <div>
      <TaskModal
        update={props.update}
        setUpdate={props.setUpdate}
        mode="edit"
        boardId={props.task.board!}
        id={props.task.id}
        open={editOpen}
        setOpen={setEditOpen}
        title={props.task.title}
        description={props.task.description}
        status={props.task.status}
        priority={props.task.priority}
      />
      <div className={"flex flex-col p-4 space-y-3 min-h-[12rem] text-gray-50 bg-gray-800 drop-shadow-lg rounded-xl " + fade}>
          <div className="flex items-center justify-between">
              <SmallBadge text={props.task.priority} />
              <input type="checkbox" checked={props.task.status === "completed"} className="h-6 w-6 rounded-full focus:border-none focus:outline-none focus:ring-gray-800" onChange={(e) => {
                  if(e.target.checked) {
                    props.onDone && props.task.id && props.onDone(props.task.id,"completed");
                } else {
                    props.onDone && props.task.id && props.onDone(props.task.id,"pending");
                }
              }} />
          </div>
        <h3>{props.task.title}</h3>
        <div className="flex flex-col justify-start">
          <p className="text-sm">
            {props.task.description ? (
              props.task.description
            ) : (
              <span className="italic bold opacity-50">
                No description provided.
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center justify-between fixed bottom-2 right-4">
          <DotMenu
            open={open}
            setOpen={setOpen}
            setEditOpen={setEditOpen}
            deleteCB={() => {
              setOpen(false);
              const r = request.delete(
                `/boards/${props.task.board}/tasks/${props.task.id}`
              );
              toast
                .promise(r, {
                  pending: "Archiving props.task...",
                  success: "Task archived",
                  error: "Failed to archive task",
                })
                .then(() => {
                  props.setUpdate(!props.update);
                });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
