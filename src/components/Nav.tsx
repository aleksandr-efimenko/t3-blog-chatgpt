import React, { useState } from "react";
import Link from "next/link";

const navItems = 
[
    {name: "Home", path: "/"},
    {name: "Create post", path: "/createpost"},
    {name: "Create image", path: "/createimage"},
    // {name: "Posts", path: "/posts"},
] 

export default function Nav() {
  return (
    <>
      <nav className="flex justify-end">
        <ul className="flex p-5 text-white items-end justify-between">
          {navItems.map((item) => (
            <li className="mx-5" key={item.name}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

    </>
  );
}
