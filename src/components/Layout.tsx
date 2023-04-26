import React from "react";
import NavBar from "./NavBar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient min-h-screen">
      <NavBar />
      {children}
    </div>
  );
}
