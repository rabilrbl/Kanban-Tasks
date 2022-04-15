import React from 'react'

type Props = {
    text: string
}

const SmallBadge = (props: Props) => {
  return (
    <div>
        <span className="text-xs capitalize font-semibold px-2.5 py-0.5 rounded bg-gray-400 text-gray-800">
                          {props.text}
                        </span>
    </div>
  )
}

export default SmallBadge