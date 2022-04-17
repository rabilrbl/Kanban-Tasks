import React from 'react'
import {DroppableProvided} from "@react-forked/dnd"

type Props = {
    heading: string,
    count: number,
    children: React.ReactNode,
    provided: DroppableProvided
}

const TaskCardParent = (props: Props) => {
  return (
    <div ref={props.provided.innerRef} className={"border-2 border-gray-500 shadow-lg h-full min-h-[30rem] px-4 py-3 rounded-lg "} {...props.provided.droppableProps} >
              <div className="flex items-center pb-4 border-b-2 border-gray-500">
                <h4>{props.heading}</h4>
                <span className="inline-flex ml-4 items-center px-2.5 py-1 rounded-full mr-2 text-sm font-semibold bg-gray-800 text-gray-100 drop-shadow-lg">
                  {props.count}
                </span>
              </div>
              <div className="mt-4 space-y-5">
            {props.children}
              </div>
              {props.provided.placeholder}
            </div>
  )
}

export default TaskCardParent