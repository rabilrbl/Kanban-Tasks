import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { getUser } from "../utils/user";
import YesNoModal from "./YesNoModal";
import toast from "../utils/toast";

const HorizNavBar = () => {
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
      <div className={"py-1 bg-gray-900 flex items-center"}>
        <div className=" py-2 relative mr-auto ml-8 text-gray-600">
          <input
            className="border-2 border-gray-300 bg-white pl-10 h-10 sm:w-[28rem] px-5 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          />
          <button type="submit" className="absolute left-0 pl-3 top-0 mt-5 mr-4">
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
        <div className="flex items-center mr-10 space-x-5">
          <div className="flex items-center">
            <img
                  src={user?.img}
                  alt="User Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="ml-2 text-lg uppercase text-gray-50">{user?.username}</span>
          </div>
              <button className="ml-auto cursor-pointer flex items-center justify-center text-white text-sm" onClick={() => {
                toast((close) => {return<YesNoModal yes="Logout" no="Cancel" message="Are you sure you want to logout?" setOpen={() => close} yesCB={() => {
                  navigate("/logout");
              }} />}, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              }}>
              Logout&nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
  );
};

export default HorizNavBar;
