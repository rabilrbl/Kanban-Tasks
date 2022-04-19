export type priority = "low" | "medium" | "high";
export type status = number;

export interface Task {
  id?: number;
  title: string;
  priority: priority;
  description?: string;
  completed?: boolean;
  date_created?: string;
  status: status;
  board?: number;
  board_title?: string;
}

export type Status = {
  id: number;
  title: string;
};

export interface StatusTask {
  count: number;
  tasks: Task[];
}

export type GridProps = {
  update: boolean;
  setUpdate: (update: boolean) => void;
  task: Task;
  onDone: (id: number, completed: boolean) => void;
};

export type TaskOptions = {
  id: number;
  title: string;
}[];

export type stagesType = {
  id: number;
  title: string;
  count: number;
  tasks: Task[];
};
