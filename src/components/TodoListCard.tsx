import React, { useState } from "react";
import { GridProps } from "../types/tasks";
import { markTaskDeleted } from "../utils/task";
import DotMenu from "./DotMenu";
import SmallBadge from "./SmallBadge";
import TaskModal from "./TaskModal";
import TodoCheckbox from "./TodoCheckbox";

const TodoListCard = (props: GridProps) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const fade =
    props.task.status === "completed"
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
          "py-6 px-8 grid grid-cols-4  bg-gray-800 text-gray-50 rounded-2xl drop-shadow-lg hover:bg-gray-700 cursor-pointer shadow-lg " +
          fade
        }
      >
        <div className="flex items-center">
          <TodoCheckbox task={props.task} onDone={props.onDone} />
        </div>
        <div className="">
          <h4 className="">{props.task.title}</h4>
          <p className="text-sm">{props.task.description ? (
              props.task.description
            ) : (
              <span className="italic bold opacity-50">
                No description provided.
              </span>
            )}</p>
        </div>
        <div className="ml-auto order-1 flex items-center">
          <SmallBadge text={props.task.priority} />
        </div>
        <div className="ml-auto order-last flex items-center">
          <div className="relative">
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
    </div>
  );
};

export default TodoListCard;
