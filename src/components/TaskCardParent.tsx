import React from 'react'

type Props = {
    heading: string,
    count: number,
    children: React.ReactNode
}

const TaskCardParent = (props: Props) => {
  return (
    <div className="border-2 border-gray-500 bg-gray-200 shadow-lg h-full min-h-[30rem] px-4 py-3 rounded-lg">
              <div className="flex items-center pb-4 border-b-2 border-gray-500">
                <h4>{props.heading}</h4>
                <span className="inline-flex ml-4 items-center px-2.5 py-1 rounded-full mr-2 text-sm font-semibold bg-gray-800 text-gray-100 drop-shadow-lg">
                  {props.count}
                </span>
              </div>
              <div className="mt-4 space-y-5">
            {props.children}
              </div>
            </div>
  )
}

export default TaskCardParent