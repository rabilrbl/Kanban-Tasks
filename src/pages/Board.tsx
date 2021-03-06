import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import Loader from "../components/ContentLoader";
import PageDiv from "../components/PageDiv";
import TaskCard from "../components/TaskCard";
import TaskCardParent from "../components/TaskCardParent";
import TaskModal from "../components/TaskModal";
import { BoardType } from "../types/boards";
import { stagesType } from "../types/tasks";
import { request } from "../utils/api";
import toast from "../utils/toast";
import { DragDropContext, Draggable, Droppable } from "@react-forked/dnd";
import AlertInfo from "../components/AlertInfo";
import GridFlow from "../components/GridFlow";
import Button from "../components/Button";
import StageModal from "../components/StageModal";

const Board = ({ id }: { id: number }) => {
  const [board, setBoard] = useState<BoardType>();
  const [loading, setLoading] = useState(true);
  const [stages, setStages] = useState<stagesType[]>();
  const [open, setOpen] = useState(false);
  const [stageOpen, setStageOpen] = useState(false);
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
      });
  }, [id]);

  useEffect(() => {
    request
      .get(`/list/status/${id}/`)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .then((data) => {
        setStages(data.results);
      })
      .then(() => setLoading(false))
      .catch((e) => {
        if (e) {
          toast.error(`Failed to fetch tasks: ${e.message}`, {
            toastId: "tasks-fetch-error",
          });
        }
      });
  }, [id, update]);

  const onDropEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const taskId = Number(result.draggableId);
      const destId = Number(destination.droppableId);
      const sourceId = Number(source.droppableId);
      setStages((prev) => {
        const newStages = [...prev!];
        const sourceStage = newStages.find((stage) => stage.id === sourceId);
        const destStage = newStages.find((stage) => stage.id === destId);
        const task = sourceStage!.tasks.find((task) => task.id === taskId);
        task!.status = destStage!.id;
        if (task && destStage) {
          const newTasks = [...destStage.tasks];
          newTasks.push(task);
          destStage.tasks = newTasks;
          destStage.count = newTasks.length;
          sourceStage!.tasks = sourceStage!.tasks.filter(
            (task) => task.id !== taskId
          );
          sourceStage!.count = sourceStage!.tasks.length;
          return newStages;
        }
        return prev;
      });
      request.patch(`/tasks/${taskId}/`, { status: destId }).catch((e) => {
        if (e) {
          toast.error(`Failed to update task: ${e.message}`, {
            toastId: "task-update-error",
          });
        }
      });
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
        <AlertInfo
          title="Tip: "
          message="Drag your tasks to the desired destination"
        />
      }
      extras={
        <Button className="" type="newStage" onClick={() => setStageOpen(true)}>
          Add Stage
        </Button>
      }
    >
      <GridFlow>
        <DragDropContext onDragEnd={onDropEnd}>
          {loading ? (
            <Loader />
          ) : (
            stages && stages.length ?
            stages.map((d, i) => {
              return (
                d && (
                  <Droppable key={i} droppableId={d.id.toString()}>
                    {(provided) => (
                      <TaskCardParent
                        provided={provided}
                        heading={d.title}
                        count={d.count}
                        boardId={id}
                        id={d.id}
                        update={update}
                        setUpdate={setUpdate}
                      >
                        {d.tasks.length > 0 ? (
                          d.tasks.map((t, i) => {
                            return (
                              <React.Fragment key={i}>
                                {
                                  <Draggable
                                    key={t.id?.toString()}
                                    draggableId={t.id!.toString()}
                                    index={i}
                                  >
                                    {(provided) =>
                                      t.status && (
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
                                      )
                                    }
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
            }): <h3>No Stages Found</h3>
          )}
        </DragDropContext>
      </GridFlow>
      <StageModal
        edit={false}
        boardId={id}
        update={update}
        setUpdate={setUpdate}
        open={stageOpen}
        setOpen={setStageOpen}
      />
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
