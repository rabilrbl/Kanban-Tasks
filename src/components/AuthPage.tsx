import React from "react";

const AuthPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen px-4 py-2 space-y-16">
        <h1>Kanban Forms</h1>
        <div className="w-full max-w-xl space-y-10">{children}</div>
      </div>
    </>
  );
};

export default AuthPage;
