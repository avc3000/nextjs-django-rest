"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FormTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      }
    );

    const data = await res.json();
    router.refresh();
    setTitle("");
    setDescription("");
    e.target.title.focus();
  };

  return (
    <div className="bg-slate-200 p-4 h-fit rounded-md">
      <form onSubmit={handleSubmit}>
        <h1 className="text-black font-bold text-center">Registrar Tarea</h1>
        <label htmlFor="title" className="text-xs text-black">
          Título:
        </label>
        <input
          type="text"
          name="title"
          className="bg-slate-400 rounded-md mb-1 block w-full text-black p-1"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          autoFocus
        />
        <label htmlFor="description" className="text-xs text-black">
          Descripción:
        </label>
        <textarea
          name="description"
          className="bg-slate-400 rounded-md mb-3 block w-full text-black p-1"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button className="bg-indigo-500 text-white rounded-md p-1 block w-full">
          Agregar
        </button>
      </form>
    </div>
  );
};

export default FormTask;
