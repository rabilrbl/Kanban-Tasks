import React, { useState } from "react";
import { BoardType } from "../types/boards";
import { request } from "../utils/api";
import toast from "../utils/toast";
import FullInput from "./FullInput";
import Modal from "./Modal";

const BoardModal = ({
  mode,
  open,
  setOpen,
  id,
  title,
  description,
  update,
  setUpdate,
}: {
  mode?: "edit";
  id?: number;
  title?: string;
  description?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
}) => {
  const [newBoard, setNewBoard] = useState<Omit<BoardType, "id">>({
    title: title ? title : "",
    description: description ? description : "",
  });

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <form
        className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (mode) {
            const r = request.put(`/boards/${id}/`, newBoard).then(() => {
                setUpdate(!update)
            });
            toast.promise(r, {
              pending: "Updating board...",
              success: "Board updated successfully",
              error: "Failed to update board",
            }).then(() => {
                setOpen(false);
            });
          } else {
            const r = request
              .post("/boards/", newBoard)
              .then((response) => {
                if (response.status === 201) {
                  toast.success("Board created successfully");
                //   navigate(`/boards/${response.data.id}`);
                    setOpen(false);
                  setUpdate(!update);
                }
              })
              .catch((e) => {
                toast.error(`Failed to create board: ${e.message}`);
              });
            toast.promise(r, {
              pending: "Creating board...",
            });
          }
        }}
      >
        <h3>
          {mode ? "Edit Board" : "Create New Board"}
        </h3>
        <div>
        <FullInput
              name="title"
              type="text"
              label="Title"
              placeholder="Storming Board"
              value={newBoard.title}
              onChange={(e) =>
                setNewBoard({ ...newBoard, title: e.target.value })
              }
            />
        </div>
        <div>
        <FullInput
              name="description"
              type="textarea"
              label="Description"
              value={newBoard.description}
            onChange={(e) =>
              setNewBoard({ ...newBoard, description: e.target.value })
            }
            placeholder="Type pretty things to describe your board"
            />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-zinc-800 hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {mode ? "Update Board" : "Create Board"}
        </button>
      </form>
    </Modal>
  );
};

export default BoardModal;
