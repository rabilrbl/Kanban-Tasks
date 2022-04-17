import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import Loader from "../components/ContentLoader";
import PageDiv from "../components/PageDiv";
import TaskCard from "../components/TaskCard";
import TaskCardParent from "../components/TaskCardParent";
import TaskModal from "../components/TaskModal";
import { BoardType } from "../types/boards";
import { StatusTask, Task } from "../types/tasks";
import { request } from "../utils/api";
import toast from "../utils/toast";
import { DragDropContext, Draggable, Droppable } from "@react-forked/dnd";
import AlertInfo from "../components/AlertInfo";

const Board = ({ id }: { id: number }) => {
  const [board, setBoard] = useState<BoardType>();
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState<StatusTask>();
  const [progress, setProgress] = useState<StatusTask>();
  const [done, setDone] = useState<StatusTask>();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    request
      .get(`/boards/${id}/`)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .then(setBoard)
      .catch((e) => {
        if (e) {
          toast.error(`Failed to fetch boards: ${e.message}`, {
            toastId: "boards-fetch-error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    request
      .get(`/boards/${id}/tasks/?status=pending`)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .then((data) => {
        setTodo({
          heading: "To Do",
          count: data.count,
          tasks: data.results,
        });
      })
      .catch((e) => {
        if (e) {
          toast.error(`Failed to fetch tasks: ${e.message}`, {
            toastId: "tasks-fetch-error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, update]);

  useEffect(() => {
    request
      .get(`/boards/${id}/tasks/?status=in_progress`)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .then((data) => {
        setProgress({
          heading: "On Progress",
          count: data.count,
          tasks: data.results,
        });
      })
      .catch((e) => {
        if (e) {
          toast.error(`Failed to fetch tasks: ${e.message}`, {
            toastId: "tasks-fetch-error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, update]);

  useEffect(() => {
    request
      .get(`/boards/${id}/tasks/?status=completed`)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .then((data) => {
        setDone({
          heading: "Done",
          count: data.count,
          tasks: data.results,
        });
      })
      .catch((e) => {
        if (e) {
          toast.error(`Failed to fetch tasks: ${e.message}`, {
            toastId: "tasks-fetch-error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, update]);

  const renderDestination = (destination: string, task: Task) => {
    switch (destination) {
      case "todo":
        todo &&
          setTodo({
            ...todo,
            count: todo.count + 1,
            tasks: [...todo.tasks, task],
          });
        request
          .patch(`/tasks/${task.id}/`, {
            status: "pending",
          })
          .catch((e) => {
            toast.error(`Failed to update task: ${e.message}`, {
              toastId: "task-update-error",
            });
          });
        break;
      case "progress":
        progress &&
          setProgress({
            ...progress,
            count: progress.count + 1,
            tasks: [...progress.tasks, task],
          });
        request
          .patch(`/tasks/${task.id}/`, {
            status: "in_progress",
          })
          .catch((e) => {
            toast.error(`Failed to update task: ${e.message}`, {
              toastId: "task-update-error",
            });
          });
        break;
      case "done":
        done &&
          setDone({
            ...done,
            count: done.count + 1,
            tasks: [...done.tasks, task],
          });
        request
          .patch(`/tasks/${task.id}/`, {
            status: "completed",
          })
          .catch((e) => {
            toast.error(`Failed to update task: ${e.message}`, {
              toastId: "task-update-error",
            });
          });
        break;
      default:
        break;
    }
  };

  const onDropEnd = (result: any) => {
    const status = ["todo", "progress", "done"];
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const statusSource = status[source.droppableId];
      const statusDestination = status[destination.droppableId];
      const taskId = Number(result.draggableId);
      if (statusSource === "todo" && todo) {
        const task = todo.tasks.find((task) => task.id === taskId);
        if (!task) {
          console.log("task not found");
          return;
        }
        todo &&
          setTodo({
            ...todo,
            count: todo.count - 1,
            tasks: todo.tasks.filter((task) => task.id !== taskId),
          });
        renderDestination(statusDestination, task);
      } else if (statusSource === "progress" && progress) {
        const task = progress.tasks.find((task) => task.id === taskId);
        if (!task) {
          console.log("task not found");
          return;
        }
        progress &&
          setProgress({
            ...progress,
            count: progress.count - 1,
            tasks: progress.tasks.filter((task) => task.id !== taskId),
          });
        renderDestination(statusDestination, task);
      } else if (statusSource === "done" && done) {
        const task = done.tasks.find((task) => task.id === taskId);
        if (!task) {
          console.log("task not found");
          return;
        }
        done &&
          setDone({
            ...done,
            count: done.count - 1,
            tasks: done.tasks.filter((task) => task.id !== taskId),
          });
        renderDestination(statusDestination, task);
      }
    }
  };

  return (
    <PageDiv
      heading={board?.title!}
      buttonName="New Task"
      buttonCB={() => {
        setOpen(true);
      }}

      startExtras={
        <AlertInfo title="Tip: " message="Drag your tasks to the desired destination" />
      }
    >
      <div className="grid grid-cols-3 gap-4">
        <DragDropContext onDragEnd={onDropEnd}>
          {[todo, progress, done].map((d, i) => {
            return loading ? (
              <Loader key={i} />
            ) : (
              d && (
                <Droppable key={i} droppableId={i.toString()}>
                  {(provided) => (
                    <TaskCardParent
                      provided={provided}
                      heading={d.heading}
                      count={d.count}
                    >
                      {d.tasks.length > 0 ? (
                        d.tasks.map((t, i) => {
                          return (
                            <React.Fragment key={i}>
                              {
                                <Draggable
                                  key={t.id!.toString()}
                                  draggableId={t.id!.toString()}
                                  index={i}
                                >
                                  {(provided) => (
                                    <TaskCard
                                      boardId={id}
                                      id={t.id!}
                                      title={t.title}
                                      description={t.description!}
                                      priority={t.priority}
                                      update={update}
                                      status={t.status}
                                      setUpdate={setUpdate}
                                      provided={provided}
                                    />
                                  )}
                                </Draggable>
                              }
                            </React.Fragment>
                          );
                        })
                      ) : (
                        <span
                          key={i}
                          className="bold italic opacity-50 text-lg"
                        >
                          No tasks found
                        </span>
                      )}
                    </TaskCardParent>
                  )}
                </Droppable>
              )
            );
          })}
        </DragDropContext>
      </div>
      <TaskModal
        update={update}
        setUpdate={setUpdate}
        boardId={id}
        open={open}
        setOpen={setOpen}
      />
    </PageDiv>
  );
};

export default Board;
