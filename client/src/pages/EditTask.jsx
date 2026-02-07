import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function EditTask() {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
    completed: false,
  });

  console.log(inputs);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/task/${id}`, { withCredentials: true })
      .then((response) => {
        setInputs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/task/${id}`, inputs, {
        withCredentials: true,
      });
      navigate("/viewtasks");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <h1 className="text-gray-900 text-3xl font-medium mt-20">Edit Task</h1>
      <form className="w-[400px] flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col px-3 gap-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="border p-1"
            id="title"
            name="title"
            onChange={handleChange}
            required
            value={inputs.title}
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
            required
            value={inputs.body}
            className="border rounded p-1"
          ></textarea>
        </div>

        <div className="flex gap-3 px-3">
          <label htmlFor="completed">Task Completed</label>
          <input
            type="checkbox"
            className="border w-5"
            id="completed"
            name="completed"
            onChange={handleChange}
            checked={inputs.completed}
          />
        </div>

        <div className="mt-5 mb-20">
          <button
            type="submit"
            className="bg-gray-500 p-3 text-white rounded-lg shadow-md ml-3"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;
