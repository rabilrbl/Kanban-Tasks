import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import Loader from "../components/ContentLoader";
import GridFlow from "../components/GridFlow";
import Block from "../components/icons/Block";
import List from "../components/icons/List";
import PageDiv from "../components/PageDiv";
import TaskModal from "../components/TaskModal";
// import TaskModal from "../components/TaskModal";
import TodoCard from "../components/TodoCard";
import TodoListCard from "../components/TodoListCard";
import { Task } from "../types/tasks";
import { request } from "../utils/api";
import toast from "../utils/toast";

type Props = {};

const Todo = (props: Props) => {
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    request("/tasks/")
      .then((response: AxiosResponse) => {
        if (response.status !== 200) {
          throw new Error("Failed to fetch tasks");
        }
        return response.data.results;
      })
      .then(setTasks)
      .then(() => setUpdate(false))
      .catch((e) => {
        setUpdate(false);
        if (e) {
          toast.error(`Failed to fetch tasks: ${e.message}`, {
            toastId: "tasks-fetch-error",
          });
        }
      })
      .finally(() => setLoading(false));
  }, [update]);

  const onDone = (id: number, completed: boolean) => {
    setTasks((tasks) =>
      tasks!.map((task) => {
        if (task.id === id) {
          task.completed = completed;
        }
        return task;
      })
    );
    request.patch(`/tasks/${id}/`, { completed: completed }).catch((e) => {
      if (e) {
        toast.error(
          `Failed to update task, your changes may not be reflected on server: ${e.message}`,
          {
            toastId: "task-update-error",
          }
        );
      }
    });
  };

  return (
    <PageDiv
      heading="Todo"
      buttonName="Add New"
      buttonCB={() => {
        setOpen(true);
      }}
      extras={
        <>
          <button
            type="button"
            aria-label="Grid View"
            className={
              "py-2 px-4 text-sm font-medium text-gray-100 rounded-l-lg border border-gray-200 hover:bg-gray-700 hover:bold " +
              (view === "grid" ? "bg-gray-800" : "bg-gray-600")
            }
            onClick={() => setView("grid")}
          >
            <Block />
          </button>
          <button
            type="button"
            aria-label="List View"
            className={
              "py-2 px-4 text-sm font-medium text-gray-100 rounded-r-md border border-gray-200 hover:bg-gray-700 hover:bold focus:z-10 " +
              (view === "list" ? "bg-gray-800" : "bg-gray-600")
            }
            onClick={() => setView("list")}
          >
            <List />
          </button>
        </>
      }
    >
      {view === "grid" && (
        <GridFlow>
          {loading ? (
            <>
              <Loader />
              <Loader />
              <Loader />
            </>
          ) : (
            tasks?.map((task, i) => {
              return (
                task.completed === false && (
                  <TodoCard
                    key={i}
                    update={update}
                    onDone={onDone}
                    setUpdate={setUpdate}
                    task={task}
                  />
                )
              );
            })
          )}
          {loading ? (
            <>
              <Loader />
              <Loader />
              <Loader />
            </>
          ) : (
            tasks?.map((task, i) => {
              return (
                task.completed === true && (
                  <TodoCard
                    key={i}
                    update={update}
                    onDone={onDone}
                    setUpdate={setUpdate}
                    task={task}
                  />
                )
              );
            })
          )}
        </GridFlow>
      )}

      {view === "list" && (
        <div className="grid grid-cols-1 gap-5">
          {loading ? (
            <>
              <Loader />
              <Loader />
              <Loader />
            </>
          ) : (
            tasks?.map((task, i) => {
              return (
                <TodoListCard
                  key={i}
                  update={update}
                  onDone={onDone}
                  setUpdate={setUpdate}
                  task={task}
                />
              );
            })
          )}
        </div>
      )}

      <TaskModal
        update={update}
        boardId={-1}
        setUpdate={setUpdate}
        open={open}
        setOpen={setOpen}
        todoOnly={true}
      />
    </PageDiv>
  );
};

export default Todo;
