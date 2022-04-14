import React from "react";
import { clearAuthTokens } from "axios-jwt";
import { Redirect } from "raviger";

const Logout = () => {
  React.useEffect(() => {
    clearAuthTokens();
  }, []);
  return <Redirect to="/login" />;
};

export default Logout;
