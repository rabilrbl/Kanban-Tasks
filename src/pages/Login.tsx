import React from "react";
import AuthPage from "../components/AuthPage";
import Button from "../components/Button";
import FullInput from "../components/FullInput";

const Login = () => {
  return (
    
        <AuthPage>
            <div>
              <h3>Log in</h3>
              <p>Enter your credentials to access your account</p>
            </div>
            <form>
              <div className="space-y-4">
                <FullInput
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Username"
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
                  />
                </div>
                <div className="space-y-2">
                  <Button type="fullGray">Log in</Button>
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
