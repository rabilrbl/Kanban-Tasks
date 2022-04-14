import React from "react";
import AuthPage from "../components/AuthPage";
import Button from "../components/Button";
import FullInput from "../components/FullInput";

const Signup = () => {
  return (
        <AuthPage>
            <div>
              <h3>Sign up</h3>
              <p>Enter your details below to become a member.</p>
            </div>
            <form>
              <div className="space-y-4">
                <FullInput
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Username"
                />
                <FullInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                />
                <FullInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="New password"
                />
                <FullInput
                  label="Confirm Password"
                  name="password2"
                  type="password"
                  placeholder="Confirm password"
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
