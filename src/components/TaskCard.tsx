import React from 'react'
import SmallBadge from './SmallBadge'

type Props = {
    title: string,
    description: string,
    priority: string,
}

const TaskCard = (props: Props) => {
  return (
    <div
              className="flex flex-col p-4 space-y-3 min-h-[12rem] text-gray-50 bg-gray-800 drop-shadow-lg rounded-xl"
            >
                <SmallBadge text={props.priority} />
              <h3>{props.title}</h3>
              <div className="flex flex-col justify-start">
                <p className="text-sm">{props.description}</p>
              </div>
            </div>
  )
}

export default TaskCard