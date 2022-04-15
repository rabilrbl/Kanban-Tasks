import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import BoardCard from "../components/BoardCard";
import BoardModal from "../components/BoardModal";
import Button from "../components/Button";
import Loader from "../components/ContentLoader";
import { BoardType, BoardList } from "../types/boards";
import { request } from "../utils/api";
import toast from "../utils/toast";

function Boards() {
  const [boards, setBoards] = useState<BoardList>();
  const [loading, setLoading] = React.useState(true);
  const[update, setUpdate] = React.useState(false);

  useEffect(() => {
    request("/boards/")
      .then((response: AxiosResponse) => {
        if (response.status !== 200) {
          throw new Error("Failed to fetch boards");
        }
        return response.data;
      })
      .then(setBoards)
      .then(() => setLoading(false))
      .catch((e) => {
        setLoading(false);
        if (e) {
          toast.error(`Failed to fetch boards: ${e.message}`, {
            toastId: "boards-fetch-error",
          });
        }
      });
  }, [update]);

  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-5">
      <h1>My Boards</h1>
      <div className="flex items-center">
        <Button
          className="ml-auto order-last"
          type="newBoard"
          onClick={() => {
            setOpen(true);
          }}
        >
          Create Board
        </Button>
      </div>
      <div className="grid grid-cols-3 grid-flow-row gap-4">
        {loading ? (
          <Loader />
          ) : boards && boards.results.length > 0 ? (
            boards.results.map((board: BoardType) => {
              return (
              <BoardCard
              id={board.id}
              title={board.title}
              description={board.description}
              url={`/board/${board.id}`}
              key={board.id}
              update={update}
              setUpdate={setUpdate}
              />
              );
            })
            ) : (
              <h4>No Boards Available</h4>
              )}
      </div>
      <BoardModal open={open} setOpen={setOpen} update={update} setUpdate={setUpdate} />
    </div>
  );
}

export default Boards;
