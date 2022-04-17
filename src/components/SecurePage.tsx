import { isLoggedIn } from "axios-jwt";
import { navigate } from "raviger";
import React from "react";
import PageNotFound from "../pages/PageNotFound";
import toast from "../utils/toast";

type Props = { children: JSX.Element };

const SecurePage = (props: Props) => {
  if (isLoggedIn()) {
    return props.children;
  } else {
    toast.warning("You are not logged in", {
      toastId: "not-logged-in",
    });
    navigate("/login");
  }
  return <PageNotFound />;
};

export default SecurePage;
