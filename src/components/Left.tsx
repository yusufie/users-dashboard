"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import useStore from ".././store/store";

import {FiSettings} from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { PiNotepad, PiStackBold } from "react-icons/pi";
import { BiHomeAlt2 } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";

function Left() {

  const user = useStore((state) => state.user);

  return (
    <aside className="flex flex-col justify-start items-start w-96 h-screen border-r p-4 ">
      <Link href="/">
        <Image
          src="/images/logo_gray.png"
          alt="logo"
          width={360}
          height={360}
          className="mx-auto py-4"
          priority={true}
        />
      </Link>

      <input
        type="search"
        placeholder="Search"
        className="my-2 border-4 border-gray-600"
        id="leftSearch"
      />

      <ul className="flex flex-col justify-start items-start w-full mt-2">
        <li className="inline text-gray-600 font-bold w-full p-2 my-2 rounded-md hover:bg-gray-100">
          <Link href="/" >
            <BiHomeAlt2 style={{height:"1.3em", width: "1.3em"}} className=" inline-block mr-2" />
            Home
          </Link>
        </li>

        <li className="inline text-gray-600 font-bold w-full p-2 my-2 rounded-md hover:bg-gray-100">
          <Link href="/projects">
            <PiStackBold style={{height:"1.3em", width: "1.3em"}} className=" inline-block mr-2" />
            Projects
          </Link>
        </li>

        <li className="inline text-gray-600 font-bold w-full p-2 my-2 rounded-md hover:bg-gray-100">
          <Link href="/tasks">
            <PiNotepad style={{height:"1.3em", width: "1.3em"}} className=" inline-block mr-2" />
            Tasks
          </Link>
        </li>

        <li className="inline text-gray-600 font-bold w-full p-2 my-2 rounded-md hover:bg-gray-100">
          <Link href="/users">
            <HiOutlineUsers style={{height:"1.3em", width: "1.3em"}} className=" inline-block mr-2" />
            Users
          </Link>
        </li>
      </ul>

      
        <ul className="flex flex-col justify-start items-start w-full mt-auto">
          <li className="inline text-gray-600 font-bold w-full p-2 my-2 rounded-md hover:bg-gray-100">
            <Link href="/support">
              <AiOutlineQuestionCircle style={{height:"1.3em", width: "1.3em"}} className=" inline-block mr-2" />
              Support
            </Link>
          </li>

          <li className="inline text-gray-600 font-bold w-full p-2 my-2 rounded-md hover:bg-gray-100">
            <Link href="/settings">
              <FiSettings style={{height: "1.3em", width: "1.3em"}} className="inline-block mr-2" />
              Settings
            </Link>
          </li>
        </ul>

        <div className="flex flex-row">
          <div>
            <h2 className="  font-bold text-gray-600">{user.fullName}</h2>
            <p className=" text-sm font-medium text-gray-400">{user.email}</p>
          </div>

          <div className="flex items-center justify-center">
            <Link href="/login">
              <TbLogout style={{height: "1.5em", width: "1.5em", color: "red" }} className="inline-block ms-24 mr-4" />
            </Link>
          </div>
        </div>
      
    </aside>
  );
}

export default Left;
