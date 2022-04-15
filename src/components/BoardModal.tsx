import React, { useState } from "react";
import { BoardType } from "../types/boards";
import { request } from "../utils/api";
import toast from "../utils/toast";
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
        <h3 className="text-xl font-medium text-gray-900 ">
          {mode ? "Edit Board" : "Create New Board"}
        </h3>
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={newBoard.title}
            onChange={(e) =>
              setNewBoard({ ...newBoard, title: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full p-2.5"
            placeholder="Storming Board"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={newBoard.description}
            onChange={(e) =>
              setNewBoard({ ...newBoard, description: e.target.value })
            }
            placeholder="Type pretty things to describe your board"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full p-2.5 "
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {mode ? "Update Board" : "Create Board"}
        </button>
      </form>
    </Modal>
  );
};

export default BoardModal;
