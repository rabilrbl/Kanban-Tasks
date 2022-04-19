import React, { useState } from 'react'
import { request } from '../utils/api'
import toast from '../utils/toast'
import FullInput from './FullInput'
import Modal from './Modal'
import ModalForm from './ModalForm'

type Props = {
  open: boolean,
  setOpen: (open: boolean) => void,
  update: boolean,
  setUpdate: (update: boolean) => void,
  boardId: number,
}

const StageModal = (props: Props) => {
  const [status,setStatus] = useState<string>("New");
  return (
    <Modal isOpen={props.open} onClose={() => props.setOpen(false)}>
        <ModalForm
          onSubmit={(e) => {
            e.preventDefault();
            props.setOpen(false);
            request.post(`/boards/${props.boardId}/status/`, {title: status}).then((response) => {
              if (response.status === 201) {
                toast.success("Created Stage");
                props.setUpdate(!props.update);
              }
            }).catch((err) => {
              toast.error("Failed to create stage");
            })
          }}
        >
          <FullInput
            name="status"
            type="text"
            label="Stage"
            placeholder="Stage name"
            value={status}
            required={true}
            onChange={(e) => setStatus(e.target.value)}
          />
          <button
          className="w-full text-white bg-zinc-800 hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Stage
        </button>
        </ModalForm>
    </Modal>
  )
}

export default StageModal;