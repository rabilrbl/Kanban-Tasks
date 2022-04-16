import React from 'react'
import Button from './Button';

type Props = {
    heading: string;
    buttonName: string;
    buttonCB: () => void;
    children: React.ReactNode;
}

const PageDiv = (props: Props) => {
  return (
    <div className="space-y-5">
      <h1>{props.heading}</h1>
      <div className="flex items-center">
        <Button
          className="ml-auto order-last"
          type="newBoard"
          onClick={props.buttonCB}
        >
          {props.buttonName}
        </Button>
      </div>
      {props.children}
      </div>
  )
}

export default PageDiv