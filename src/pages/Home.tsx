import React, { useEffect, useState } from "react";
import { greetingMessage } from "../utils/greet";
import moment from "moment";
import toast from "../utils/toast";
import { navigate } from "raviger";
import UnderlineTabs from "../components/UnderlineTabs";
import { Task, status, Status } from "../types/tasks";
import { request } from "../utils/api";
import { AxiosResponse } from "axios";
import Loader from "../components/ContentLoader";
import SmallBadge from "../components/SmallBadge";
import GridFlow from "../components/GridFlow";

const Home = () => {
  const [taskInfo, setTaskInfo] = useState<{
    user: string;
    tasks: {
      count: number;
      type: string;
    }[];
  }>();

  useEffect(() => {
    request
      .get("/count/")
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setTaskInfo({
            user: response.data.user,
            tasks: [
              {
                type: "Incomplete Tasks",
                count: Number(response.data.incomplete),
              },
              {
                type: "Completed Tasks",
                count: response.data.completed,
              },
              {
                type: "Total Tasks",
                count: response.data.total,
              },
            ],
          });
        }
      })
      .catch((error) => {
        toast.error(`Failed to fetch tasks: ${error.message}`, {
          toastId: "tasks-fetch-error",
        });
      });
  }, []);

  const [taskStatus, setTaskStatus] = useState<status>();
  const [stage, setStage] = useState<Status[]>();
  const [taskLoading, setTaskLoading] = useState(true);
  const [navLinks, setNavLinks] = useState<
    {
      name: string;
      onClick: () => void;
      id: number;
    }[]
  >();
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    request
      .get("/status/")
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setStage(response.data.results);
        }
      })
      .catch((e) => {
        if (e) {
          toast.error(`Failed to fetch tasks: ${e.message}`, {
            toastId: "tasks-fetch-error",
          });
        }
      });
  }, []);

  useEffect(() => {
    stage &&
      setNavLinks(
        stage.map((s) => ({
          name: s.title,
          onClick: () => setTaskStatus(s.id),
          id: s.id,
        }))
      );
    stage && stage.length > 0 ? setTaskStatus(stage[0].id) : setTaskLoading(false);
  }, [stage]);

  useEffect(() => {
    setTaskLoading(true);
    taskStatus &&
      request(`/tasks/?status=${taskStatus}`)
        .then((response: AxiosResponse) => {
          if (response.status !== 200) {
            throw new Error("Failed to fetch tasks");
          }
          return response.data.results;
        })
        .then(setTasks)
        .then(() => setTaskLoading(false))
        .catch((e) => {
          setTaskLoading(false);
          if (e) {
            toast.error(`Failed to fetch tasks: ${e.message}`, {
              toastId: "tasks-fetch-error",
            });
          }
        });
  }, [taskStatus]);

  return (
    <div className="space-y-8">
      <div>
        <h5>{moment().format("dddd[,] MMMM D")}</h5>
        <h2>
          {greetingMessage},{" "}
          <span className=" capitalize">{taskInfo?.user}</span>
        </h2>
      </div>
      <GridFlow>
        {taskInfo?.tasks.map((task, index) => {
          return (
            <div
              key={index}
              className="flex flex-col p-4 space-y-8 text-gray-50 bg-gray-800 drop-shadow-lg rounded-lg"
            >
              <h3>{task.type}</h3>
              <div className="flex flex-col justify-start">
                <h4 className="text-2xl">{task.count}</h4>
                <p className="text-sm">Task Count</p>
              </div>
            </div>
          );
        })}
      </GridFlow>
      <div className="space-y-4">
        <div>
          <h3>My Tasks</h3>
          {navLinks ? (
            <UnderlineTabs activeTab={taskStatus!} navLinks={navLinks} />
          ): <b>No Stages are available</b>}
        </div>
        <div className="grid grid-cols-1 gap-5">
          {taskLoading ? (
            <Loader />
          ) : tasks && tasks.length > 0 ? (
            tasks?.map((task) => {
              return (
                <div
                  key={task.id}
                  onClick={() => navigate(`/board/${task.board}`)}
                  className="py-4 px-8 flex items-center justify-start gap-2 bg-gray-800 text-gray-50 rounded-lg drop-shadow-lg hover:bg-gray-700 cursor-pointer"
                >
                  <h5 className="mr-5">{task.title}</h5>
                  <div className="flex items-center space-x-5">
                    <SmallBadge text={task.priority} />{" "}
                    <span className="text-sm">on {task.board_title}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <h5>No tasks found</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
