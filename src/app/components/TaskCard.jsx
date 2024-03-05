"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const TaskCard = ({ task }) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.status === 204) {
        router.refresh();
      }
    }
  };

  const handleDoneTask = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`,
      {
        method: "POST",
      }
    );

    if (res.status === 201) {
      router.refresh();
    }
  };

  const handleUpdate = async (id) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      }
    );

    const data = await res.json();
    setNewTitle(data.title);
    setNewDescription(data.description);
    setEdit(false);
  };

  return (
    <div className="bg-slate-500 p-4 w-full mb-2 rounded-md text-slate-200 flex justify-between items-center">
      <div>
        {!edit ? (
          <div>
            <h1 className="font-bold">
              {newTitle}
              {task.done && <span>✅</span>}
            </h1>
            <p>{newDescription}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-y-2">
            <input
              type="text"
              placeholder={task.title}
              className="p-2 bg-slate-600 border-none rounded-md outline-none"
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              name=""
              placeholder={task.description}
              className="p-2 bg-slate-600 border-none rounded-md outline-none"
              onChange={(e) => setNewDescription(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>
      <div className="flex justify-between gap-x-2">
        {edit && (
          <button
            onClick={() => handleUpdate(task.id)}
            className="bg-slate-300 text-black rounded-md p-2 font-bold"
          >
            Guardar
          </button>
        )}
        <button
          onClick={() => handleDoneTask(task.id)}
          className={
            "text-white rounded-md p-2" +
            (task.done ? " bg-gray-400" : " bg-green-500")
          }
        >
          {task.done ? "No Terminar" : "Terminar"}
        </button>
        <button
          onClick={() => handleDelete(task.id)}
          className="bg-red-500 text-white rounded-md p-2"
        >
          Eliminar
        </button>
        <button
          onClick={() => setEdit(!edit)}
          className="bg-indigo-500 text-white rounded-md p-2"
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
