import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function AddTask() {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
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
      await axios.get(`${BASE_URL}/auth/me`, {
        withCredentials: true,
      });

      await axios.post(`${BASE_URL}/task/`, inputs, {
        withCredentials: true,
      });
      navigate("/viewtasks");
    } catch (error) {
      navigate("/login");
      console.log(error);

      if (error.response.status === 401) {
        alert("You are not authorized. Login to add new task");
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center bg-gray-100">
      <h1 className="text-gray-900 text-3xl font-medium mt-20">Add Task</h1>
      <form className="w-[400px] flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col px-3 gap-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="border p-1 rounded"
            id="title"
            name="title"
            onChange={handleChange}
            value={inputs.name}
            required
          />
        </div>

        <div className="flex flex-col px-3 gap-1">
          <label htmlFor="body">Description</label>
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="10"
            onChange={handleChange}
            value={inputs.body}
            required
            className="border rounded p-1"
          ></textarea>
        </div>

        <div className="mt-5 mb-20">
          <button
            type="submit"
            className="bg-gray-500 p-3 text-white rounded-lg shadow-md ml-3"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
