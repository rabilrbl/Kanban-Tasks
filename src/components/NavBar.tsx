import { Link, navigate } from "raviger";
import React, { useState, useEffect } from "react";
import { getUser } from "../utils/user";

type NavLinks = {
  name: string;
  path: string;
  icon: React.ReactNode;
}[];

const NavBar = ({ navLinks }: { navLinks: NavLinks }) => {
  const [user, setUser] = useState<{
    pk: number;
    img: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }>();

  useEffect(() => {
    getUser().then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* <!-- component --> */}
      <div className="flex h-screen w-64 flex-col justify-between bg-zinc-900 text-zinc-300">
        <div className="p-4">
          {/* <!-- items --> */}
          {navLinks.map((nav, index) => {
            return (
              <div className="mb-4" key={index}>
                <div className="flex w-full items-center justify-between">
                  <Link
                    href={nav.path}
                    className="flex w-full cursor-pointer items-center rounded-lg px-4 py-2 transition duration-300 ease-in-out hover:bg-zinc-800 hover:text-white"
                  >
                    {nav.icon}
                    <span className="ml-3 font-bold">{nav.name}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        {/* <!-- Bottom --> */}
        <div className="flex items-center bottom-0 border-t-2 border-zinc-700 p-4">
          <img
            src={user?.img}
            alt="User Profile"
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="ml-2 text-sm">{user?.username}</span>
          <button className="ml-auto cursor-pointer flex items-center" onClick={() => navigate("/logout")}>
            Logout&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
