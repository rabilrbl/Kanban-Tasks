import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import BoardCard from "../components/BoardCard";
import BoardModal from "../components/BoardModal";
import Loader from "../components/ContentLoader";
import GridFlow from "../components/GridFlow";
import PageDiv from "../components/PageDiv";
import { BoardType, BoardList } from "../types/boards";
import { request } from "../utils/api";
import toast from "../utils/toast";

function Boards() {
  const [boards, setBoards] = useState<BoardList>();
  const [loading, setLoading] = React.useState(true);
  const [update, setUpdate] = React.useState(false);

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
    <PageDiv
      heading="My Board"
      buttonName="Create Board"
      buttonCB={() => {
        setOpen(true);
      }}
    >
      <GridFlow>
        {loading ? (
          <>
            <Loader />
            <Loader />
            <Loader />
          </>
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
      </GridFlow>
      <BoardModal
        open={open}
        setOpen={setOpen}
        update={update}
        setUpdate={setUpdate}
      />
    </PageDiv>
  );
}

export default Boards;
