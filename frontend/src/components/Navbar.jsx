import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-xl">
          StackIt
        </Link>
        <div className="space-x-4">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
}
