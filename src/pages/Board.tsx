import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import Loader from "../components/ContentLoader";
import PageDiv from "../components/PageDiv";
import TaskCard from "../components/TaskCard";
import TaskCardParent from "../components/TaskCardParent";
import TaskModal from "../components/TaskModal";
import { BoardType } from "../types/boards";
import { StatusTask } from "../types/tasks";
import { request } from "../utils/api";
import toast from "../utils/toast";

const Board = ({ id }: { id: number }) => {
  const [board, setBoard] = useState<BoardType>();
  const [loading, setLoading] = useState(true);
  const [todo, setTodo] = useState<StatusTask>();
  const [progress, setProgress] = useState<StatusTask>();
  const [done, setDone] = useState<StatusTask>();
  const [open, setOpen] = useState(false);
  const [update, setUpdate]  = useState(false);
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

  return (
      <PageDiv heading={board?.title!} buttonName="New Task" buttonCB={() => {
            setOpen(true);
          }} >
      <div className="grid grid-cols-3 gap-4">
        {[todo, progress, done].map((d, i) => {
          return loading ? (
            <Loader key={i} />
          ) : (
            d && (
              <TaskCardParent key={i} heading={d.heading} count={d.count}>
                {d.tasks.length > 0 ?
                  d.tasks.map((t, i) => {
                    return (
                      <><TaskCard
                        key={i}
                        boardId={id}
                        id={t.id!}
                        title={t.title}
                        description={t.description!}
                        priority={t.priority}
                        update={update}
                        status={t.status}
                        setUpdate={setUpdate}
                      /></>
                    );
                  }): <span className="bold italic opacity-50 text-lg">No tasks found</span>}
              </TaskCardParent>
            )
          );
        })}
      </div>
      <TaskModal update={update} setUpdate={setUpdate} boardId={id} open={open} setOpen={setOpen} />
      </PageDiv>
  );
};

export default Board;
