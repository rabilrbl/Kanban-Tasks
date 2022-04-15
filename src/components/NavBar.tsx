import { Link } from "raviger";
import React from "react";

type NavLinks = {
  name: string;
  path: string;
  icon: React.ReactNode;
}[];

const NavBar = ({ navLinks }: { navLinks: NavLinks }) => {

  return (
    <div className="min-h-screen bg-gray-900">
      {/* <!-- component --> */}
      <div className="flex h-screen w-64 flex-col justify-between bg-gray-900 text-zinc-300">
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
      </div>
    </div>
  );
};
export default NavBar;
