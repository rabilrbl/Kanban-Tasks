import { AxiosResponse } from "axios";
import { isLoggedIn } from "axios-jwt";
import { navigate } from "raviger";
import React from "react";
import AuthPage from "../components/AuthPage";
import Button from "../components/Button";
import FullInput from "../components/FullInput";
import { request } from "../utils/api";

const Signup = () => {
  const [user, setUser] = React.useState({
    username: "",
    password1: "",
    password2: "",
    email: "",
  });

  React.useEffect(() => {
    if (isLoggedIn()) {
      window.location.href = "/";
    }
  }, []);

  return (
    <AuthPage>
      <div>
        <h3>Sign up</h3>
        <p>Enter your details below to become a member.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          request
            .post("/auth/registration/", user)
            .then((response: AxiosResponse) => {
              navigate("/login");
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
          <FullInput
            label="Email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={user.email}
            onChange={(e) => {
              setUser({
                ...user,
                email: e.target.value,
              });
            }}
          />
          <FullInput
            label="Password"
            name="password"
            type="password"
            placeholder="New password"
            value={user.password1}
            onChange={(e) => {
              setUser({
                ...user,
                password1: e.target.value,
              });
            }}
          />
          <FullInput
            label="Confirm Password"
            name="password2"
            type="password"
            placeholder="Confirm password"
            value={user.password2}
            onChange={(e) => {
              setUser({
                ...user,
                password2: e.target.value,
              });
            }}
          />
          <div className="space-y-2">
            <Button type="fullGray">Create Account</Button>
            <div>
              <a href="/login">
                Already have an account? <b>Log In</b>
              </a>
            </div>
          </div>
        </div>
      </form>
    </AuthPage>
  );
};

export default Signup;
