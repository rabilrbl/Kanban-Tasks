import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import BoardCard from "../components/BoardCard";
import Button from "../components/Button";
import { BoardType, BoardList } from "../types/boards";
import { request } from "../utils/api";
import toast from "../utils/toast";

function Boards() {
  const [boards, setBoards] = useState<BoardList>();
  const initRef = React.useRef(false);

  useEffect(() => {
    if (initRef.current) {
        request("/boards/")
          .then((response: AxiosResponse) => {
            if (response.status !== 200) {
              throw new Error("Failed to fetch boards");
            }
            return response.data;
          })
          .then(setBoards)
          .catch((e) => {
            if (e) {
              toast.error(`Failed to fetch boards: ${e.message}`, {
                toastId: "boards-fetch-error",
              });
            }
          });
    } else {
      initRef.current = true;
    }
  }, []);

  return (
    <div className="space-y-5">
      <h1>My Boards</h1>
      <div>
          <Button type="fullGray">Create Board</Button>
      </div>
      <div className="grid grid-cols-4 grid-flow-col gap-4">
        {boards && boards.results.length > 0 ? (
          boards.results.map((board: BoardType) => {
            return (
              <BoardCard
                title={board.title}
                description={board.description}
                url={"#"}
                key={board.id}
              />
            );
          })
        ) : (
          <h2>No Boards Available</h2>
        )}
      </div>
    </div>
  );
}

export default Boards;
