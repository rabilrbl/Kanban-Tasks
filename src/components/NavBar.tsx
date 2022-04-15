import { ActiveLink } from "raviger";
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
        <div className="mb-5">
          <h3>Kanban Tasks</h3>
        </div>
          {/* <!-- items --> */}
          {navLinks.map((nav, index) => {
            return (
              <div className="mb-4" key={index}>
                <div className="flex w-full items-center justify-between">
                  <ActiveLink
                    href={nav.path}
                    className="flex w-full cursor-pointer items-center rounded-lg px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-800 hover:text-white"
                    exactActiveClass="bg-gray-800 border border-gray-500"
                  >
                    {nav.icon}
                    <span className="ml-3 font-bold">{nav.name}</span>
                  </ActiveLink>
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
