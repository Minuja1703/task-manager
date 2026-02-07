import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between p-5 bg-gray-700 shadow-xl">
      <h1 className="text-5xl font-semibold text-white">Task Manager</h1>
      <div className="flex gap-5">
        <Link to="/signup">
          <button className="bg-gray-500 text-white p-3 rounded-lg shadow-xl">
            Sign Up
          </button>
        </Link>

        <Link to="/login">
          <button className="bg-gray-500 text-white p-3 rounded-lg shadow-xl">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
