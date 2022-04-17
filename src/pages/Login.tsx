import { AxiosResponse } from "axios";
import { setAuthTokens, isLoggedIn } from "axios-jwt";
import React, { useState } from "react";
import AuthPage from "../components/AuthPage";
import Button from "../components/Button";
import FullInput from "../components/FullInput";
import Spinner from "../components/icons/Spinner";
import { request } from "../utils/api";
import { Link, navigate } from "raviger";
import toast from "../utils/toast";

const Login = () => {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  React.useEffect(() => {
    if (isLoggedIn()) {
      toast.info("You already signed in!", {
        toastId: "already-signed-in",
      });
      navigate("/");
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
              if (response.status === 400 || response.status === 401) {
                throw new Error("Invalid credentials");
              } else if (response.status === 200) {
                setAuthTokens({
                  accessToken: response.data.access,
                  refreshToken: response.data.refresh,
                });
              }
            })
            .then(() => {
              setLoading(false);
              toast.success("Logged in");
              navigate("/");
            })
            .catch((e) => {
              setLoading(false);
              toast.error(`Error logging in. ${e.message}`);
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
                href="#/forgot-password"
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
            <Button
              type="fullGray"
              disabled={loading || !user.username || !user.password}
            >
              {loading ? (
                <>
                  <Spinner />
                  &nbsp;Loading...
                </>
              ) : (
                "Log in"
              )}
            </Button>
            <div>
              <Link href="/signup">
                Not a member? <b>Sign up</b>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </AuthPage>
  );
};

export default Login;
