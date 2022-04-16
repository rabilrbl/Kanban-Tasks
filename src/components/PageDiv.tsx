import React from "react";
import Button from "./Button";

type Props = {
  heading: string;
  buttonName: string;
  buttonCB: () => void;
  children: React.ReactNode;
  extras?: React.ReactNode;
};

const PageDiv = (props: Props) => {
  return (
    <div className="space-y-5">
      <h1>{props.heading}</h1>
      <div className="flex items-center">
        <div className="ml-auto order-last flex items-center">
          <Button className="" type="newBoard" onClick={props.buttonCB}>
            {props.buttonName}
          </Button>
          {props.extras}
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default PageDiv;
