import { Task } from "../types/tasks";
import { request } from "./api";
import toast from "./toast";

export const markTaskDeleted = ({
  setOpen,
  task,
  update,
  setUpdate,
}: {
  setOpen: (open: boolean) => void;
  task: Task;
  update: boolean;
  setUpdate: (update: boolean) => void;
}) => {
  setOpen(false);
  const r = request.delete(`/boards/${task.board}/tasks/${task.id}`);
  toast
    .promise(r, {
      pending: "Archiving task...",
      success: "Task archived",
      error: "Failed to archive task",
    })
    .then(() => {
      setUpdate(!update);
    });
};
