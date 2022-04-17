import React from 'react'
import { Task } from '../types/tasks';

type Props = {
    task: Task,
    onDone: (id: number, status: "pending" | "completed") => void,
}

const TodoCheckbox = (props: Props) => {
  return (
    <input type="checkbox" checked={props.task.status === "completed"} className="h-6 w-6 accent-gray-800 rounded-full focus:border-none focus:outline-none focus:ring-gray-800" onChange={(e) => {
        if(e.target.checked) {
          props.onDone && props.task.id && props.onDone(props.task.id,"completed");
      } else {
          props.onDone && props.task.id && props.onDone(props.task.id,"pending");
      }
    }} />
  )
}

export default TodoCheckbox