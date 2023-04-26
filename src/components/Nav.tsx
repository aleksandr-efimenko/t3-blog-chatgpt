import React, { useState } from "react";
import Link from "next/link";

const navItems = 
[
    {name: "Home", path: "/"},
    {name: "Create post", path: "/createpost"},
    {name: "Posts", path: "/posts"}
] 

export default function Nav() {
  return (
    <>
      <nav >
        <ul className="flex p-5 text-white w-1/5 items-end justify-between">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

    </>
  );
}
