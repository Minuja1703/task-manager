import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

function ViewTasks() {
  const [tasksData, setTasksData] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/task`, { withCredentials: true })
      .then((response) => {
        setTasksData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task ?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/task/${id}`, {
        withCredentials: true,
      });

      setTasksData((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-5 p-5 bg-gray-100">
      <div className="flex justify-between mt-8 p-3">
        <h1 className="text-gray-900 text-3xl font-medium">View Tasks</h1>
        <Link to="/addtask">
          <MdOutlineAddBox className="text-4xl text-gray-700" />
        </Link>
      </div>

      <table className="border rounded-xl shadow-lg overflow-hidden">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-3 text-lg">Sl No</th>
            <th className="p-3 text-lg">Title</th>
            <th className="p-3 text-lg">Description</th>
            <th className="p-3 text-lg">Action</th>
          </tr>
        </thead>

        <tbody>
          {tasksData.length > 0 ? (
            tasksData.map((taskData, index) => (
              <tr className="border" key={taskData._id}>
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3 text-center">{taskData.title}</td>
                <td className="p-3 text-center">{taskData.body}</td>
                <td className="p-3">
                  <div className="flex gap-5 justify-center">
                    <Link to={`/edittask/${taskData._id}`}>
                      <MdEdit className="text-2xl text-yellow-600" />
                    </Link>

                    <button onClick={() => handleDelete(taskData._id)}>
                      <AiFillDelete className="text-2xl text-red-700" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-3 text-lg">
                Task data not available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTasks;
