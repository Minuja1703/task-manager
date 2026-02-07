import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/auth/login`, inputs, {
        withCredentials: true,
      });
      navigate("/viewtasks");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center bg-gray-100">
      <h1 className="text-gray-900 text-3xl font-medium mt-26">Login</h1>
      <form className="w-[400px] flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col px-3 gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="border p-1 rounded"
            id="email"
            name="email"
            onChange={handleChange}
            required
            value={inputs.email}
          />
        </div>

        <div className="flex flex-col px-3 gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border p-1 rounded"
            id="password"
            name="password"
            onChange={handleChange}
            required
            value={inputs.password}
          />
        </div>

        <div className="mt-5 mb-26">
          <button
            type="submit"
            className="bg-gray-500 p-3 text-white rounded-lg shadow-md ml-3"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
