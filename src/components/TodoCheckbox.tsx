import React from "react";
import { Task } from "../types/tasks";

type Props = {
  task: Task;
  onDone: (id: number, completed: boolean) => void;
};

const TodoCheckbox = (props: Props) => {
  return (
    <input
      type="checkbox"
      checked={props.task.completed}
      className="h-6 w-6 text-gray-700 ring-2 ring-gray-50 rounded-full focus:border-none focus:outline-none focus:ring-gray-500"
      onChange={(e) => {
        if (e.target.checked) {
          props.onDone && props.task.id && props.onDone(props.task.id, true);
        } else {
          props.onDone && props.task.id && props.onDone(props.task.id, false);
        }
      }}
    />
  );
};

export default TodoCheckbox;
