import React from "react";

type Props = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ModalForm = (props: Props) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
    >
      {props.children}
    </form>
  );
};

export default ModalForm;
