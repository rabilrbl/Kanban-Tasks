import { AxiosResponse } from "axios";
import { setAuthTokens, isLoggedIn } from "axios-jwt";
import React, { useState } from "react";
import AuthPage from "../components/AuthPage";
import Button from "../components/Button";
import FullInput from "../components/FullInput";
import Spinner from "../components/icons/Spinner";
import { request } from "../utils/api";

const Login = () => {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  React.useEffect(() => {
    if (isLoggedIn()) {
      window.location.href = "/";
    }
  }, []);

  const [loading, setLoading] = useState(false);

  return (
    <AuthPage>
      <div>
        <h3>Log in</h3>
        <p>Enter your credentials to access your account</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          request
            .post("/token/", user)
            .then((response: AxiosResponse) => {
              if (response.status !== 200){
                throw new Error(
                  response.data.message
                )
              }
              setAuthTokens({
                accessToken: response.data.access,
                refreshToken: response.data.refresh,
              });
            })
            .then(() => {
              setLoading(false);
              window.location.href = "/";
            }).catch((e) => {
              setLoading(false);
              alert(e.message);
            });
        }}
      >
        <div className="space-y-4">
          <FullInput
            label="Username"
            name="username"
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => {
              setUser({
                ...user,
                username: e.target.value,
              });
            }}
          />
          <div>
            <div className="flex">
              <label htmlFor="password" className="text-lg ">
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-gray-600 ml-auto"
              >
                Forgot password?
              </a>
            </div>
            <FullInput
              name="password"
              type="password"
              placeholder="Your password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </div>
          <div className="space-y-2">
            <Button type="fullGray" disabled={loading}>
              {loading ? (
                <><Spinner />&nbsp;Loading...</>
              ) : (
                "Log in"
              )}
            </Button>
            <div>
              <a href="/signup">
                Not a member? <b>Sign up</b>
              </a>
            </div>
          </div>
        </div>
      </form>
    </AuthPage>
  );
};

export default Login;
