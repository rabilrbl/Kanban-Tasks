import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Loader from "../components/ContentLoader";
import TaskCard from "../components/TaskCard";
import TaskCardParent from "../components/TaskCardParent";
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
      .get(`/tasks/?board=${id}&status=pending`)
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
  }, [id]);

  useEffect(() => {
    request
      .get(`/tasks/?board=${id}&status=in_progress`)
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
  }, [id]);

  useEffect(() => {
    request
      .get(`/tasks/?board=${id}&status=completed`)
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
  }, [id]);

  return (
    <div className="space-y-5">
      <h1>{board?.title}</h1>
      <div className="flex items-center">
        <Button
          className="ml-auto order-last"
          type="newBoard"
          onClick={() => {
            toast.info("Button clicked");
          }}
        >
          New Task
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[todo, progress, done].map((d, i) => {
          return loading ? (
            <Loader />
          ) : (
            d && (
              <TaskCardParent key={i} heading={d.heading} count={d.count}>
                {d.tasks.length > 0 ?
                  d.tasks.map((t, i) => {
                    return (
                      <TaskCard
                        key={i}
                        title={t.title}
                        description={t.description!}
                        priority={t.priority}
                      />
                    );
                  }): <span className="bold italic opacity-50 text-lg">No tasks found</span>}
              </TaskCardParent>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Board;
