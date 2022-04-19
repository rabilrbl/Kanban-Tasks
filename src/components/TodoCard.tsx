import React, { useState } from "react";
import { GridProps } from "../types/tasks";
import { markTaskDeleted } from "../utils/task";
import DotMenu from "./DotMenu";
import SmallBadge from "./SmallBadge";
import TaskModal from "./TaskModal";
import TodoCheckbox from "./TodoCheckbox";

const TodoCard = (props: GridProps) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const fade =
    props.task.completed === true
      ? "opacity-60 line-through decoration-2"
      : "";
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
      <div
        className={
          "flex flex-col p-4 space-y-3 min-w-fit min-h-[12rem] text-gray-50 bg-gray-800 drop-shadow-lg rounded-xl " +
          fade
        }
      >
        <div className="flex items-center justify-between">
          <SmallBadge text={props.task.priority} />
          <TodoCheckbox task={props.task} onDone={props.onDone} />
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
        <div className="flex items-center justify-end z-50 bottom-2 right-4">
          <DotMenu
            open={open}
            setOpen={setOpen}
            setEditOpen={setEditOpen}
            deleteCB={() => {
              markTaskDeleted({
                setOpen: setOpen,
                task: props.task,
                setUpdate: props.setUpdate,
                update: props.update,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
