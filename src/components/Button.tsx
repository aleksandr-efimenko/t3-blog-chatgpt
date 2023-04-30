import React from "react";
import AnimatedSpinner from "./AnimatedSpinner";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  status?: "idle" | "pending" | "fulfilled" | "rejected";
}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="inline-flex w-full items-center justify-center 
      rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold leading-6
       text-white shadow transition duration-150 ease-in-out
       hover:bg-indigo-400"
    >
      {props.status === "pending" && <AnimatedSpinner />}
      {props.children}
    </button>
  );
}
