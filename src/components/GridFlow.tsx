import React from "react";

type Props = {
  children: React.ReactNode;
};

const GridFlow = (props: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-flow-col gap-4">
      {props.children}
    </div>
  );
};

export default GridFlow;
