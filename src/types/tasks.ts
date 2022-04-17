export type priority = "low" | "medium" | "high";
export type status = "pending" | "in_progress" | "completed";

export interface Task {
  id?: number;
  title: string;
  priority: priority;
  description?: string;
  date_created?: string;
  status: status;
  board?: number;
  board_title?: string;
}

export type TaskItem = "To Do" | "On Progress" | "Done";

export interface StatusTask {
  heading: TaskItem;
  count: number;
  tasks: Task[];
}

export type GridProps = {
  update: boolean;
  setUpdate: (update: boolean) => void;
  task: Task;
  onDone: (id: number, status: "completed" | "pending") => void;
};

export type TaskOptions = {
  id: number;
  title: string;
}[];
