import React from "react";

type Props = {
  children: React.ReactNode;
};

const GridFlowHorz = (props: Props) => {
  return (
    <div className="w-screen overflow-x-auto absolute">
      <div className="grid grid-cols-4 grid-flow-col gap-4">
        {props.children}
      </div>
    </div>
  );
};

export default GridFlowHorz;
