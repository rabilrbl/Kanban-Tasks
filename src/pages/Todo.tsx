import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import Loader from "../components/ContentLoader";
import PageDiv from "../components/PageDiv";
// import TaskModal from "../components/TaskModal";
import TodoCard from "../components/TodoCard";
import { Task } from "../types/tasks";
import { request } from "../utils/api";
import toast from "../utils/toast";

type Props = {};

const Todo = (props: Props) => {
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [doneLoading, setDoneLoading] = useState(true);
  const [todoTasks, setTodoTasks] = useState<Task[]>();
  const [doneTasks, setDoneTasks] = useState<Task[]>();
  // const [open, setOpen] = useState(false);

  useEffect(() => {
    request("/tasks/?status=pending")
      .then((response: AxiosResponse) => {
        if (response.status !== 200) {
          throw new Error("Failed to fetch tasks");
        }
        return response.data.results;
      })
      .then(setTodoTasks)
      .then(() => setUpdate(false))
      .catch((e) => {
        setUpdate(false);
        if (e) {
          toast.error(`Failed to fetch tasks: ${e.message}`, {
            toastId: "tasks-fetch-error",
          });
        }
      }).finally(() => setLoading(false));
  }, [update]);


  useEffect(() => {
    request("/tasks/?status=completed")
      .then((response: AxiosResponse) => {
        if (response.status !== 200) {
          throw new Error("Failed to fetch tasks");
        }
        return response.data.results;
      })
      .then(setDoneTasks)
      .then(() => setUpdate(false))
      .catch((e) => {
        setUpdate(false);
        if (e) {
          toast.error(`Failed to fetch tasks: ${e.message}`, {
            toastId: "tasks-fetch-error",
          });
        }
      }).finally(() => setDoneLoading(false));
  }, [update])

  const onDone = (id: number, status: "pending" | "completed") => {
    if(status === "pending"){
      let task = doneTasks?.find(task => task.id === id);
      setDoneTasks(doneTasks?.filter(task => task.id !== id));
      task!.status = status;
      todoTasks && setTodoTasks([...todoTasks, task!]);
    } else if (status === "completed") {
      let task = todoTasks?.find(task => task.id === id);
      setTodoTasks(todoTasks?.filter(task => task.id !== id));
      task!.status = status;
      doneTasks && setDoneTasks([...doneTasks, task!]);
    }
    request.patch(`/tasks/${id}/`, { status: status }).catch((e) => {
      if (e) {
        toast.error(`Failed to update task, Your changes won't be reflected on server. Reason: ${e.message}`, {
          toastId: "task-status-update-error",
        });
      }
    });
  }

  return (
    <PageDiv
      heading="Todo"
      buttonName="Add New"
      buttonCB={() => {
        toast.info("Hello there!");
      }}
    >
      <div className="grid grid-cols-3 gap-4">
      {loading ? <><Loader /><Loader /><Loader /></> : todoTasks?.map((task, i) => { return <React.Fragment key={i}>
        <TodoCard update={update} onDone={onDone} setUpdate={setUpdate} task={task} />
      </React.Fragment>})}
      {doneLoading ? <><Loader /><Loader /><Loader /></> : doneTasks?.map((task, i) => { return <React.Fragment key={i}>
        <TodoCard update={update} onDone={onDone} setUpdate={setUpdate} task={task} />
      </React.Fragment>})}

        </div>

        {/* <TaskModal update={update} setUpdate={setUpdate} boardId={tasks[0].id!} open={open} setOpen={setOpen} todoOnly={true} /> */}
    </PageDiv>
  );
};

export default Todo;
