import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { priority, status, TaskOptions } from "../types/tasks";
import { Task } from "../types/tasks";
import { request } from "../utils/api";
import toast from "../utils/toast";
import FullInput from "./FullInput";
import Modal from "./Modal";
import ModalForm from "./ModalForm";

type Props = {
  mode?: "edit";
  boardId: number;
  id?: number;
  title?: string;
  description?: string;
  status?: status;
  priority?: priority;
  open: boolean;
  setOpen: (open: boolean) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  todoOnly?: boolean;
};

const TaskModal = (props: Props) => {
  const {
    mode,
    open,
    setOpen,
    boardId,
    id,
    title,
    description,
    status,
    priority,
    update,
    setUpdate,
    todoOnly,
  } = props;

  const [task, setTask] = useState<Task>({
    title: title ? title : "",
    description: description ? description : "",
    status: status!,
    priority: priority ? priority : "low",
    board: boardId,
  });

  const [options, setOptions] = useState<TaskOptions>();
  const [statusOption, setStatusOption] = useState<TaskOptions>();

  useEffect(() => {
    if (todoOnly) {
      request
        .get("/list/boards/")
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            setOptions(response.data.boards);
            response.data.boards.length > 0 &&
              setTask((t) => ({ ...t, board: response.data.boards[0].id }));
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to fetch boards list from server. You may face errors when creating form! Reason: ${err}`
          );
        });
    }
  }, [todoOnly]);

  useEffect(() => {
    !todoOnly ? request
        .get(`/boards/${boardId}/status/`)
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            setStatusOption(response.data.results);
            response.data.results.length > 0 &&
              setTask((t) => ({ ...t, status: response.data.results[0].id }));
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to fetch boards list from server. You may face errors when creating form! Reason: ${err}`
          );
        }) : request
        .get(`/status/`)
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            setStatusOption(response.data.results);
            response.data.results.length > 0 &&
              setTask((t) => ({ ...t, status: response.data.results[0].id }));
          }
        })
        .catch((err) => {
          toast.error(
            `Failed to fetch boards list from server. You may face errors when creating form! Reason: ${err}`
          );
        });
  },[boardId, todoOnly, update]);

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalForm
      onSubmit={(e) => {
        setOpen(false);
        e.preventDefault();
        if (mode && id) {
          const r = request
            .put(`/boards/${boardId}/tasks/${id}/`, task)
            .then(() => {
              setUpdate(!update);
            });
          toast.promise(r, {
            pending: "Updating task...",
            success: "Task updated successfully",
            error: "Failed to task board",
          });
        } else if (boardId) {
          const r = request
            .post(`/boards/${boardId}/tasks/`, task)
            .then((response) => {
              if (response.status === 201) {
                toast.success("Task created successfully");
                //   navigate(`/boards/${response.data.id}`);
                setOpen(false);
                setUpdate(!update);
              }
            })
            .catch((e) => {
              toast.error(`Failed to create task: ${e.message}`);
            });
          toast.promise(r, {
            pending: "Creating task...",
          });
        }
      }}
      >
        <h3>{mode ? "Edit Task" : "Create New Task"}</h3>
        <div>
          <FullInput
            name="title"
            type="text"
            label="Title"
            placeholder="Task Title"
            value={task.title}
            required={true}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>
        <div>
          <FullInput
            name="description"
            type="textarea"
            label="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Type pretty things to describe your task"
          />
        </div>
        <div>
          {<FullInput
            name="status"
            type="select"
            label="Stage"
            value={task.status ? task.status.toString() : ""}
            onChange={(e) =>
              setTask({ ...task, status: Number(e.target.value) })
            }
            options={statusOption?.map((o) => {
              return { label: o.title, value: o.id.toString() };
            })}
          />}
        </div>
        <div>
          <FullInput
            name="priority"
            type="select"
            label="Priority"
            value={task.priority}
            onChange={(e) =>
              setTask({ ...task, priority: e.target.value as priority })
            }
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ]}
          />
        </div>
        {todoOnly && (
          <div>
            <FullInput
              name="board"
              type="select"
              label="Board"
              value={task.board?.toString()}
              required={true}
              onChange={(e) =>
                setTask({ ...task, board: Number(e.target.value) })
              }
              options={options?.map((o) => {
                return { label: o.title, value: o.id.toString() };
              })}
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full text-white bg-zinc-800 hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {mode ? "Update Task" : "Create Task"}
        </button>
      </ModalForm>
    </Modal>
  );
};

export default TaskModal;
