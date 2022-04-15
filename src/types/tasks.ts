export interface Task {
    id?: number;
    title: string;
    priority: "low" | "medium" | "high";
    description?: string;
    date_created ?: string;
    status: "pending" | "in_progress" | "completed";
    board: {
        id: number;
        title: string;
    };
}

export type TaskItem = "To Do" | "On Progress" | "Done"

export interface StatusTask {
    heading: TaskItem;
    count: number;
    tasks: Task[];
}
