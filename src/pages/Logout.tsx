import React from "react";
import { clearAuthTokens } from "axios-jwt";
import { navigate } from "raviger";
import toast from "../utils/toast";

const Logout = () => {
  React.useEffect(() => {
    clearAuthTokens();
    toast.success("Logged out", {
      toastId: "logout",
    });
    navigate("/login");
  }, []);
  return null;
};

export default Logout;
